import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as St from "../StyledComponents/modules/StyledLogin/StyledLogin";
import { auth } from "../firebase/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const inputFocus = useRef(null);

  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert("로그인이 완료되었습니다.");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("아이디 혹은 비밀번호를 잘못 입력 하셨습니다.");
    }
  };

  return (
    <St.LoginLalyout>
      <St.Logo>
        <img src={process.env.PUBLIC_URL + "/Logo/logo.png"} />
      </St.Logo>
      <form onSubmit={handleSubmit}>
        <div>
          <St.Ir>아이디(이메일)</St.Ir>
          <St.LoginInput
            type="email"
            placeholder="아이디(이메일)"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            ref={inputFocus}
            required
          />
        </div>
        <div>
          <St.Ir>패스워드</St.Ir>
          <St.LoginInput
            type="password"
            pattern="[0-9a-fA-F]{4,8}"
            placeholder="패스워드"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <St.Links>
          <div>
            <St.LinksA>아이디 찾기</St.LinksA>
            <St.Box></St.Box>
            <St.LinksA>비밀번호 찾기</St.LinksA>
          </div>
          <div>
            <Link to="/join">회원가입</Link>
          </div>
        </St.Links>
        <St.LoginBtn>로그인</St.LoginBtn>
      </form>
      <St.EasyLogin>간편로그인</St.EasyLogin>
      <div>
        <St.SnsBtn>구글로 로그인하기</St.SnsBtn>
      </div>
      <div>
        <St.SnsBtn>깃으로 로그인하기</St.SnsBtn>
      </div>
    </St.LoginLalyout>
  );
}

export default Login;
