import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as St from "../StyledComponents/modules/StyledLogin/StyledLogin";
import Animate from "../StyledComponents/modules/StyledProgress/StyledProgress";
import AuthLogin from "../firebase/AuthLogin";
import { auth } from "../firebase/firebase";

import { initialFetchedUserPost, signOutSetState, signUpInSetState } from "../redux/modules/user";
function Login() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 추가 START
  const post = useSelector((state) => state.post);
  const user = useSelector((state) => state.user);
  const loginFormRef = useRef({});
  const [isLoging, setIsLoging] = useState(false);

  // 추가 END

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const userCredential = await signInWithEmailAndPassword(auth, email, password);
  //     const user = userCredential.user;
  //     dispatch(
  //       signUpInSetState({
  //         currentUser: true,
  //         email: user.email,
  //         photoUrl: user.photoURL,
  //         userName: user.displayName,
  //         uid: user.uid
  //       })
  //     );
  //     alert("로그인이 완료되었습니다.");
  //     navigate("/");
  //   } catch (error) {
  //     console.error(error);
  //     alert("아이디 혹은 비밀번호를 잘못 입력 하셨습니다.");
  //   }
  // };
  const handleSubmitLogin = useCallback(
    async (e) => {
      e.preventDefault();
      if (user.currentUser !== false) return alert("이미 로그인 되어있습니다.");
      setIsLoging(true);
      const email = loginFormRef.email;
      const password = loginFormRef.password;
      try {
        await signInFirebase();
      } catch (e) {
        throw new Error("로그인 상태 확인해주세요");
      }
      email.value = "";
      password.value = "";
    },
    [user.currentUser]
  );
  // 파이어베이스와 통신하는 비동기 함수입니다.
  const signInFirebase = useCallback(async () => {
    try {
      await signInWithEmailAndPassword(auth, loginFormRef.email.value, loginFormRef.password.value).then(
        (userCredential) => {
          const userComment = post.filter((target) => {
            return target.uid === userCredential.user.uid;
          });
          dispatch(initialFetchedUserPost(userComment));
        }
      );
    } catch (e) {
      throw new Error("로그인 상태확인해주세요");
    }
  }, [dispatch, post]);
  // 로그인 성공시 로그인한 유저의 정보를 'user' state에 전달합니다.
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoging(true);
        if (user) {
          setIsLoging(true);
          dispatch(
            signUpInSetState({
              currentUser: true,
              email: user.email,
              photoUrl: user.photoURL,
              userName: user.displayName,
              uid: user.uid
            })
          );
          navigate("/");
        } else {
          setIsLoging(false);
          dispatch(signOutSetState());
        }
      }
    });
    return () => {
      setIsLoging(false);
    };
  }, [dispatch, isLoging]);

  // 로그인 페이지 오면 email input에 포커스 하는 useEffect입니다.
  useEffect(() => {
    loginFormRef.email.focus();
  }, []);
  return (
    <>
      <St.LoginLayout>
        <Link to="/">
          <St.Logo>
            <img src={process.env.PUBLIC_URL + "/Logo/logo.png"} alt="" />
          </St.Logo>
        </Link>
        <form onSubmit={handleSubmitLogin}>
          <div>
            <St.Ir>아이디(이메일)</St.Ir>
            <St.LoginForwardRefInput
              type="email"
              placeholder="아이디(이메일)"
              name="email"
              ref={loginFormRef}
              required
            />
          </div>
          <div>
            <St.Ir>패스워드</St.Ir>
            <St.LoginForwardRefInput
              type="password"
              placeholder="패스워드"
              name="password"
              ref={loginFormRef}
              required
            />
          </div>
          <St.Links>
            <div>
              <St.LinksA>아이디 찾기</St.LinksA>
              <St.Box></St.Box>
              <St.LinksA>비밀번호 찾기</St.LinksA>
            </div>
            <St.LinksA>
              <Link to="/join">회원가입</Link>
            </St.LinksA>
          </St.Links>
          <St.LoginBtn>로그인</St.LoginBtn>
        </form>
        <AuthLogin />
      </St.LoginLayout>
      {isLoging && (
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
export default Login;
