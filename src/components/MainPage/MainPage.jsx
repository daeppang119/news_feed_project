// import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as St from "../../StyledComponents/modules/StyledMainPage/StyledMainPage";
// import { auth, db, storage } from "../../firebase/firebase";
import { getFormattedDate } from "../../util/date";
import Category from "../Category/Category";
import Header from "../Header";
import Modal from "./Modal";

function MainPage() {
  const user = useSelector((state) => state.user);
  const post = useSelector((state) => state.post);
  const [isLoged, setIsLoged] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // console.log(post);
  // console.log(auth);
  // console.log(storage);
  // const docRef = doc(db, "users");
  // const docSnap = getDoc(docRef);
  // console.log(docSnap.data());
  const onClickPostHandler = (e) => {
    setIsOpen(true);
    console.log(e.target.id);
  };
  return (
    <St.MainPageContainer>
      <Header />
      <St.MainPageCategoryPost>
        <Category />
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
        <St.MainPagePostWrapper>
          {post.map((item) => {
            return (
              <St.MainPagePost key={item.id} onClick={onClickPostHandler}>
                <St.MainPagePostUser>
                  <St.MainPagePostImgNickname>
                    <img src={item.imgurl} />
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
          {/* <St.MainPagePost>
            <St.MainPagePostUser>
              <St.MainPagePostImgNickname>
                <img src={process.env.PUBLIC_URL + "/categoryimg/usericon.png"} />
                <St.MainPagePostNickname>최애의 아이들</St.MainPagePostNickname>
              </St.MainPagePostImgNickname>
              <St.MainPagePostDate>2023. 11. 22 PM 6:40</St.MainPagePostDate>
            </St.MainPagePostUser>
            <St.MainPagePostContent>
              안녕하세요 저희는 내일배움캠프에 참여중인 B반 2조입니다. 저희의 팀명은 최애의 아이들이고, 저희 조원은
              최문길, 박유나, 최민혁, 강나연, 서지훈 이렇게 다섯명입니다. 어쩌구 저쩌구
            </St.MainPagePostContent>
            <St.MainPagePostInfo>
              <St.MainPagePostLike>♥︎ 200</St.MainPagePostLike>
            </St.MainPagePostInfo>
          </St.MainPagePost> */}
        </St.MainPagePostWrapper>
      </St.MainPageCategoryPost>
    </St.MainPageContainer>
  );
}

export default MainPage;
