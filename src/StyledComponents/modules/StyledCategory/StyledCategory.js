import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  ${({ theme }) => theme.mediaQuery.md`
    display: block;
    font-size: 12px;
    margin-left: 20px;
  `}
  ${({ theme }) => theme.mediaQuery.lg`
    display: block;
    text-align: start;
    margin-left: 30px;
  `}
`;
export const UserInfo = styled.div`
  width: 120px;
  height: 150px;
  line-height: 1.5;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #fff0f5;
  border-radius: 10px;

  ${({ theme }) => theme.mediaQuery.md`
    width: 120px;
  `}
  ${({ theme }) => theme.mediaQuery.lg`
    width: 200px;
    padding: 20px;

  `};
`;
export const LoginBtn = styled.button`
  cursor: pointer;
  background-color: var(--defaultColor);
  width: 120px;
  height: 40px;
  margin-top: 20px;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: bolder;
  text-align: center;
  ${({ theme }) => theme.mediaQuery.lg`
    width: 200px;
    height: 50px;
    font-size: 16px;
  `};
`;
export const LoginMessage = styled.p`
  text-align: center;
  margin-top: 40px;
  ${({ theme }) => theme.mediaQuery.lg`
    margin-top: 30px;
    font-size: 14px
`};
`;

export const UserProfile = styled.div`
  cursor: pointer;
  text-align: center;
  font-size: 12px;
  height: 100px;
  ${({ theme }) => theme.mediaQuery.lg`
  display: flex;
  align-items: center;
  text-align: start;
  justify-content: flex-start;
  font-size: 16px;

  `};

  & img {
    width: 36px;
    height: 36px;
    padding: 10px;
    ${({ theme }) => theme.mediaQuery.lg`
    width: 46px;
    height: 46px;
    padding-left: 0;
  `};
  }
`;
export const UserNameEmail = styled.div``;
export const UserName = styled.p``;
export const UserEmail = styled.p`
  ${({ theme }) => theme.mediaQuery.md`
font-size: 10px;
  `};
  ${({ theme }) => theme.mediaQuery.lg`
font-size: 14px
`};
`;
export const PostLike = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  ${({ theme }) => theme.mediaQuery.lg`
      font-size: 16px;
  `};
  & p:first-child {
    color: var(--defaultColor);
    margin-right: 5px;
  }
`;
export const Post = styled.div`
  display: flex;
`;
export const Like = styled.div`
  display: flex;
`;
export const Logout = styled.div`
  cursor: pointer;
  color: #dcdcdc;
  text-align: center;
  font-size: 12px;
  margin-top: 20px;
  ${({ theme }) => theme.mediaQuery.lg`
      font-size: 16px;
  `};
`;
export const CategorySelect = styled.div`
  & select {
    width: 200px;
    padding: 10px;
    border: 1px solid var(--defaultColor);
    margin: 10px auto;
    ${({ theme }) => theme.mediaQuery.md`
      display: none;
    `}
  }
`;
export const CategoryBar = styled.div`
  background-color: #fff0f5;
  padding: 20px 0 20px 30px;
  border-radius: 20px;
  font-size: 12px;
  line-height: 2;
  display: none;
  ${({ theme }) => theme.mediaQuery.md`
      display: block;
      width: 120px;
  `}
  ${({ theme }) => theme.mediaQuery.lg`
      width: 200px;
      padding: 30px 0 30px 40px;
      font-size: 16px;
  `}
  & p {
    cursor: pointer;
  }
`;
