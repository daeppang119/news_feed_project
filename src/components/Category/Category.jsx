import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as St from "../../StyledComponents/modules/StyledCategory/StyledCategory";
import { signOutSetState, signUpSetState } from "../../redux/modules/user";

function Category({ setCategorizedBox }) {
  const user = useSelector((state) => state.user);
  const post = useSelector((state) => state.post);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [isLoged, setIsLoged] = useState(false);
  const categoryArr = ["All", "Animation", "Game", "Sports", "Book", "Cook", "Lover", "Pet"];

  const onChangeHandler = (event) => {
    const categorizedPost = post.filter((item) => item.category === event.target.value);
    categorizedPost.length == 0 ? setCategorizedBox(post) : setCategorizedBox(categorizedPost);
  };

  const onClickHandler = (event) => {
    const categorizedPost = post.filter((item) => item.category === event.target.textContent.slice(0, -4));
    categorizedPost.length == 0 ? setCategorizedBox(post) : setCategorizedBox(categorizedPost);
  };
  const loginhandle = () => {
    dispatch(signUpSetState({ currentUser: true }));
  };
  const logouthandle = () => {
    dispatch(signOutSetState());
  };

  return (
    <>
      <St.Container>
        <St.UserInfo>
          {!user.currentUser ? (
            <>
              <St.LoginBtn onClick={loginhandle}>로그인</St.LoginBtn>
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
                  <St.UserName>{user.userName}</St.UserName>
                  <St.UserEmail>{user.email}</St.UserEmail>
                </St.UserNameEmail>
              </St.UserProfile>
              <St.PostLike>
                <St.Post>
                  <p>게시글</p>
                  <p>{user.post.length}</p>
                </St.Post>
                <St.Like>
                  <p>Today♥︎</p>
                  <p>200</p>
                </St.Like>
              </St.PostLike>
              <St.Logout onClick={logouthandle}>Logout</St.Logout>
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
          <p onClick={onClickHandler}>All</p>
          {Object.entries(category).map((item) => {
            return (
              <p onClick={onClickHandler} key={item}>
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
