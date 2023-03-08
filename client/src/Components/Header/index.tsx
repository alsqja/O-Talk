import Logo from "./headerLogo.svg"
import styled from "styled-components"
import theme, { media } from "../../styles/theme"
import profileImg from "./profileimg.svg"
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "./searchIcon.svg"
import cancleIcon from "./cancleIcon.svg"

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleUserPageLink = useCallback(()=>{
    navigate('/userInfo')
  },[navigate])
  const handleLogout = useCallback(()=>{
    navigate('/login')
  },[navigate])
  const handleHome = useCallback(()=>{
    navigate('/home')
  },[navigate])
  return(
    <HeaderContainer>
      <Wrapper>
        <LogoBox src={Logo} onClick={handleHome}></LogoBox>
        <SearchBar>
          <SearchIcon src={searchIcon}></SearchIcon>
          <SearchInput></SearchInput>
          <CancleIcon src={cancleIcon}></CancleIcon>
        </SearchBar>
        <ProfileBox src={profileImg} onClick={()=>setIsOpen(!isOpen)}></ProfileBox>
      </Wrapper>
      {isOpen && (
      <UserModal>
        <UserModalFunction onClick={handleUserPageLink}>유저 정보 조회</UserModalFunction>
        <UserModalFunction onClick={handleLogout}>로그아웃</UserModalFunction>
      </UserModal>
      )}
    </HeaderContainer>
  );
}
const HeaderContainer = styled.div`
  postion : fixed;
`
const Wrapper = styled.div`
  ${media.desktop}{
    width : 100%;
    height : 60px;
  }
  ${media.mobile}{
    width : 100%
    height : 30px;
  }
  display : flex;
  align-items : center;
  justify-content : center;
`
const LogoBox = styled.img`
  ${media.desktop}{
    width: 214px;
  }
  ${media.mobile}{
    width: 100px;
  }
  position : relative;
  cursor : pointer;
  margin-right : 7%;
`
const SearchBar = styled.div`
  ${media.desktop}{
    width: 434px;
    height : 50px;
  }
  ${media.mobile}{
    width: 210px;
    height : 30px;
  }
  background-color : #F7E289;
  border-radius : 15px;
  position : relative;
  cursor : text;
  margin-right : 7%;
  align-items : center;
  justify-contents : space-around;
`
const ProfileBox = styled.img`
  ${media.desktop}{
    width: 55px;
    height : 55px;
  }
  ${media.mobile}{
    width: 30px;
    height : 30px;
  }
  cursor : pointer;
`
const SearchInput = styled.input`
  ${media.desktop}{
    width: 371px;
    height : 50px;
  }
  ${media.mobile}{
    width: 137px;
    height : 30px;
  }
  background-color : #F7E289;
  all : unset;
`
const SearchIcon = styled.img`
  ${media.desktop}{
    width: 20px;
    height : 20px;
    margin-left : 10px;
    margin-right : 5px;
  }
  ${media.mobile}{
    width: 15px;
    height : 15px;
    margin-left : 5px;
    margin-right : 2px;
  }
  
`
const CancleIcon = styled.img`
  ${media.desktop}{
    width: 20px;
    height : 20px;
  }
  ${media.mobile}{
    width: 15px;
    height : 15px;
  }
  cursor : pointer;
`

const UserModal = styled.div`
  ${media.desktop}{
    width: 80px;
    height : 80px;
    left : 1160px;
  }
  ${media.mobile}{
    width: 40px;
    height : 40px;
    left : 320px;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 10px 0px;
  background-color: white;
  box-shadow: ${theme.palette.shadow01};
  border-top: 2px solid ${theme.palette.primary};
  div {
    cursor: pointer;
  }
`
const UserModalFunction = styled.div`
  ${media.desktop}{
    width : 80px;
    height : 40px;
    font-size : ${theme.typography.body2.fontSize}px;
  }
  ${media.mobile}{
    width: 40px;
    height : 20px;
    font-size : ${theme.typography.smallest.fontSize}px;
  }
`
