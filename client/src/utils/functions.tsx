export const checkPassValidation = (password: string, checkPass: string) => {
  if (checkPass.length === 0) {
    return "";
  }
  if (password !== checkPass) {
    return "비밀번호가 일치하지 않습니다";
  }
  return "";
};