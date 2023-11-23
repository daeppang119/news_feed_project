import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useSelector } from "react-redux";
import * as St from "../../StyledComponents/modules/StyledMainPage/StyledMainPage";
import { auth, db, storage } from "../../firebase/firebase";
import Category from "../Category/Category";
import Header from "../Header";

function MainPage() {
  const user = useSelector((state) => state.user);
  const post = useSelector((state) => state.post);
  console.log(auth);
  console.log(storage);
  const docRef = doc(db, "users");
  const docSnap = getDoc(docRef);
  console.log(docSnap.data());
  return (
    <St.MainPageContainer>
      <Header />
      <St.MainPageCategoryPost>
        <Category />
        <St.MainPagePostWrapper>
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
          <St.MainPagePost>
            <St.MainPagePostUser>
              <St.MainPagePostImgNickname>
                <img src={process.env.PUBLIC_URL + "/categoryimg/usericon.png"} />
                <St.MainPagePostNickname>팀장장이 최문길</St.MainPagePostNickname>
              </St.MainPagePostImgNickname>
              <St.MainPagePostDate>2023. 11. 22 PM 7:01</St.MainPagePostDate>
            </St.MainPagePostUser>
            <St.MainPagePostContent>저는 멋진 팀장 최문길임 ㅋ</St.MainPagePostContent>
            <St.MainPagePostInfo>
              <St.MainPagePostLike>♥︎ 1.8K</St.MainPagePostLike>
            </St.MainPagePostInfo>
          </St.MainPagePost>
          <St.MainPagePost>
            <St.MainPagePostUser>
              <St.MainPagePostImgNickname>
                <img src={process.env.PUBLIC_URL + "/categoryimg/usericon.png"} />
                <St.MainPagePostNickname>코린이</St.MainPagePostNickname>
              </St.MainPagePostImgNickname>
              <St.MainPagePostDate>2023. 11. 22 PM 7:01</St.MainPagePostDate>
            </St.MainPagePostUser>
            <St.MainPagePostContent>
              멱살잡혀 끌려가는 코린이입니다 오늘 밤엔 잠을 잘 수 없을 것 같아용
            </St.MainPagePostContent>
            <St.MainPagePostInfo>
              <St.MainPagePostLike>♥︎ 10</St.MainPagePostLike>
            </St.MainPagePostInfo>
          </St.MainPagePost>
        </St.MainPagePostWrapper>
      </St.MainPageCategoryPost>
    </St.MainPageContainer>
  );
}

export default MainPage;
