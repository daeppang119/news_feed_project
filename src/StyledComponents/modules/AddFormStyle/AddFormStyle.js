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
  width: 380px;
  height: 600px;
  margin: auto;
  border-radius: 20px;
  /* background-image: url("https://i.pinimg.com/564x/5b/4f/12/5b4f120836f452f0f916a7eb885fdd98.jpg");
  background-position: center;
  background-size: cover; */
  background-color: #fff0f5;
  ${({ theme: { mediaQuery } }) => mediaQuery.md`
    width: 500px;
    height: 700px;
  `};
  ${({ theme }) => theme.mediaQuery.lg`
    width: 550px;
    height: 800px;
  `};
`;

export const Warpper = styled.div`
  width: 340px;
  height: 560px;
  border-radius: 30px;
  padding: 10px;
  border: 1px solid var(--defaultColor);
  ${({ theme: { mediaQuery } }) => mediaQuery.md`
    width: 460px;
    height: 660px;
  `};
  ${({ theme }) => theme.mediaQuery.lg`
    width: 510px;
    height: 760px;
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
  width: 32px;
  height: 32px;
  border-radius: 50%;
  padding: 10px;
  ${({ theme }) => theme.mediaQuery.md`
        width: 48px;
        height: 48px;
          `};
  & img {
    width: 32px;
    height: 32px;
    overflow: hidden;
    border-radius: 50%;
    ${({ theme }) => theme.mediaQuery.md`
        width: 48px;
        height: 48px;
          `};
  }
`;
export const NickNameAndEmail = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  gap: 2px;
`;
export const NickName = styled.p``;
export const Email = styled.p``;
export const TitleAndDate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 60px;
`;

export const Title = styled.p`
  display: block;
  font-size: 18px;
  font-weight: 600;
  margin-left: 15px;
  word-wrap: break-word;
  ${({ theme }) => theme.mediaQuery.md`
    margin: 30px;
  `};
  ${({ theme }) => theme.mediaQuery.lg`
font-size: 24px;
  `};

  & input {
    width: 200px;
    height: 20px;

    border: 1px solid var(--defaultColor);
    border-radius: 5px;
    outline: 0;
    padding: 3px;
    background-color: transparent;

    ${({ theme: { mediaQuery } }) => mediaQuery.md`
      width: 250px;
      height: 20px;

      margin-left: -2px;
  `};
  }
  & input::placeholder {
  }
`;

export const Content = styled.textarea`
  height: 80px;
  width: 330px;
  border: 1px solid var(--defaultColor);

  padding: 5px;
  border-radius: 5px;
  resize: none;
  outline: 0;
  background-color: transparent;

  font-weight: 700;
  ${({ theme }) => theme.mediaQuery.md`
  height: 80px;
  width: 450px;
  `};
  ${({ theme }) => theme.mediaQuery.lg`
  height: 80px;
  width: 500px;
  `};
`;

export const Selecter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

export const Lable = styled.p`
  color: white;
`;

export const Select = styled.select`
  border: 1px solid var(--defaultColor);
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
    padding: 3px 5px;
    background-color: transparent;
    color: var(--defaultColor);
    border: 0;
    border-radius: 5px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    ${({ theme: { mediaQuery } }) => mediaQuery.md`
font-size: 14px;
  `};
    ${({ theme: { mediaQuery } }) => mediaQuery.lg`
    padding: 15px 15px 0 0;
        font-size: 16px;
`};
  }
`;

// DetailForm

export const DetailContent = styled.p`
  height: 60px;
  width: 280px;
  border: 1px solid var(--defaultColor);
  margin: 15px auto;
  padding: 10px;
  border-radius: 5px;
  resize: none;
  outline: 0;
  background-color: transparent;
  font-weight: 700;
  font-size: 12px;
  ${({ theme: { mediaQuery } }) => mediaQuery.md`
width: 400px;
font-size: 14px;
  `};
  ${({ theme }) => theme.mediaQuery.lg`
  width: 430px;
  height: 80px;
font-size: 18px;
  `};
`;

export const DetailUserInfo = styled.div`
  margin-top: 20px;
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
  margin-right: 20px;
  color: #828282;
  ${({ theme: { mediaQuery } }) => mediaQuery.md`
font-size: 10px;
  `};
  ${({ theme }) => theme.mediaQuery.lg`
font-size: 12px;
  `};
`;

// 이미지 부분

export const ImgBox = styled.div`
  /* display: flex; */
  flex-direction: column;
  gap: 5px;
  margin-bottom: 5px;

  align-items: center;
  border: 1px solid var(--defaultColor);
  width: 330px;
  padding: 3px;
  border-radius: 5px;
  ${({ theme }) => theme.mediaQuery.md`
 width: 450px;
  `};
  ${({ theme }) => theme.mediaQuery.lg`
 width: 500px;
  `};
  & input {
  }
`;

export const DetailImgFigure = styled.div`
  margin: 0 auto;
  margin-bottom: 10px;
  width: 300px;
  height: 300px;
  position: relative;
  ${({ theme: { mediaQuery } }) => mediaQuery.md`
  width: 400px;
  height: 400px;
`};
  ${({ theme }) => theme.mediaQuery.lg`
        width: 450px;
  height: 450px;
`};
  & img {
    width: 300px;
    height: 300px;
    border-radius: 10px;
    ${({ theme: { mediaQuery } }) => mediaQuery.md`
  width: 400px;
  height: 400px;
`};
    ${({ theme }) => theme.mediaQuery.lg`
      width: 450px;
  height: 450px;
`};
  }
`;
