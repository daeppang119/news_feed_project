import styled from "styled-components";

export const MainPageContainer = styled.div`
  /* background-color: lightpink; */
  margin: 0 auto;
  ${({ theme }) => theme.mediaQuery.md`
width: 768px;
  `};
  ${({ theme }) => theme.mediaQuery.lg`
width: 1200px;
  `};
`;
export const MainPageCategoryPost = styled.div`
  ${({ theme }) => theme.mediaQuery.md`
  display: flex;
  `};
  ${({ theme }) => theme.mediaQuery.lg`
    margin-left: 40px;
  `};
`;
export const MainPagePostWrapper = styled.div`
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
export const MainPagePost = styled.div`
  box-sizing: border-box;
  background-color: #fff0f5;
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
width: 780px

  `};
  &:hover {
    cursor: pointer;
  }
`;
export const MainPagePostUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const MainPagePostImgNickname = styled.div`
  display: flex;
  align-items: center;
  & img {
    margin: 10px;
    width: 36px;
    height: 36px;
  }
`;
export const MainPagePostNickname = styled.p`
  font-size: 14px;
`;
export const MainPagePostDate = styled.p`
  margin: 10px;
`;
export const MainPagePostContent = styled.div`
  background-color: var(--defaultColor);
  color: white;
  border-radius: 10px;
  margin: 10px;
  padding: 20px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${({ theme }) => theme.mediaQuery.md`
font-size: 14px;
  `};
  ${({ theme }) => theme.mediaQuery.lg`
    font-size: 16px;
    padding: 20px;
`};
`;
export const MainPagePostInfo = styled.div``;
export const MainPagePostLike = styled.div`
  float: right;
  margin: 10px;
`;
