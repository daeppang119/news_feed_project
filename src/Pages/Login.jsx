import React, { useState } from "react";
import * as St from "../StyledComponents/modules/StyledLogin/StyledLogin";
import Animate from "../StyledComponents/modules/StyledProgress/StyledProgress";
import AuthLogin from "../components/auth/AuthLogin";
import EmailLogin from "../components/auth/EmailLogin";
function Login() {
  const [isLoging, setIsLoging] = useState(false);

  // 추가 END

  const handleSubmitLogin = useCallback(
    async (e) => {
      e.preventDefault();
      if (user.currentUser) return alert("이미 로그인 되어있습니다.");
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
      alert(e);
    }
  }, [dispatch, post]);
  // 로그인 성공시 로그인한 유저의 정보를 'user' state에 전달합니다.
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser && isLoging) {
        setIsLoging(false);
        dispatch(
          signInSetState({
            currentUser: true,
            email: authUser.email,
            photoUrl: authUser.photoURL,
            userName: authUser.displayName,
            uid: authUser.uid
          })
        );
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
        <EmailLogin isLoging={isLoging} setIsLoging={setIsLoging} />
        {/* social Login */}
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
