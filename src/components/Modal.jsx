import React, { useState } from "react";
import * as St from "../StyledComponents/modules/PersonalPage/PersonlPage.js";
function Modal({ modalOpen, setModalOpen }) {
  // modal handler

  const ModalHandler = () => {
    setModalOpen(!modalOpen);
  };
  // form state start
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [lineIntro, setLineIntro] = useState("");

  return (
    <St.ModalBox>
      <St.ModalContent>
        <St.ModalHeader>
          <St.CloseWrap>
            <St.CloseBtn src={process.env.PUBLIC_URL + "/personalpageIMG/close.png"} onClick={ModalHandler} />
          </St.CloseWrap>
          <St.HeaderText>프로필설정</St.HeaderText>
        </St.ModalHeader>
        <St.ModalDiv>계정</St.ModalDiv>
        <St.ModalAvatarWrap>
          <St.MAvatar src={process.env.PUBLIC_URL + "/personalpageIMG/avatar.jpg"} />
        </St.ModalAvatarWrap>

        <St.Form>
          <St.MEdit>
            <St.Fix>
              이름<span style={{ color: "#ff5c00" }}>*</span>
            </St.Fix>
            <St.EditContent
              onChange={(event) => {
                setName(event.target.value);
              }}
            ></St.EditContent>
          </St.MEdit>
          <St.MEdit>
            <St.Fix>
              이메일<span style={{ color: "#ff5c00" }}>*</span>
            </St.Fix>
            <St.EditContent></St.EditContent>
          </St.MEdit>
          <St.MEdit>
            <St.Fix>닉네임</St.Fix>
            <St.EditContent></St.EditContent>
          </St.MEdit>
          <St.MEdit>
            <St.Fix>한 줄 소개</St.Fix>
            <St.EditContent></St.EditContent>
          </St.MEdit>
          <St.SaveButtonWrap>
            <St.SaveButton src={process.env.PUBLIC_URL + "/personalpageIMG/stamp.png"} />
          </St.SaveButtonWrap>
        </St.Form>
      </St.ModalContent>
    </St.ModalBox>
  );
}

export default Modal;
