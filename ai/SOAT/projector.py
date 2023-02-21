import argparse
import math
import os
import cv2

import torch
import torch.nn as nn
from torch import optim
from torch.nn import functional as F
import pickle
from torchvision import transforms
from PIL import Image
from tqdm import tqdm

import lpips
from model import Generator
from op import fused_leaky_relu
import numpy as np
from util import *
import torchvision


def gaussian_loss(v):
    # [B, 9088]
    loss = (v - gt_mean) @ gt_cov_inv @ (v - gt_mean).transpose(1, 0)
    return loss.mean()


def noise_regularize(noises):
    loss = 0

    for noise in noises:
        size = noise.shape[2]

        while True:
            loss = (
                loss
                + (noise * torch.roll(noise, shifts=1, dims=3)).mean().pow(2)
                + (noise * torch.roll(noise, shifts=1, dims=2)).mean().pow(2)
            )

            if size <= 8:
                break
            noise = noise.reshape([1, 1, size // 2, 2, size // 2, 2])
            noise = noise.mean([3, 5])
            size //= 2

    return loss


def noise_normalize_(noises):
    for noise in noises:
        mean = noise.mean()
        std = noise.std()

        noise.data.add_(-mean).div_(std)


def get_lr(t, initial_lr, rampdown=0.25, rampup=0.05):
    lr_ramp = min(1, (1 - t) / rampdown)
    lr_ramp = 0.5 - 0.5 * math.cos(lr_ramp * math.pi)
    lr_ramp = lr_ramp * min(1, t / rampup)

    return initial_lr * lr_ramp


def latent_noise(latent, strength):
    noise = torch.randn_like(latent) * strength

    return latent + noise


def make_image(tensor):
    return (
        tensor.detach()
        .clamp_(min=-1, max=1)
        .add(1)
        .div_(2)
        .mul(255)
        .type(torch.uint8)
        .permute(0, 2, 3, 1)
        .to("cpu")
        .numpy()
    )


def detectFace(img, mode="loose"):
    face_detector = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_alt.xml")
    faces = face_detector.detectMultiScale(img, 1.3, 5)

    if len(faces) > 0:
        face = faces[0]
        face_x, face_y, face_w, face_h = face
        if mode == "loose":
            interval = face_h * 0.3
            face_x -= interval
            face_y -= int(interval * 1.2)  # center의 높이를 좀 더 위로 올리고 싶어서.
            face_w += 2 * interval
            face_h += 2 * interval
            if face_y <= 0:
                face_y = 0
            elif face_x <= 0:
                face_x = 0
            elif face_x + face_w >= len(img[0]):
                face_w = len(img[0]) - face_x
            elif face_y + face_h >= len(img):
                face_h = len(img) - face_y
        elif mode == "tight":
            pass

        # bbox의 중심 좌표는 (y + 0.5*h, x + 0.5*w) 이므로, 중심 좌표가 같게하고 bbox를 확장하는 것은
        # x,y의 감소율의 2배 만큼 w,h를 증가시키면 된다.
        img = img[int(face_y) : int(face_y + face_h), int(face_x) : int(face_x + face_w)]  # 탐지된 얼굴 crop
        # img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) # 눈 탐지를 위해서는 gray version이 필요
        return img

    else:
        # img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        # return -1
        raise Exception("No face is found")


if __name__ == "__main__":
    device = "cuda"

    parser = argparse.ArgumentParser()
    parser.add_argument("--size", type=int, default=256)
    parser.add_argument("--lr_rampup", type=float, default=0.05)
    parser.add_argument("--lr_rampdown", type=float, default=0.25)
    parser.add_argument("--lr", type=float, default=0.5)
    parser.add_argument("--noise", type=float, default=0.1)
    parser.add_argument("--noise_ramp", type=float, default=0.75)
    parser.add_argument("--step", type=int, default=3000)
    parser.add_argument("--noise_regularize", type=float, default=1e5)
    parser.add_argument("--n_mean_latent", type=int, default=10000)
    parser.add_argument("files", metavar="FILES", nargs="+")
    # python projector.py test1.jpg test2.jpg
    # -> args.files : ['test1.jpg', 'test2.jpg']

    args = parser.parse_args()

    out_dir = "./inversion_codes"
    os.makedirs(out_dir, exist_ok=True)
    os.makedirs("./inversion_imgs", exist_ok=True)

    n_mean_latent = args.n_mean_latent
    resize = min(args.size, 256)

    transform = transforms.Compose(
        [
            transforms.Resize(resize),
            transforms.CenterCrop(resize),
            transforms.ToTensor(),
            transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5]),
        ]
    )

    imgs = []

    for imgfile in args.files:
        img = cv2.imread(imgfile)
        try:
            face = detectFace(img)
        except Exception as e:
            print(f"An error occurred in the detectFace function.\n{e} in {imgfile}")
            exit()
        imgs.append(transform(Image.fromarray(face[:, :, ::-1])))

    imgs = torch.stack(imgs, 0).to(device)

    g_ema = Generator(args.size, 512, 8)
    ensure_checkpoint_exists("face.pt")
    g_ema.load_state_dict(torch.load("face.pt")["g_ema"], strict=False)
    g_ema = g_ema.to(device).eval()

    with torch.no_grad():
        latent_mean = g_ema.mean_latent(50000)
        latent_in = list2style(latent_mean)

    # get gaussian stats
    if not os.path.isfile("inversion_stats.npz"):
        with torch.no_grad():
            source = list2style(g_ema.get_latent(torch.randn([10000, 512]).cuda())).cpu().numpy()
            gt_mean = source.mean(0)
            gt_cov = np.cov(source, rowvar=False)

        # We show that style space follows gaussian distribution
        # An extension from this work https://arxiv.org/abs/2009.06529
        np.savez("inversion_stats.npz", mean=gt_mean, cov=gt_cov)

    data = np.load("inversion_stats.npz")
    gt_mean = torch.tensor(data["mean"]).cuda().view(1, -1).float()
    gt_cov_inv = torch.tensor(data["cov"]).cuda()

    # Only take diagonals
    mask = torch.eye(*gt_cov_inv.size()).cuda()
    gt_cov_inv = torch.inverse(gt_cov_inv * mask).float()

    percept = lpips.LPIPS(net="vgg", spatial=True).to(device)
    latent_in.requires_grad = True

    optimizer = optim.Adam([latent_in], lr=args.lr, betas=(0.9, 0.999))

    min_loss = 100
    pbar = tqdm(range(args.step))
    latent_path = []

    lr = args.lr
    for i in pbar:
        t = i / args.step
        # lr = get_lr(t, args.lr)
        if i > 0 and i % 500 == 0:
            lr *= 0.2
        latent_n = latent_in

        img_gen, _ = g_ema(style2list(latent_n))

        batch, channel, height, width = img_gen.shape

        if height > 256:
            img_gen = F.interpolate(img_gen, size=(256, 256), mode="area")

        p_loss = 20 * percept(img_gen, imgs).mean()
        mse_loss = 1 * F.mse_loss(img_gen, imgs)
        g_loss = 1e-3 * gaussian_loss(latent_n)

        loss = p_loss + mse_loss + g_loss

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        if (i + 1) % 100 == 0:
            latent_path.append(latent_in.detach().clone())

        if loss.item() < min_loss:
            min_loss = loss.item()
            min_latent = latent_in.detach().clone()
            my_perceptual = p_loss.item()
            my_mse = mse_loss.item()
            my_gaussian = g_loss.item()

        pbar.set_description(
            (
                f"loss: {loss.item():.4f}; "
                f"perceptual: {p_loss.item():.4f}; "
                f"mse: {mse_loss.item():.4f}; gaussian: {g_loss.item():.4f} lr: {lr:.8f}"
            )
        )

    # result_file = {}

    latent_path.append(latent_in.detach().clone())
    img_gen, _ = g_ema(style2list(min_latent))

    save_name = os.path.splitext(os.path.basename(args.files[0]))[0]
    filename = f"{out_dir}/{save_name}.pt"

    img_ar = make_image(img_gen)

    # for i, input_name in enumerate(args.files):
    #     result_file["latent"] = latent_in[i]

    torch.save({"latent": min_latent}, filename)

    img_ar = Image.fromarray(img_ar[0])
    img_ar.save(f"./inversion_imgs/{save_name}.jpg")
