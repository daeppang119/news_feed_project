import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as St from "../../StyledComponents/modules/StyledCategory/StyledCategory";

function Category({ setCategorizedBox }) {
  const post = useSelector((state) => state.post);
  const category = useSelector((state) => state.category);
  const [isLoged, setIsLoged] = useState(false);
  const [categoryCount, setCategoryCount] = useState(0);
  const categoryArr = ["All", "Animation", "Game", "Sports", "Book", "Cook", "Lover", "Pet"];

  const onChangeHandler = (event) => {
    const categorizedPost = post.filter((item) => item.category === event.target.value);
    setCategorizedBox(categorizedPost);
  };

  const onClickHandler = (event) => {
    const categorizedPost = post.filter((item) => item.category === event.target.textContent);
    setCategorizedBox(categorizedPost);
  };
  return (
    <>
      <St.Container>
        <St.UserInfo>
          {!isLoged ? (
            <>
              <St.LoginBtn onClick={() => setIsLoged(true)}>로그인</St.LoginBtn>
              <St.LoginMessage>
                최애의 아이들이 되어
                <br />
                일상을 공유보세요
              </St.LoginMessage>
            </>
          ) : (
            <>
              <St.UserProfile>
                <img src={process.env.PUBLIC_URL + "/categoryimg/usericon.png"} alt="" />
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
          {/* {categoryArr.map((item) => (
            <p key={item.id} onClick={onClickHandler}>
              {item}
            </p>
          ))} */}
          {Object.entries(category).map((item) => {
            return (
              <p onClick={onClickHandler}>
                {item[0]} ({item[1]})
              </p>
            );
          })}
        </St.CategoryBar>
      </St.Container>
    </>
  );
}

export default Category;
