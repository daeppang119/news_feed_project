import styled from "styled-components";

export const LayOutHeader = styled.header`
  background-color: #000;
  height: 100px;
`;

export const LayOutContainer = styled.div`
  // theme에 무엇이 있는지 확인해 보시는 것도 좋을 거 같습니다. console창을 확인해주세요
  ${({ theme }) => console.log(theme.defaultColor)}

  // mobile 일 때라고 생각해도 좋을것 같습니다.;
  background-color: #000;
  color: #fff;
  height: 100%;
  font-size: 36px;

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
