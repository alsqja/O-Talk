import profileImg from "./profileimg.svg"
import styled from "styled-components"
import theme, { media } from "../../styles/theme"
import userSelectImg1 from "./userSelectImg1.svg"
import userSelectImg2 from "./userSelectImg2.svg"
import userSelectImg3 from "./userSelectImg3.svg"
import userSelectImg4 from "./userSelectImg4.svg"
import userSelectImg5 from "./userSelectImg5.svg"
import { useNavigate } from "react-router-dom"
import { useCallback } from "react"
export const FirstLogin = () =>{
  const navigate = useNavigate();
  const uploadImg = () =>{
    alert("이미지 업로드");
  }
  const selectImg = () => {
    alert("이미지 선택");
  }
  const hanleHome = useCallback(()=>{
    navigate('/home');
  },[navigate])
  return(
    <Wrapper>
      <ProfileBox src={profileImg} onClick={uploadImg}></ProfileBox>
      <ImgContainer>
        <UserSelectImg src={userSelectImg1} onClick={selectImg}></UserSelectImg>
        <UserSelectImg src={userSelectImg2} onClick={selectImg}></UserSelectImg>
        <UserSelectImg src={userSelectImg3} onClick={selectImg}></UserSelectImg>
        <UserSelectImg src={userSelectImg4} onClick={selectImg}></UserSelectImg>
        <UserSelectImg src={userSelectImg5} onClick={selectImg}></UserSelectImg>
      </ImgContainer>
      <ProfileImgSaveButton onClick={hanleHome}>프로필 사진 저장</ProfileImgSaveButton>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width : 100%;
  display : flex;
  flex-direction : column;
  align-items: center;
  justify-content: space-around;
`
const ImgContainer = styled.div`
  display : flex;
`
const ProfileBox = styled.img`
  ${media.desktop}{
    width : 250px;
    margin : 10px;
  }
  ${media.mobile}{
    width : 125px;
    margin : 5px;
  }
  cursor : pointer;
`
const UserSelectImg = styled.img`
  ${media.desktop}{
    width : 170px;
    margin-left : 10px;
  }
  ${media.mobile}{
    width: 85px;
    margin-left : 5px;
  }
  cursor : pointer;
`
const ProfileImgSaveButton = styled.div `
  ${media.desktop}{
    width : 160px;
    height : 30px;
    font-size : ${theme.typography.title3.fontSize}px;
    padding-left : 9px;
  }
  ${media.mobile}{
    width: 120px;
    height : 20px;
    font-size : ${theme.typography.mobileTitle2.fontSize}px;
    padding-left : 5px;
  }
  border-radius : 5px;
  background-color: ${theme.palette.primary};
  font-weight : 900;
  border: 0;
  color: ${theme.palette.complementary};
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  cursor : pointer;
  margin-top : 10px;
`