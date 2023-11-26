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
  height: 180px;
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
export const MainCardUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const MainCardImgNickname = styled.div`
  display: flex;
  align-items: center;
  & img {
    margin: 10px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;
export const MainCardNickname = styled.p`
  font-size: 14px;
`;
export const MainCardDate = styled.p`
  margin: 10px;
`;
export const MainCardContent = styled.div`
  background-color: white;
  color: #333;
  border-radius: 10px;
  margin: 0 10px;
  padding: 36px 28px;
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
export const MainCardInfo = styled.div``;
export const MainCardLike = styled.div`
  float: right;
  margin: 5px 10px;
`;
