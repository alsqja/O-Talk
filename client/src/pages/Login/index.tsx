import { TextField } from "../../Components/TextField";
import theme, { media } from "../../styles/theme";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Firstpage/headerLogo.svg"
import styled from "styled-components";
export const Login = () =>{
  const [name,setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const click=()=>{

  };
  const handleLogin=useCallback(()=>{
    navigate('/firstlogin')
  },[navigate]);

  const handleSignup=useCallback(()=>{
    navigate('/signup')
  },[navigate])

  const handleLocation=useCallback(()=>{
    navigate('/')
  },[navigate])
  return(
    <Wrapper>
      <LogoBox src={Logo}></LogoBox>
      <TextField title="닉네임 입력" value={name} onChange={setName}></TextField>
      <TextField title="비밀번호" value={password} onChange={setPassword} type="password"></TextField>
      <LoginButton onClick={handleLogin}>로그인</LoginButton>
      <SignupContainer>
        <div>계정이 없으신가요?</div>
        <div style={{color: theme.palette.black,padding:"5px",cursor:'pointer', fontWeight : 900}} onClick={handleSignup}>가입하기</div>
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
  margin-top : 15%;
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
    font-size : ${theme.typography.title1.fontSize}px;
  }
  ${media.mobile}{
    width: 327px;
    height: 50px;
    font-size : ${theme.typography.mobileTitle1.fontSize}px;
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
    font-size : ${theme.typography.title4.fontSize}px;
  }
  ${media.mobile}{
    width: 327px;
    height: 50px;
    font-size : ${theme.typography.mobileTitle2.fontSize}px;
  }
  display : flex;
  align-items: center;
  justify-content : center;
  margin-top : 5px;
`
const InvitationContainer = styled.div`
  ${media.desktop}{
    width: 514px;
    height: 50px;
    font-size : ${theme.typography.title4.fontSize}px;
  }
  ${media.mobile}{
    width: 327px;
    height: 20px;
    font-size : ${theme.typography.mobileTitle2.fontSize}px;
  }
  display : flex;
  align-items: center;
  justify-content: center;
  font-size : ${theme.typography.title4.fontSize}px;
`