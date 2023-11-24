import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
function SampleLayout({ children }) {
  return (
    <>
      <Div>
        <ul>
          <Link to={"SampleMain"}>SampleMain으로</Link>
          <Link to={"SampleJoin"}>SampleJoin으로</Link>
        </ul>
      </Div>
      {children}
    </>
  );
}

export default SampleLayout;

const Div = styled.div`
  ul {
    display: flex;
    gap: 60px;
  }
  a {
    font-size: 26px;
    background-color: pink;
    &:hover {
      background-color: #000;
      color: #fff;
    }
  }
`;
