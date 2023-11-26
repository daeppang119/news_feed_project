import { GithubAuthProvider, getAuth, signInWithPopup } from "@firebase/auth";
import React from "react";
import styled from "styled-components";

const googleBtn = () => {
  const auth = getAuth();
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider);
};

const StComponent = styled.div`
  display: grid;
  place-content: center center;
  height: 100vh;
  gap: 20px;
  div {
    width: 120px;
    height: 40px;
    border: 1px solid black;
    font-size: 32px;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
    &:hover {
      background-color: #000;
      color: #fff;
    }
  }
`;

function SampleSocialLogin() {
  return (
    <StComponent>
      <div onClick={googleBtn}>Google</div>
      <div>Github</div>
    </StComponent>
  );
}

export default SampleSocialLogin;
