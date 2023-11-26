import styled from "styled-components";

// export const MainPageContainer = styled.div`
//   /* background-color: lightpink; */
//
//   ${({ theme }) => theme.mediaQuery.md`
//
//   `};
//   ${({ theme }) => theme.mediaQuery.lg`
//
//   `};
// `;
export const MainCategoryAndPost = styled.div`
  // 카테고리 메인 묶어서 나란히 만들기
  margin: 0 auto;
  transition: 0.3s ease-in-out;

  ${({ theme }) => theme.mediaQuery.md`
  display: flex;
  width: 768px;
  transition: 0.3s ease;
  `};
  ${({ theme }) => theme.mediaQuery.lg`
    width: 1200px;
    transition: 0.3s ease;
    justify-content: space-between;
  `};
`;

export const MainCardContainer = styled.div`
  width: 360px;
  margin: 0 auto;
  ${({ theme }) => theme.mediaQuery.md`
    width: 568px;
    margin: 10px;
  `};
  ${({ theme }) => theme.mediaQuery.lg`
    width: 800px;
    margin: 10px;
  `};
`;
export const MainCard = styled.div`
  box-sizing: border-box;
  background-color: #fff0f5; // var(--defaultColor);
  border-radius: 10px;
  width: 360px;
  height: 400px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 12px;
  ${({ theme }) => theme.mediaQuery.md`
    width: 568px;
  `};
  ${({ theme }) => theme.mediaQuery.lg`
    width: 780px;

  `};
  &:hover {
    cursor: pointer;
  }
`;
// export const MainCardTitleUser = styled.div`
//   align-items: center;
// `;
// export const MainCardTitle = styled.h1`
//   font-size: 24px;
//   margin: 15px 10px;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
// `;
// export const MainCardContentWrapper = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;
// export const MainCardUserImg = styled.div``;
// export const MainCardUser = styled.div`
//   display: flex;
//   align-items: center;

//   & img {
//     margin: 10px;
//     width: 42px;
//     height: 42px;
//     border-radius: 50%;
//   }
// `;
// export const MainCardNicknameDate = styled.div`
//   align-items: center;
// `;
// export const MainCardNickname = styled.p`
//   font-size: 12px;
// `;
export const MainCardImg = styled.div`
  width: 300px;
  height: 300px;
  margin: 5px auto;
  & img {
  }
`;
export const MainCardDate = styled.p`
  font-size: 10px;
  color: #828282;
  padding: 5px 12px 5px 0;
  float: right;
`;
export const MainCardContent = styled.div`
  box-sizing: border-box;
  align-items: center;
  width: 320px;
  height: 40px;
  background-color: white;
  color: #333;
  border-radius: 10px;
  margin: 10px;
  padding: 13px 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${({ theme }) => theme.mediaQuery.md`
  font-size: 14px;
  `};
  ${({ theme }) => theme.mediaQuery.lg`
    font-size: 16px;
`};
`;
