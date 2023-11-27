import React from "react";
import * as St from "../../StyledComponents/modules/StyledMainCard/StyledModal";

function Modal({ isOpen, setIsOpen }) {
  return (
    <St.ModalContainer style={{ display: isOpen ? "block" : "none" }}>
      <St.ModalCard>
        <St.ModalUserInfo>
          <St.ModalImgNickname>
            <img src={process.env.PUBLIC_URL + "/categoryimg/usericon.png"} />
            <St.ModalNickname>모달 닉네임</St.ModalNickname>
          </St.ModalImgNickname>{" "}
          <St.ModalDate>2023.11.24. 03:17</St.ModalDate>
        </St.ModalUserInfo>

        <St.ModalContent>
          모달 내용 모달 내용 모달 내용 모달 내용 모달 내용 모달 내용 모달 내용 모달 내용 모달 내용 모달 내용 모달 내용
          모달 내용
        </St.ModalContent>

        <St.ModalCloseBtn
          onClick={() => {
            setIsOpen(false);
          }}
        >
          닫기
        </St.ModalCloseBtn>
      </St.ModalCard>
    </St.ModalContainer>
  );
}

export default Modal;
