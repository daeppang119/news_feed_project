// import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as St from "../../StyledComponents/modules/StyledMainCard/StyledMainCard";
// import { auth, db, storage } from "../../firebase/firebase";
import { getFormattedDate } from "../../util/date";
import Category from "../Category/Category";
import DetailForm from "../DetailForm/DetailForm";

function MainCard() {
  const user = useSelector((state) => state.user);
  const post = useSelector((state) => state.post);

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
        {categoriezedBox.map((item) => {
          return (
            <St.MainCard
              key={item.id}
              onClick={() => {
                onClickPostHandler(item.id);
              }}
            >
              <St.MainCardImg>
                <img src={item.imgurl} />
              </St.MainCardImg>
              <St.MainCardDate>{getFormattedDate(item.date)}</St.MainCardDate>
              <St.MainCardContent>{item.contents}</St.MainCardContent>
            </St.MainCard>
          );
        })}
      </St.MainCardContainer>
    </St.MainCategoryAndPost>
  );
}

export default MainCard;
