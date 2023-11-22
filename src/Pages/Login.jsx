import React from "react";
import * as St from "../StyledComponents/modules/StyledLogin/StyledLogin";

function Login() {
  return (
    <St.LoginLalyout>
      <St.Logo>
        <img src={process.env.PUBLIC_URL + "/Logo/logo.png"} />
      </St.Logo>
      <from>
        <div>
          <St.Ir>아이디(이메일)</St.Ir>
          <St.LoginInput type="email" placeholder="아이디(이메일)" />
        </div>
        <div>
          <St.Ir>패스워드</St.Ir>
          <St.LoginInput type="password" placeholder="패스워드" />
        </div>
        <St.Links>
          <div>
            <a>아이디 찾기</a>
            <a>비밀번호 찾기</a>
          </div>
          <div>
            <a>회원가입</a>
          </div>
        </St.Links>
        <St.LoginBtn>로그인</St.LoginBtn>
        <St.EasyLogin>간편로그인</St.EasyLogin>
        <div>
          <St.SnsBtn>구글로 로그인하기</St.SnsBtn>
        </div>
        <div>
          <St.SnsBtn>깃으로 로그인하기</St.SnsBtn>
        </div>
      </from>
    </St.LoginLalyout>
  );
}

export default Login;
