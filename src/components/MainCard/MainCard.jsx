// import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as St from "../../StyledComponents/modules/StyledMainCard/StyledMainCard";
// import { auth, db, storage } from "../../firebase/firebase";
import { auth } from "../../firebase/firebase";
import { getFormattedDate } from "../../util/date";
import Category from "../Category/Category";
import DetailForm from "../DetailForm/DetailForm";

function MainCard() {
  const user = useSelector((state) => state.user);
  const post = useSelector((state) => state.post);
  console.log(post);
  const [categoriezedBox, setCategorizedBox] = useState(...[post]);
  const [DetailisOpen, setDetailIsopen] = useState(false);
  const [findTarget, setFindTarget] = useState("");
  const onClickPostHandler = (id) => {
    setDetailIsopen(true);
    setFindTarget(id);
  };

  return (
    <St.MainCategoryAndPost>
      <Category setCategorizedBox={setCategorizedBox} />
      <St.MainCardContainer>
        {/* 모달창 */}
        <DetailForm DetailisOpen={DetailisOpen} setDetailIsopen={setDetailIsopen} findTarget={findTarget} />

        {/* 전체 카드 보여주는 코드  */}
        {post.map((item) => {
          return (
            <St.MainCard
              key={item.id}
              onClick={() => {
                onClickPostHandler(item.id);
              }}
            >
              <St.MainCardUser>
                <St.MainCardImgNickname>
                  <img src={auth.photoURL || process.env.PUBLIC_URL + "/DefaultProfile/defaultprofile.jpg"} alt="" />
                  <St.MainCardNickname>{item.id}</St.MainCardNickname>
                </St.MainCardImgNickname>
                <St.MainCardDate>{getFormattedDate(item.date)}</St.MainCardDate>
              </St.MainCardUser>
              <St.MainCardContent>{item.text}</St.MainCardContent>
              <St.MainCardInfo>
                <St.MainCardLike>♥︎200</St.MainCardLike>
              </St.MainCardInfo>
            </St.MainCard>
          );
        })}
      </St.MainCardContainer>
    </St.MainCategoryAndPost>
  );
}

export default MainCard;
