import React from "react";
import * as St from "../../StyledComponents/modules/CategoryStyle/CategoryStyle";

function Category({ users }) {
  return (
    <St.Container>
      {users ? (
        <St.UserInfo>
          <St.UserProfile>
            <img src={process.env.PUBLIC_URL + "/categoryimg/usericon.png"} />
            <St.UserNameEmail>
              <St.UserName>최애의 아이들</St.UserName>
              <St.UserEmail>testB2B2B2@gmail.com</St.UserEmail>
            </St.UserNameEmail>
          </St.UserProfile>
          <St.PostLike>
            <St.Post>
              <p>게시글</p>
              <p>9개</p>
            </St.Post>
            <St.Like>
              <p>Today♥︎</p>
              <p>200</p>
            </St.Like>
          </St.PostLike>
          <St.Visitor>
            <p>프로필 방문자</p>
            <p>18명</p>
          </St.Visitor>
        </St.UserInfo>
      ) : null}

      <St.CategorySelect>
        <select>
          <option>전체</option>
          <option>애니메이션</option>
          <option>게임</option>
          <option>운동</option>
          <option>독서</option>
        </select>
      </St.CategorySelect>
      <St.CategoryBar>
        <p>☐ 전체</p>
        <p>☐ 애니메이션</p>
        <p>☐ 게임</p>
        <p>☐ 운동</p>
        <p>☐ 독서</p>
      </St.CategoryBar>
    </St.Container>
  );
}

export default Category;
