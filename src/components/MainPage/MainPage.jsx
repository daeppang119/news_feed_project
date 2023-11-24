// import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as St from "../../StyledComponents/modules/StyledMainPage/StyledMainPage";
// import { auth, db, storage } from "../../firebase/firebase";
import { getFormattedDate } from "../../util/date";
import Category from "../Category/Category";
import DetailForm from "../DetailForm";

function MainPage() {
  const user = useSelector((state) => state.user);
  const post = useSelector((state) => state.post);
  const [categoriezedBox, setCategorizedBox] = useState(post);
  const [DetailisOpen, setDetailIsopen] = useState(false);
  const onClickPostHandler = (id) => {
    setDetailIsopen(true);
  };

  return (
    <>
      <Category setCategorizedBox={setCategorizedBox} />
      <St.MainPageContainer>
        <DetailForm DetailisOpen={DetailisOpen} setDetailIsopen={setDetailIsopen} />
        {categoriezedBox.map((item) => {
          return (
            <St.MainPagePost
              key={item.id}
              onClick={() => {
                onClickPostHandler(item.id);
              }}
            >
              <St.MainPagePostUser>
                <St.MainPagePostImgNickname>
                  <img src={item.imgurl} alt="" />
                  <St.MainPagePostNickname>{item.id}</St.MainPagePostNickname>
                </St.MainPagePostImgNickname>
                <St.MainPagePostDate>{getFormattedDate(item.date)}</St.MainPagePostDate>
              </St.MainPagePostUser>
              <St.MainPagePostContent>{item.text}</St.MainPagePostContent>
              <St.MainPagePostInfo>
                <St.MainPagePostLike>♥︎200</St.MainPagePostLike>
              </St.MainPagePostInfo>
            </St.MainPagePost>
          );
        })}
      </St.MainPageContainer>
    </>
  );
}

export default MainPage;
