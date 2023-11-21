import React from "react";
import styled from "styled-components";
import img from "../assets/avatar.jpg";
function Mypage() {
  return (
    <div style={{ display: "flex", justifyContent: "center", backgroundColor: "rgb(245 245 247)" }}>
      <Container>
        <ProfileBox>
          <HeadBox style={{ display: "flex" }}>
            <HeadText>Your profile</HeadText>
            <Edit>수정</Edit>
          </HeadBox>

          {/* 사진 + 변경 */}
          <AvatarWrap>
            <Avatar src={img}></Avatar>
            <ChangeImg>프로필 사진 변경하기 </ChangeImg>
          </AvatarWrap>

          {/* 닉네임, 이메일 */}
          <ProfileInfo>
            <NickNameSection>
              <Span>닉네임{""}</Span>
              <Span>최애의 아이{""}</Span>
            </NickNameSection>
            <EmailSection>
              <Span>이메일</Span>
              <Span>{""}ceminh97@naver.com</Span>
            </EmailSection>
          </ProfileInfo>

          <Confirm>수정완료 </Confirm>

          {/* 로그아웃, 홈 */}
          <DirectSection>
            <Direct>로그아웃</Direct>
            <span>|</span>
            <Direct>홈으로</Direct>
          </DirectSection>
        </ProfileBox>

        <FeedsBox>
          <MyFeedsWrap>
            <MyFeeds>내 게시글</MyFeeds>
          </MyFeedsWrap>
          <FeedsWrap>
            <Feed></Feed>
            <Feed></Feed>
            <Feed></Feed>
            <Feed></Feed>
          </FeedsWrap>
          <hr></hr>
          <MyFeedsWrap>
            <MyFeeds>뭘 넣을까</MyFeeds>
          </MyFeedsWrap>
          <FeedsWrap>
            <Feed></Feed>
            <Feed></Feed>
            <Feed></Feed>
            <Feed></Feed>
          </FeedsWrap>
        </FeedsBox>
      </Container>
    </div>
  );
}

export default Mypage;

//내 프로필
const Container = styled.div`
  display: flex;
  width: 1328px;
  height: 100vh;
  background-color: rgb(245 245 247);
  margin: 100px;
`;
const ProfileBox = styled.div`
  margin-right: 60px;
  height: 40vh;
  border-radius: 30px;
  background-color: white;
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const HeadBox = styled.div`
  margin: 40px 0px 70px 0px;
`;
const HeadText = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;
const Edit = styled.button`
  font-size: 12px;
  width: 40px;
  height: 30px;
  position: relative;
  left: 63px;
`;
const AvatarWrap = styled.div`
  margin-top: -40px;
  gap: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;
const ChangeImg = styled.h1`
  font-size: 16px;
`;
const Confirm = styled.h1`
  color: white;
  background-color: #b093fa;
  font-size: 13px;
  font-weight: 500;
  padding: 10px;
  border-radius: 10px;
`;

const ProfileInfo = styled.section`
  width: 90%;
  margin-top: -40px;
`;
const NickNameSection = styled.section`
  display: flex;
  margin: 50px 10px 0px 10px;
  border-radius: 15px;
  padding: 18px;
  background-color: rgb(245 245 247);
`;
const EmailSection = styled.section`
  display: flex;

  margin: 10px;
  border-radius: 15px;
  padding: 18px;
  background-color: rgb(245 245 247);
`;

const Span = styled.span`
  margin-left: 20px;
`;
const Span2 = styled.span``;
const DirectSection = styled.section`
  display: flex;
  margin: 10px;
  gap: 20px;
`;
const Direct = styled.span`
  color: black;
`;

//피드박스
const FeedsBox = styled.div`
  padding: 10px;
  background-color: white;
  border-radius: 30px;
  width: 1000px;
`;
const MyFeedsWrap = styled.div`
  margin-top: 40px;
`;
const MyFeeds = styled.label`
  margin-left: 30px;
  font-size: 15px;
  font-weight: 600;
  width: 100%;
  border-radius: 10px;
`;
const FeedsWrap = styled.div`
  padding: 20px;
  gap: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;
const Feed = styled.div`
  background-color: #b093fa;
  width: 382px;
  height: 200px;
  padding: 20px;
  border-radius: 20px;
`;
