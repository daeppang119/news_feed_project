import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as St from "../StyledComponents/modules/StyledLogin/StyledLogin";
import { auth } from "../firebase/firebase";

function Join() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const navigate = useNavigate();

  const inputFocus = useRef(null);

  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== passwordCheck) {
      window.alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const defaultNickName = (user) => {
        if (user.displayName === null) {
          return user.email.split("@")[0];
        }
      };
      console.log(defaultNickName);
      await updateProfile(user, {
        displayName: defaultNickName(user),
        photoURL: process.env.PUBLIC_URL + "/DefaultProfile/defaultprofile.jpg"
      });
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
              placeholder="패스워드"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            ></St.LoginInput>
          </div>
          <div>
            <St.Ir>패스워드 확인</St.Ir>
            <St.LoginInput
              type="password"
              placeholder="패스워드 확인"
              value={passwordCheck}
              onChange={(e) => {
                setPasswordCheck(e.target.value);
              }}
              required
            ></St.LoginInput>
          </div>

          <St.LoginBtn>회원가입</St.LoginBtn>
        </form>
        <St.LoginGo>
          <Link to="/login">이미 가입하셨나요?</Link>
        </St.LoginGo>
      </div>
    </St.LoginLalyout>
  );
}

export default Join;
