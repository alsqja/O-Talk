import styled from "styled-components"
import { IChatRoomInfo} from "../../pages/Home/index.d"
import theme from "../../styles/theme"
interface IRooms {
  chatRooms : IChatRoomInfo
}
export const OpenChatTable = ({chatRooms}: IRooms) =>{
  return(
    <Wrapper>
      <RoomRank>1</RoomRank>
      <RoomImg src={chatRooms.user.profile || ""}></RoomImg>
      <UserContainer>
        <UserName>{chatRooms.user.name}</UserName>
        <RoomReviewMean>별점</RoomReviewMean>
      </UserContainer>
      <RoomContainer>
        <RoomTitle>{chatRooms.title}</RoomTitle>
        <RoomReviewNum>{chatRooms.reviews.length}</RoomReviewNum>
      </RoomContainer>
      <RoomBookMarkButton src={""}></RoomBookMarkButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display : flex;
  width : 500px;
  height : 71px;
  border-bottom : 2px solid ${theme.palette.blackLight};
  margin-top : 10px;
`
const UserContainer = styled.div`
  width : 80px;
  heigth : 70px;
  display : flex;
  flex-direction : column;
  align-items : center;
  justify-content: center;
`
const RoomContainer = styled.div`
  width : 267px;
  heigth : 70px;
  display : flex;
  flex-direction : column;
  align-items : center;
  justify-content: center;
`
const RoomRank = styled.div`
  width : 28px;
  height : 60px;
  font-size : ${theme.typography.title2.fontSize}px;
`
const RoomImg = styled.img`
  width : 50px;
  height : 50px;
`
const UserName = styled.div`
  width : 70px;
  height : 30px;
  font-size : ${theme.typography.title4.fontSize}px;
  font-weight : 900;
`
const RoomReviewMean = styled.div`
  width : 70px;
  height : 30px;
  font-size : ${theme.typography.title4.fontSize}px;
`
const RoomTitle = styled.div`
  width : 268px;
  height : 30px;
  font-size : ${theme.typography.title4.fontSize}px;
`
const RoomReviewNum = styled.div`
  width : 268px;
  height : 30px;
  font-size : ${theme.typography.title4.fontSize}px;
`
const RoomBookMarkButton = styled.img`
  width : 30px;
  height : 30px;
`