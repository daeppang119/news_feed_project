import styled from "styled-components";

export const LoginLalyout = styled.div`
  width: 360px;
  margin: 100px auto;
`;

export const Logo = styled.h2`
  margin-bottom: 24px;
`;

export const Ir = styled.label`
  overflow: hidden;
  display: block;
  width: 0;
  height: 0;
  font-size: 0;
  line-height: 0;
  color: transparent;
  text-indent: -99999px;
`;

export const LoginInput = styled.input`
  border: 1px solid #8d9096;
  width: 100%;
  height: 50px;
  margin-top: 6px;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 16px;
  outline: none;
  &:focus {
    border-color: var(--defaultColor);
  }
`;

export const LoginBtn = styled.button`
  width: 100%;
  height: 50px;
  margin: 24px 0;
  box-sizing: border-box;
  background-color: var(--defaultColor);
  font-size: 16px;
  text-align: center;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
`;

export const Links = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #8d9096;
  margin: 24px 0;
`;

export const EasyLogin = styled.div`
  color: #8d9096;
  font-size: 14px;
  text-align: center;
  margin-bottom: 24px;
`;

export const SnsBtn = styled.button`
  width: 360px;
  height: 50px;
  font-size: 16px;
  text-align: center;
  border-radius: 8px;
  border: 1px solid #d6d9df;
  color: #8d9096;
  margin-bottom: 6px;
  background: #fff;
  cursor: pointer;
`;

export const LayOutContainer = styled.div`
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
