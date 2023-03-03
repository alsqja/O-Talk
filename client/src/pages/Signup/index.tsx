import { TextField } from "../../Components/TextField";
import theme,{media} from "../../styles/theme";
import { useCallback, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Firstpage/headerLogo.svg"
import styled from "styled-components";
import { checkPassValidation } from "../../utils/functions";
export const Signup = () =>{
  const [name,setName] = useState("");
  const [password, setPassword] = useState("");
  const [checkPass, setCheckPass] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const navigate=useNavigate();
  const error = useMemo(
    () => checkPassValidation(password, checkPass),
    [password, checkPass]
  );
  const isActive = useMemo(
    () =>
      name.length > 0 && password.length > 0 && !error && checkPass.length > 0,
    [name, password, error, checkPass]
  );
  const handleLogin=useCallback(()=>{
    navigate('/login')
  },[navigate])

  const handleLocation=useCallback(()=>{
    navigate('/')
  },[navigate])
  const req = {
    name : String,
    password : String,
    phone : String
  }
  return(
    <Wrapper>
      <LogoBox src={Logo}></LogoBox>
      <TextField title="닉네임 입력" value={name} onChange={setName}></TextField>
      <TextField title="비밀번호" value={password} onChange={setPassword} type="password"></TextField>
      <TextField title="비밀번호 확인" value={checkPass} onChange={setCheckPass} type="password" error={error}></TextField>
      <TextField title="핸드폰 번호" value={phoneNum} onChange={setPhoneNum}></TextField>
      <LoginButton onClick={handleLogin}>가입하기</LoginButton>
      <SignupContainer>
        <div>계정이 있으신가요?</div>
        <div style={{color: theme.palette.black,padding:"5px",cursor:'pointer', fontWeight : 900}} onClick={handleLogin}>로그인 하기</div>
      </SignupContainer>
      <InvitationContainer>
        <div>초대링크가 있으신가요?</div>
        <div style={{color: theme.palette.black,padding:"5px",cursor:'pointer', fontWeight : 900}} onClick={handleLocation}>초대링크 입력하기</div>
      </InvitationContainer>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width : 100%;
  display : flex;
  flex-direction : column;
  align-items: center;
  justify-content: space-around;
  margin-top: 5%;
`
const LogoBox = styled.img`
  ${media.desktop}{
    width: 514px;
  }
  ${media.mobile}{
    width: 327px;
  }
`
const LoginButton = styled.button`
  ${media.desktop}{
    width: 514px;
    height: 60px;
    font-size: ${theme.typography.title2.fontSize}px;
  }
  ${media.mobile}{
    width: 327px;
    height: 50px;
    font-size: ${theme.typography.mobileTitle1.fontSize}px;
  }
  border-radius : 5px;
  background-color: ${theme.palette.primary};
  font-weight : 900;
  border: 0;
  color: ${theme.palette.complementary};
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  cursor : pointer;
`
const SignupContainer= styled.div`
  ${media.desktop}{
    width: 514px;
    height: 50px;
    font-size : ${theme.typography.title3.fontSize}px;
  }
  ${media.mobile}{
    width: 327px;
    height: 50px;
    font-size : ${theme.typography.mobileTitle2.fontSize}px;
  }
  display : flex;
  align-items: center;
  justify-content: center;
`
const InvitationContainer = styled.div`
  ${media.desktop}{
    width: 514px;
    height: 50px;
    font-size : ${theme.typography.title3.fontSize}px;
  }
  ${media.mobile}{
    width: 327px;
    height: 50px;
    font-size : ${theme.typography.mobileTitle2.fontSize}px;
  }
  display : flex;
  align-items: center;
  justify-content: center;
`