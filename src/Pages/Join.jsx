import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as St from "../StyledComponents/modules/StyledLogin/StyledLogin";
import Animate from "../StyledComponents/modules/StyledProgress/StyledProgress";
import { auth } from "../firebase/firebase";
import { signUpSetState } from "../redux/modules/user";

function Join() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [passwordCheck, setPasswordCheck] = useState("");
  //const inputFocus = useRef(null);

  // 추가 및 수정입니다. joinFormRef를 사용하여 회원가입 input들을 관리 합니다.
  const signFormRef = useRef();
  const [joinFinished, setJoinFinished] = useState(true);
  const [isLoding, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const password = signFormRef.password.value;
    const passwordCheck = signFormRef.passwordCheck.value;
    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    // loading Progress를 나타내주기 위한 훅
    setIsLoading(true);
    // 리렌더링을 일으켜서 useEffect안에서 처리해주려고 합니다.
    setJoinFinished(false);
  };

  // 비동기적 처리는 useEffect 안에서 처리하였습니다.
  const createUserSignUp = async () => {
    const email = signFormRef.email.value;
    const password = signFormRef.password.value;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const displayName = user.email.split("@")[0];
      await updateProfile(user, {
        displayName,
        photoURL: process.env.PUBLIC_URL + "/DefaultProfile/defaultprofile.jpg"
      });
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  };

  const HandleSignUp = async () => {
    try {
      await createUserSignUp();
      onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
          dispatch(
            signUpSetState({
              currentUser: true,
              email: authUser.email,
              photoUrl: authUser.photoURL,
              userName: authUser.displayName,
              uid: authUser.uid
            })
          );
        } else {
          // 무얼 써야 할지 모르겠다...
        }
      });
    } catch (e) {
      throw new Error(JSON.stringify(e));
    }
  };
  useEffect(() => {
    signFormRef.email.focus();
  }, []);

  useEffect(() => {
    if (!joinFinished) {
      HandleSignUp().catch((e) => {
        setIsLoading(false);
        setJoinFinished(true);
        alert(e);
      });
    }
    return () => {
      // cleanFunction에 넣어준 이유는 페이지 마운트 하면 true값으로 바꿔주어야 또 회원가입시 로딩바가 보이고 createUserSignUp이라는 함수 실행이 됩니다.
      setJoinFinished(true);
      setIsLoading(false);
    };
  }, [joinFinished, navigate]);
  return (
    <>
      <St.LoginLayout>
        <div className="App">
          <St.Logo>
            <img src={process.env.PUBLIC_URL + "/Logo/logo.png"} alt="" />
          </St.Logo>
          <form onSubmit={handleSubmit}>
            <div>
              <St.Ir>아이디(이메일) </St.Ir>
              <St.LoginForwardRefInput
                type="email"
                name="email"
                placeholder="아이디(이메일)"
                ref={signFormRef}
                required
              />
            </div>
            <div>
              <St.Ir>패스워드</St.Ir>
              <St.LoginForwardRefInput
                type="password"
                name="password"
                placeholder="패스워드"
                ref={signFormRef}
                required
              />
            </div>
            <div>
              <St.Ir>패스워드 확인</St.Ir>
              <St.LoginForwardRefInput
                type="password"
                name="passwordCheck"
                placeholder="패스워드 확인"
                ref={signFormRef}
                required
              />
            </div>
            <St.LoginBtn>회원가입</St.LoginBtn>
          </form>
          <St.LoginGo>
            <Link to="/login">이미 가입하셨나요?</Link>
          </St.LoginGo>
        </div>
      </St.LoginLayout>
      {isLoding && (
        <Animate.ProgressContainer>
          <div>
            {Animate.EffectionsNumber.map((a) => {
              return <Animate.ProgressSpan key={a} $i={a} />;
            })}
          </div>
        </Animate.ProgressContainer>
      )}
    </>
  );
}

export default Join;
