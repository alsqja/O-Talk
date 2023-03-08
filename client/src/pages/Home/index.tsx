import styled from "styled-components";
import { Header } from "../../Components/Header";
import { OpenChatTable } from "../../Components/OpenChatTable";
import {IChatRoomInfo} from "./index.d";
export const Home = () =>{
  const res = {
    data:{
      rows:[
        {
          id: 0,
						title: "이별의 아픔을 같이해요",
            contents: "이별의 아픔을 치유하지 못한 분들 오세요~",
						createdAt: "1111111",
						updatedAt: "1111111",
            user: {
								id: 0,
								name: "라푼젤",
                profile: "./img1.svg",
            },
            reviews: [
                {
                  id: 0,
                  content: "정말힐링이 되었습니다.",
									stars: 5,
                  user: {
											id: 1,
                      name: "장인",
                      profile: "./img2.svg",
                  }
                }
            ]
        },{
          id: 1,
						title: "심심한분 같이 놀아요~",
            contents: "심심한분 같이 놀아요~",
						createdAt: "1111112",
						updatedAt: "1111112",
            user: {
								id: 1,
								name: "엘사",
                profile: "./img3.svg",
            },
            reviews: [
                {
                  id: 0,
                  content: "재밌네요.",
									stars: 5,
                  user: {
											id: 1,
                      name: "장인",
                      profile: "./img2.svg",
                  }
                }
            ]
        },
        {
          id: 2,
						title: "애니메이션 소통해요~",
            contents: "애니메이션 소통해요~",
						createdAt: "1111113",
						updatedAt: "1111113",
            user: {
								id: 2,
								name: "히컵",
                profile: "./img4.svg",
            },
            reviews: [
                {
                  id: 0,
                  content: "재밌네요.",
									stars: 5,
                  user: {
											id: 1,
                      name: "장인",
                      profile: "./img2.svg",
                  }
                }
            ]
        },
        {
          id: 3,
						title: "연애 상담",
            contents: "연애 상담~",
						createdAt: "1111114",
						updatedAt: "1111114",
            user: {
								id: 3,
								name: "안나",
                profile: "./img5.svg",
            },
            reviews: [
                {
                  id: 0,
                  content: "재밌네요.",
									stars: 5,
                  user: {
											id: 1,
                      name: "장인",
                      profile: "./img2.svg",
                  }
                }
            ]
        },
        {
          id: 4,
						title: "친구 해요~",
            contents: "친구 해요~",
						createdAt: "1111115",
						updatedAt: "1111115",
            user: {
								id: 1,
								name: "한스왕자",
                profile: "./img6.svg",
            },
            reviews: [
                {
                  id: 0,
                  content: "재밌네요.",
									stars: 5,
                  user: {
											id: 1,
                      name: "장인",
                      profile: "./img2.svg",
                  }
                }
            ]
        },
      ],
    }
  }
  // const [chatRooms, setChatRooms] = useState<IChatRoomInfo[]>([]);
  
  return(
    <Layout>
      <Header></Header>
      <Container>
        {res.data.rows.map((el: IChatRoomInfo)=>(
          <OpenChatTable chatRooms={el}/>
        ))}
      </Container>
    </Layout>
  );
}

const Layout = styled.div`
  width : 100%
  display : flex;
  align-items : center;
  justify-content : center;
`
const Container = styled.div`
  display : flex;
  flex-direction : column;
  align-items : center;
  justify-content : center;
`