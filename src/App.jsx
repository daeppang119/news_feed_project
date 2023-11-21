import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./StyledComponents/GlobalStyle";
import theme from "./StyledComponents/theme/theme";
import { fireBase } from "./firebase/firebase";
import Router from "./shared/Router";

function App() {
  console.log(fireBase);
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
