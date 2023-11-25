import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;
export const ModalCard = styled.div`
  background-color: #fff0f5;
  margin: 200px auto;
  padding: 20px;
  width: 300px;
  height: 60%;
  font-size: 12px;
  ${({ theme }) => theme.mediaQuery.md`
      width: 400px;
      font-size: 14px;
    `}
  ${({ theme }) => theme.mediaQuery.lg`
      width: 600px;
      font-size: 16px;
    `}
`;

export const ModalUserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalImgNickname = styled.div`
  display: flex;
  align-items: center;
  & img {
    width: 36px;
    height: 36px;
  }
`;
export const ModalNickname = styled.div`
  margin-left: 10px;
`;
export const ModalDate = styled.div``;
export const ModalContent = styled.div`
  background-color: white;
  height: 85%;
  margin: 10px;
  padding: 20px;
`;
export const ModalCloseBtn = styled.button`
  float: right;
  cursor: pointer;
  background-color: var(--defaultColor);
  color: white;
  border: none;
  border-radius: 5px;
`;
