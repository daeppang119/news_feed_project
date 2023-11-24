import { createGlobalStyle } from "styled-components";
import reset from "../StyledComponents/reset.module.css";
const GlobalStyle = createGlobalStyle`
${reset}

:root { --defaultColor:${({ theme }) => theme.defaultColor} }

html {
    scroll-behavior: smooth;
    font-size : 62.5%; // 1rem = 10px
}

body {
    margin: 0;
    padding: 0;
    line-height: 1.3;
    color : #000;
    letter-spacing: 0.1px;
    word-break: keep-all;
}
ul {
    list-style: none;
    padding-left: 0;
    font-size: 0;
}

button,a  {
    all : unset
}
img {
  width: 100%;
  height: 100%;
  vertical-align: top;
}
`;

export default GlobalStyle;
