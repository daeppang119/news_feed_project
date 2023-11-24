import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as St from "../StyledComponents/modules/PersonalPage/PersonlPage.js";
import { updateUserInfoSetState } from "../redux/modules/user.js";
function Modal({ modalOpen, setModalOpen, image }) {
  // modal handler
  const ModalHandler = () => {
    setModalOpen(!modalOpen);
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // form state start
  const [name, setName] = useState(user.userName);
  const [email, setEmail] = useState(user.email);
  const [intro, setIntro] = useState(user.intro);

  const SaveButtonHandler = () => {
    dispatch(
      updateUserInfoSetState({
        userName: name,
        email: email,
        intro: intro
      })
    );
    const answer = window.confirm("저장하시겠어요?");
    if (answer) setModalOpen(!modalOpen);
  };

  // edit
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
          <St.MAvatar src={image} />
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
              defaultValue={name}
              maxLength={10}
              placeholder="최대 10글자"
            />
          </St.MEdit>
          <St.MEdit>
            <St.Fix>
              이메일<span style={{ color: "#ff5c00" }}>*</span>
            </St.Fix>
            <St.EditContent
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              defaultValue={email}
              placeholder="올바른 형식을 갖춰주세요"
            />
          </St.MEdit>
          <St.MEdit>
            <St.Fix>소개글</St.Fix>
            <St.EditContent
              onChange={(event) => {
                setIntro(event.target.value);
              }}
              defaultValue={intro}
              maxLength={100}
              placeholder="최대 100글자"
            />
          </St.MEdit>
          <St.SaveButtonWrap>
            <St.SaveButton onClick={SaveButtonHandler} src={process.env.PUBLIC_URL + "/personalpageIMG/stamp.png"} />
          </St.SaveButtonWrap>
        </St.Form>
      </St.ModalContent>
    </St.ModalBox>
  );
}

export default Modal;
