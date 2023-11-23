import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as St from "../StyledComponents/modules/StyledLogin/StyledLogin";
import { auth } from "../firebase/firebase";

function Join() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const inputFocus = useRef(null);

  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
      target: { name, value }
    } = event;
    console.log(name, value);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      window.alert("회원가입이 완료되었습니다.");
      navigate("/login");
    } catch (error) {
      window.alert("오류입니다");
    }
  };

  return (
    <St.LoginLalyout>
      <div className="App">
        <St.Logo>
          <img src={process.env.PUBLIC_URL + "/Logo/logo.png"} />
        </St.Logo>
        <form onSubmit={handleSubmit}>
          <div>
            <St.Ir>아이디(이메일) </St.Ir>
            <St.LoginInput
              type="email"
              placeholder="아이디(이메일)"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              ref={inputFocus}
              required
            ></St.LoginInput>
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
            ></St.LoginInput>
          </div>
          <St.LoginBtn>회원가입</St.LoginBtn>
        </form>
        <div>
          <Link to="/login">로그인하러가기</Link>
        </div>
      </div>
    </St.LoginLalyout>
  );
}

export default Join;
