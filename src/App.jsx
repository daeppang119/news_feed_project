import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./StyledComponents/GlobalStyle";
import theme from "./StyledComponents/theme/theme";
import Sample from "./components/Sample/Sample";
import fireBase from "./firebase/firebase";
import Router from "./shared/Router";

/*
- router 설치 완료
- styled component 설치 완료
- redux 설치 완료 하였습니다.
- firebase 설치 완료


Pages에는 회원가입, 메인화면, 개인페이지  총 3개로 나누었습니다. 

StyledComponents의 modules를 가보시면 아시겠지만 거기에 text 있숨다.
components 폴더의 Sample에 가보시면 거기에 text 있습니다.
redux 폴더의 module을 가보시면 text가 있습니다. 

StyledComponents/modules/StyledTest를 읽고 난 후 삭제 해주시면 감사하겠습니다.
Components/Sample을 이해하고 난 후 삭제 해 주시면 감사하겠습니다.
redux/ moduls/ 이거봐주세요 text를 읽고 난 후 삭제해 주세요.
*/

function App() {
  console.log(fireBase);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {/* Sample Component는 테스트용입니다. Sample을 보신 후 반드시 삭제해 주셔요 */}
      <Sample />
      <Router />
    </ThemeProvider>
  );
}

export default App;
