import styled from "styled-components";

export const Main = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 3;
  animation: modal-show 0.5s;
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  ${({ theme: { mediaQuery } }) => mediaQuery.md`
    margin: 0 auto;
    width: 100%;
    max-width: 100%;
    height: 100vh;
  `};
  ${({ theme }) => theme.mediaQuery.lg`
    margin: 0 auto;
    width: 100%;
    max-width: 100%;
    height: 100vh;
  `};
`;

export const Container = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 210px;
  height: 330px;
  margin: auto;
  border-radius: 20px;
  background-image: url("https://i.pinimg.com/564x/5b/4f/12/5b4f120836f452f0f916a7eb885fdd98.jpg");
  background-position: center;
  background-size: cover;
  ${({ theme: { mediaQuery } }) => mediaQuery.md`
    width: 330px;
    height: 500px;
  `};
  ${({ theme }) => theme.mediaQuery.lg`
    width: 550px;
    height: 800px;
  `};
`;

export const Warpper = styled.div`
  width: 170px;
  height: 270px;
  border-radius: 30px;
  padding: 10px;
  border: 1px solid pink;
  ${({ theme: { mediaQuery } }) => mediaQuery.md`
    scale: 1.5;
  `};
  ${({ theme }) => theme.mediaQuery.lg`
    scale: 2.5;
  `};
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  width: 80px;
  height: 30px;

  display: flex;
  align-items: center;
  border-radius: 5px;
  display: none;
`;

export const AvatarFigure = styled.div`
  width: 15px;
  height: 15px;
  overflow: hidden;
  object-fit: cover;
  border-radius: 50%;
  & img {
    width: 15px;
    height: 15px;
    overflow: hidden;
    border-radius: 50%;
  }
`;
export const NickNameAndEmail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
export const NickName = styled.p`
  font-size: 7px;
`;
export const Email = styled.p`
  font-size: 5px;
`;
export const TitleAndDate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 30px;
`;

export const Title = styled.p`
  display: block;
  font-size: 9px;
  margin-left: 3px;
  color: white;
  width: 100px;
  word-wrap: break-word;

  & input {
    width: 55px;
    height: 9px;
    font-size: 5px;
    border: 1px solid salmon;
    border-radius: 5px;
    outline: 0;
    padding: 3px;
    background-color: transparent;
    color: white;
    ${({ theme: { mediaQuery } }) => mediaQuery.md`
      width: 80px;
      height: 10px;
      font-size: 6px;
      margin-left: -2px;
  `};
  }
  & input::placeholder {
    color: white;
  }
`;

export const Content = styled.textarea`
  height: 80px;
  width: 160px;
  border: 1px solid salmon;
  font-size: 7px;
  padding: 5px;
  border-radius: 5px;
  resize: none;
  outline: 0;
  background-color: transparent;
  color: white;
  font-weight: 700;
`;

export const Selecter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

export const Lable = styled.p`
  font-size: 8px;
  color: white;
`;

export const Select = styled.select`
  border: 1px solid pink;
  outline: 0;
  border-radius: 3px;
  background-color: transparent;
  & option {
    ${({ theme: { mediaQuery } }) => mediaQuery.md`

  `};
    ${({ theme }) => theme.mediaQuery.lg`
  `};
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
  gap: 5px;

  & button:hover {
    background-color: white;
    transform: scale(1.05);
  }

  & button {
    font-size: 5px;
    padding: 3px 5px;
    background-color: transparent;
    color: pink;
    border: 0;
    border-radius: 5px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    ${({ theme: { mediaQuery } }) => mediaQuery.md`
    font-size: 7px;
  `};
  }
`;

// DetailForm

export const DetailContent = styled.p`
  height: 80px;
  width: 160px;
  border: 1px solid salmon;
  font-size: 7px;
  padding: 5px;
  border-radius: 5px;
  resize: none;
  outline: 0;
  background-color: transparent;
  color: white;
  font-weight: 700;
`;

export const DetailUserInfo = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  gap: 4px;
  width: 80px;
  height: 30px;

  display: flex;
  align-items: center;
  border-radius: 5px;
`;

export const AddDate = styled.p`
  margin-right: 5px;
  font-size: 5px;
  color: white;
`;

// 이미지 부분

export const ImgBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin-bottom: 5px;
  font-size: 5px;
  align-items: center;
  border: 1px solid salmon;
  width: 120px;
  padding: 3px;
  border-radius: 5px;
  color: white;
  & input {
    font-size: 5px;
  }
`;

export const DetailImgFigure = styled.div`
  margin: 0 auto;
  margin-bottom: 10px;
  width: 120px;
  height: 80px;
  & img {
    width: 120px;
    height: 80px;
  }
`;
