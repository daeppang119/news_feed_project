import styled from "styled-components";
export const ModalBox = styled.div`
  visibility: visible;
  position: fixed;
  inset: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: saturate(180%) blur(8px);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  width: 520px;
  background-color: white;
  border-radius: 30px;
  max-height: 90vh;
  min-height: 70vh;
  overflow-y: auto;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 12px 60px 5px;
  ${({ theme: { mediaQuery } }) => mediaQuery.md`
  width:100%;
  max-width: 620px;
  `}

  ${({ theme }) => theme.mediaQuery.lg` 
  width:100%;
  max-width: 620px;
   `}
`;

export const ModalHeader = styled.div`
  background-color: white;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
`;
export const CloseWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const CloseBtn = styled.img`
  position: relative;
  right: 20px;
  top: 15px;
  width: 20px;
  cursor: pointer;
  &:hover {
    transition: 0.5s;
    transform: scale(1.3);
  }
`;
export const HeaderText = styled.div`
  padding: 10px;
  font-size: 16px;
  border-bottom: 1px solid #fac0bb;
  margin: 5px 20px;
`;
export const ModalDiv = styled.div`
  padding: 10px;
  font-size: 25px;
  font-weight: 700;
  border-bottom: 1px solid #fac0bb;
  margin: 30px 20px 0px 20px;
`;
export const ModalAvatarWrap = styled.figure`
  padding: 30px;
  /* border-bottom: 1px solid #fac0bb;
  margin: 0px 10px; */
`;
export const MAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;
export const Fix = styled.div`
  font-size: 17px;
  margin-left: 3px;
`;
export const MEdit = styled.div`
  padding: 16px;
  font-size: 20px;
`;
export const EditContent = styled.input`
  width: 95%;
  padding: 12px;
  border-radius: 10px;
  border-color: transparent;
  background-color: #fac0bb;
  margin-top: 10px;
`;
export const SaveButtonWrap = styled.div`
  height: 150px;
  display: flex;
  justify-content: flex-end;
`;
export const SaveButton = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  right: 40px;
  top: 30px;

  width: 50px;
  height: 50px;
  object-fit: contain;

  cursor: pointer;
  transition: 0.5s;
  &:hover {
    transform: scale(1.1);
  }
`;
