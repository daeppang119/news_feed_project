import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as St from "../../StyledComponents/modules/StyledCategory/StyledCategory";

function Category({ setCategorizedPosts }) {
  const post = useSelector((state) => state.post);
  const [isLoged, setIsLoged] = useState(false);
  const [categoryCount, setCategoryCount] = useState(0);
  const categoryArr = ["전체", "애니메이션", "게임", "운동", "독서"];

  const onChangeHandler = (event) => {
    const categorizedPost = post.filter((item) => item.category === event.target.value);

    categorizedPost.length == 0 ? setCategorizedPosts(post) : setCategorizedPosts(categorizedPost);
    setCategoryCount(categorizedPost.length);
  };
  console.log(categoryCount);

  const onClickHandler = (event) => {
    const categorizedPost = post.filter((item) => item.category === event.target.textContent);

    categorizedPost.length == 0 ? setCategorizedPosts(post) : setCategorizedPosts(categorizedPost);
  };
  return (
    <St.Container>
      <St.UserInfo>
        {!isLoged ? (
          <>
            <St.LoginBtn onClick={() => setIsLoged(true)}>로그인</St.LoginBtn>
            <St.LoginMessage>
              최애의 아이들이 되어
              <br />
              일상을 공유해보세요
            </St.LoginMessage>
          </>
        ) : (
          <>
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
            <St.Logout onClick={() => setIsLoged(false)}>Logout</St.Logout>
          </>
        )}
      </St.UserInfo>

      <St.CategorySelect>
        <select onChange={onChangeHandler}>
          {categoryArr.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </St.CategorySelect>
      <St.CategoryBar>
        {categoryArr.map((item) => (
          <p onClick={onClickHandler}>{item}</p>
        ))}
      </St.CategoryBar>
    </St.Container>
  );
}

export default Category;
