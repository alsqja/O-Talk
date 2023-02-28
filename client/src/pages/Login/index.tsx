import { TextField } from "../../Components/TextField";
import theme from "../../styles/theme";
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
  const handleLogin=()=>{

  };

  const handleSignup=useCallback(()=>{
    navigate('/signup')
  },[navigate])

  const handleLocation=useCallback(()=>{
    navigate('/')
  },[navigate])
  return(
    <Wrapper>
      <img src={Logo}></img>
      <TextField title="닉네임 입력" value={name} onChange={setName}></TextField>
      <TextField title="비밀번호" value={password} onChange={setPassword} type="password"></TextField>
      <LoginButton onClick={handleLogin}>로그인</LoginButton>
      <SignupContainer>
        <div>계정이 없으신가요?
          <span style={{color: theme.palette.black, padding : "5px" , cursor:'pointer', fontWeight : 900}} onClick={handleSignup}>가입하기</span>
        </div>
      </SignupContainer>
      <InvitationContainer>
        <div>초대링크가 있으신가요?
          <span style={{color: theme.palette.black,padding:"5px",cursor:'pointer', fontWeight : 900}} onClick={handleLocation}>초대링크 입력하기</span>
        </div>
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
  .img{
    width: 50%;
  }
`
const LoginButton = styled.button`
  width : 514px;
  height: 50px;
  border-radius : 5px;
  background-color: ${theme.palette.primary};
  font-size :25px;
  font-weight : 900;
  border: 0;
  color: ${theme.palette.complementary};
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  cursor : pointer;
`
const SignupContainer= styled.div`
  width : 514px;
  height: 40px;
  display : flex;
  align-items: center;
  justify-content: space-around;
  font-size : ${theme.typography.title3}
  margin-top : 5px;
`
const InvitationContainer = styled.div`
  width : 514px;
  height: 40px;
  display : flex;
  align-items: center;
  justify-content: space-around;
  font-size : ${theme.typography.title3}
`