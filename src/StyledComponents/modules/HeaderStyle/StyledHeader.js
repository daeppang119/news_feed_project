import styled from "styled-components";

export const LayOutHeader = styled.header`
  background-color: #000;
  height: 100px;
`;

export const LayOutContainer = styled.div`
  // theme에 무엇이 있는지 확인해 보시는 것도 좋을 거 같습니다. console창을 확인해주세요
  ${({ theme }) => console.log(theme.defaultColor)}

  // mobile 일 때라고 생각해도 좋을것 같습니다.;
  
  // 768px 이상일 때;
  ${({ theme: { mediaQuery } }) => mediaQuery.md`
   background-color:red;
  `};

  // 1200px 이상일 때;
  ${({ theme }) => theme.mediaQuery.lg`
  background-color : #fff;
  color : ${theme.defaultColor}
  `};
`;

export const Warpper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  align-items: center;
  height: 100px;
  ${({ theme: { mediaQuery } }) => mediaQuery.md`
   width: 768px;
  `};
  ${({ theme }) => theme.mediaQuery.lg`
  width: 1200px;
  `};
`;

export const Imgfigure = styled.div`
  width: 80px;
  height: 50px;
  & img {
    width: 70px;
    height: 40px;
    ${({ theme: { mediaQuery } }) => mediaQuery.md`
      margin-top: -5px;
      margin-left: 10px;
      width: 100px;
      height: 50px;
  `};
    ${({ theme }) => theme.mediaQuery.lg`
      margin-top: -10px;
      width: 250px;
      height: 60px;
  `};
  }
  ${({ theme: { mediaQuery } }) => mediaQuery.md`
   width: 100px;
  `};
  ${({ theme }) => theme.mediaQuery.lg`
      width: 200px
  `};
`;

export const InputBox = styled.div`
  display: flex;
  margin-left: 10px;
  margin-top: -10px;

  & input {
    font-size: 5px;
    border: 1px solid salmon;
    outline: 0;
    border-radius: 15px;
    padding: 5px;
    width: 150px;
    ${({ theme: { mediaQuery } }) => mediaQuery.md`
    width: 400px;
    font-Size: 10px;
    padding: 10px;
  `};
    // 1200px 이상일 때;
    ${({ theme }) => theme.mediaQuery.lg`
    width: 500px
    margtn-left:10px;
    font-size: 20px;
    padding: 10px;
  `};
  }
  & button {
    position: relative;
    right: 30px;
    border: 0;
    background-color: transparent;
    width: 20px;
    cursor: pointer;
    ${({ theme: { mediaQuery } }) => mediaQuery.md`
    scale: 1;
    right: 30px;
  `};
    // 1200px 이상일 때;
    ${({ theme }) => theme.mediaQuery.lg`
    scale:2
    right 35px;
  `};
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  width: 120px;
  margin-top: -10px;
  ${({ theme: { mediaQuery } }) => mediaQuery.md`
    margin-right: 30px;
    width: 150px;
  `};
  ${({ theme }) => theme.mediaQuery.lg`
    margin-right: 30px;
    width: 200px;
    gap: 20px;
  `};
  & button {
    color: salmon;
    opacity: 0.7;
    font-weight: 1000;
    font-size: 8px;
    padding: 6px 8px;
    border-radius: 10px;
    border: 0;
    cursor: pointer;
    background-color: transparent;
    transition: all 0.2s;
    ${({ theme: { mediaQuery } }) => mediaQuery.md`
   font-size: 15px;
  `};
    ${({ theme }) => theme.mediaQuery.lg`
    font-size: 20px;
  `};
  }

  & button:hover {
    transform: scale(1.05);
    opacity: 1.5;
    text-decoration: underline;
  }
`;
