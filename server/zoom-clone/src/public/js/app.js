console.info("app.js");
const socket = io();

// phone call
const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");
const audiosSelect = document.getElementById("audios");
const call = document.getElementById("call");

call.hidden = true;

let myStream;
let muted = false;
let cameraOff = false;
let roomName;
let myPeerConnection;

async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    const audios = devices.filter((device) => device.kind === "audiooutput");
    const currentCamera = myStream.getVideoTracks()[0];
    const currentAudio = myStream.getAudioTracks()[0];

    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label === camera.label) {
        option.selected = true;
      }
      camerasSelect.appendChild(option);
    });
    audios.forEach((audio) => {
      const option = document.createElement("option");
      option.value = audio.deviceId;
      option.innerText = audio.label;
      if (currentAudio.label === audio.label) {
        option.selected = true;
      }
      audiosSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}

async function getMedia(deviceId) {
  // cameras 만들기 전
  const initialConstrains = {
    audio: true,
    video: { facingMode: "user" },
  };
  //   diviceId 있을 때 실행
  const cameraConstrains = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };
  try {
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstrains : initialConstrains
    );
    myFace.srcObject = myStream;

    if (!deviceId) {
      await getCameras();
    }
  } catch (e) {
    console.log(e);
  }
}

function handleMuteClick() {
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (!muted) {
    muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    muteBtn.innerText = "Mute";
    muted = false;
  }
}

function handleCameraClick() {
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (cameraOff) {
    cameraBtn.innerText = "Turn Camera Off";
    cameraOff = false;
  } else {
    cameraBtn.innerText = "Turn Camera On";
    cameraOff = true;
  }
}

function handleAudioClick() {
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (muted) {
    muteBtn.innerText = "Turn Camera Off";
    muted = false;
  } else {
    muteBtn.innerText = "Turn Camera On";
    muted = true;
  }
}

async function handleCameraChange() {
  await getMedia(camerasSelect.value);
  if (myPeerConnection) {
    const videoTrack = myStream.getVideoTracks()[0];
    const videoSender = myPeerConnection
      .getSenders()
      .find((sender) => sender.track.kind === "video");
    videoSender.replaceTrack(videoTrack);
  }
}

async function handleAudioChange() {
  await getMedia(audiosSelect.value);
  if (myPeerConnection) {
    const audioTrack = myStream.getAudioTracks()[0];
    const audioSender = myPeerConnection
      .getSenders()
      .find((sender) => sender.track.kind === "audio");
    audioSender.replaceTrack(audioTrack);
  }
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
camerasSelect.addEventListener("input", handleCameraChange);

// Welcome Form (join a room)

const welcome = document.getElementById("welcome");
const welcomeForm = welcome.querySelector("form");

async function initCall() {
  welcome.hidden = true;
  call.hidden = false;

  console.info("initCall : ");
  await getMedia(); //카메라, 마이크 불러옴
  makeConnection();
}

async function handleWelcomeSubmit(event) {
  event.preventDefault();
  const input = welcomeForm.querySelector("input");

  await initCall();
  socket.emit("join_room", input.value);
  roomName = input.value;
  input.value = "";
}

welcomeForm.addEventListener("submit", handleWelcomeSubmit);

// socket code

socket.on("welcome", async () => {
  const offer = await myPeerConnection.createOffer();
  myPeerConnection.setLocalDescription(offer);
  console.log("send offer");
  socket.emit("offer", offer, roomName);
});

socket.on("offer", async (offer) => {
  // console.log("received the offer");
  myPeerConnection.setRemoteDescription(offer);
  const answer = await myPeerConnection.createAnswer();
  myPeerConnection.setLocalDescription(answer);
  socket.emit("answer", answer, roomName);
  // console.log("sent the answer");
});

socket.on("answer", (answer) => {
  // console.log("received the answer");
  myPeerConnection.setRemoteDescription(answer);
});

socket.on("ice", (ice) => {
  console.log("receive cadidate");
  myPeerConnection.addIceCandidate(ice);
});

// RTC code

function makeConnection() {
  myPeerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:stun3.l.google.com:19302",
          "stun:stun4.l.google.com:19302",
        ],
      },
    ],
  });
  myPeerConnection.addEventListener("addstream", handleAddStream);
  myPeerConnection.addEventListener("icecandidate", handleIce);

  myPeerConnection.addEventListener("track", handleTrack);

  myStream
    .getTracks()
    .forEach((track) => myPeerConnection.addTrack(track, myStream));
}

function handleTrack(data) {
  console.log("handle track");
  const peerFace = document.querySelector("#peerFace");
  peerFace.srcObject = data.streams[0];
}

function handleIce(data) {
  console.log("handleIce");
  socket.emit("ice", data.candidate, roomName);
}

function handleAddStream(data) {
  console.info("모바일 디깅용 : ", navigator.userAgent);
  const peerFace = document.getElementById("peerFace");

  peerFace.type = "screen";
  peerFace.srcObject = data.stream;
}
