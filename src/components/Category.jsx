import React from "react";
import styled from "styled-components";

function Category() {
  return (
    <Container>
      <UserInfo>
        <UserProfile>
          {/* <img src={user} /> */}
          <UserNameEmail>
            <UserName>최애의 아이들</UserName>
            <UserEmail>test@gmail.com</UserEmail>
          </UserNameEmail>
        </UserProfile>
        <PostLike>
          <Post>
            <p>게시글</p>
            <p>9개</p>
          </Post>
          <Like>
            <p>Today♥︎</p>
            <p>200</p>
          </Like>
        </PostLike>
        <Visitor>
          <p>프로필 방문자</p>
          <p>18명</p>
        </Visitor>
      </UserInfo>
      <CategorySelect>
        <select>
          <option>전체</option>
          <option>애니메이션</option>
          <option>게임</option>
          <option>운동</option>
          <option>독서</option>
        </select>
      </CategorySelect>
      <CategoryBar>
        <p>☐ 전체</p>
        <p>☐ 애니메이션</p>
        <p>☐ 게임</p>
        <p>☐ 운동</p>
        <p>☐ 독서</p>
      </CategoryBar>
    </Container>
  );
}

export default Category;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 768px) {
    display: block;
    margin-left: 80px;
  }
  @media screen and (min-width: 1024px) {
  }
  @media screen and (min-width: 1600px) {
    font-size: 24px;
  }
`;
const UserInfo = styled.div`
  width: 170px;
  height: 150px;
  line-height: 1.5;
  padding: 10px;
  @media screen and (min-width: 1600px) {
    width: 300px;
  }
`;
const UserProfile = styled.div`
  display: flex;
  align-items: center;
  height: 100px;

  & img {
    color: #f900a3;
    width: 36px;
    height: 36px;
    padding: 10px;
  }
`;
const UserNameEmail = styled.div``;
const UserName = styled.p``;
const UserEmail = styled.p``;
const PostLike = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  & p:first-child {
    color: #f900a3;
    margin-right: 5px;
  }
`;
const Post = styled.div`
  display: flex;
`;
const Like = styled.div`
  display: flex;
`;
const Visitor = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  & p:first-child {
    color: #f900a3;
  }
`;
const CategorySelect = styled.div`
  & select {
    width: 300px;
    padding: 10px;
    border: 1px solid #f900a3;
    @media screen and (min-width: 768px) {
      display: none;
    }
    @media screen and (min-width: 1024px) {
    }
    @media screen and (min-width: 1600px) {
    }
  }
`;
const CategoryBar = styled.div`
  box-sizing: border-box;
  background-color: #ebebeb;
  width: 170px;
  margin: 20px;
  padding: 20px;
  border-radius: 20px;
  font-size: 12px;
  line-height: 2;
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
  }
  @media screen and (min-width: 1024px) {
  }
  @media screen and (min-width: 1600px) {
  }
`;
