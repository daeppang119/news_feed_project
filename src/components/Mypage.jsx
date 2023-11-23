import { React, useState } from "react";
import { Link } from "react-router-dom";
import * as St from "../StyledComponents/modules/PersonalPage/PersonlPage.js";
import Modal from "./Modal.jsx";

function Mypage() {
  const [modalOpen, setModalOpen] = useState(false);
  const ModalHandler = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <St.Container>
      <St.ProfileWrap>
        <St.ProfileBox>
          <St.HeadBox style={{ display: "flex" }}>
            <St.HeadText>내 프로필</St.HeadText>
            <St.Edit src={process.env.PUBLIC_URL + "/personalpageIMG/pencil2.png"} onClick={ModalHandler} />
          </St.HeadBox>
          {/* 사진 + 변경 */}
          <St.AvatarWrap>
            <St.Avatar src={process.env.PUBLIC_URL + "/personalpageIMG/avatar.jpg"}></St.Avatar>
            <St.ChangeImg>이미지 변경</St.ChangeImg>
          </St.AvatarWrap>
          {/* 닉네임, 이메일 */}
          <St.ProfileInfo>
            <St.Section>
              <St.Span>닉네임{""}</St.Span>
              <St.Span>최애의 아이{""}</St.Span>
            </St.Section>
            <St.Section>
              <St.Span>이메일</St.Span>
              <St.Span>{""}ceminh97@naver.com</St.Span>
            </St.Section>
            <St.Section style={{ marginTop: "20px" }} height={"70px"}>
              <St.Span>소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글</St.Span>
            </St.Section>
          </St.ProfileInfo>

          {/* 로그아웃, 홈 */}
          <St.DirectSection>
            <Link to={"/"}>
              <St.Direct>로그아웃</St.Direct>
            </Link>
            <span>|</span>
            <Link to={"/"}>
              <St.Direct>홈으로</St.Direct>
            </Link>
          </St.DirectSection>
        </St.ProfileBox>
      </St.ProfileWrap>

      <St.FeedsBox>
        <St.LabelWrap>
          <St.FeedLabel>내 게시글</St.FeedLabel>
        </St.LabelWrap>
        <St.FeedsWrap>
          <St.Feed>1.클릭시 화면 이동</St.Feed>
          <St.Feed>2.클릭시 화면 이동</St.Feed>
          <St.Feed>3.클릭시 화면 이동</St.Feed>
          <St.Feed>4.클릭시 화면 이동</St.Feed>
        </St.FeedsWrap>
      </St.FeedsBox>

      {/* 모달창 */}
      {modalOpen === false ? "" : <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />}
    </St.Container>
  );
}

export default Mypage;
