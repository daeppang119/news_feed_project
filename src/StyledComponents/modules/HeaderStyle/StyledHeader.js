import styled from "styled-components";

export const Warpper = styled.div`
  margin: 0 auto;
  align-items: center;

  ${({ theme: { mediaQuery } }) => mediaQuery.md`
    height: 100px;
    display: flex;
    justify-content: space-around;
    width: 768px;
  `};
  ${({ theme }) => theme.mediaQuery.lg`
  width: 1200px;
  `};
`;

export const Imgfigure = styled.div`
  margin: 0 auto;
  width: 450px;
  height: 131px;
  ${({ theme: { mediaQuery } }) => mediaQuery.md`
    width: 200px;
    height: 58.2px;
  `};
  ${({ theme }) => theme.mediaQuery.lg`
      width: 200px
  `};
  & img {
    width: 450px;
    height: 131px;
    ${({ theme: { mediaQuery } }) => mediaQuery.md`
    width: 200px;
    height: 58.2px;
  `};
    ${({ theme }) => theme.mediaQuery.lg`
      margin-top: -10px;
      width: 250px;
      height: 60px;
  `};
  }
`;
export const InputLoginBox = styled.div``;
export const InputBox = styled.div`
  ${({ theme: { mediaQuery } }) => mediaQuery.md`
    align-items: center;
    display: flex`}
  // input
  & input {
    display: none;
    ${({ theme: { mediaQuery } }) => mediaQuery.md`
    display: flex;
    font-size: 5px;
    border: 2px solid var(--defaultColor);
    outline: 0;
    border-radius: 15px;
    padding: 5px;
    width: 150px;
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
  // button
  & button {
    display: none;
    ${({ theme: { mediaQuery } }) => mediaQuery.md`
    display: block;
    position: relative;

    border: 0;
    background-color: transparent;
    width: 25px;
    height: 25px;
    cursor: pointer;
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
  display: none;
  ${({ theme: { mediaQuery } }) => mediaQuery.md`
    display: flex;
    justify-content: center;
    margin-right: 30px;
    width: 150px;
  `};
  ${({ theme }) => theme.mediaQuery.lg`
    margin-right: 30px;
    width: 200px;
    gap: 20px;
  `};
  & button {
    ${({ theme: { mediaQuery } }) => mediaQuery.md`
    color: salmon;
    opacity: 0.7;
    font-weight: 1000;
    padding: 6px 8px;
    border-radius: 10px;
    border: 0;
    cursor: pointer;
    background-color: transparent;
    transition: all 0.2s;
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
