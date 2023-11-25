import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { auth } from "../../firebase/firebase";
import { initialFetchedUserPost, signOutSetState, signUpInSetState } from "../../redux/modules/user";
function SampleJoin() {
  const post = useSelector((state) => state.post);
  const user = useSelector((state) => state.user);

  const inputRef = useRef({});
  const dispatch = useDispatch();

  // 회원가입 하면 사용 할 local state입니다.
  const [isLoged, setIsLoged] = useState(false);

  // 유나님이 해보고 싶으셨던 로딩중? progressBar state
  const [loading, setLoading] = useState(false);
  const animationArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  // 회원가입 함수
  const signUp = async () => {
    const email = inputRef.current.email;
    const pwd = inputRef.current.pwd;
    // loading 걸려있어야 하고 -> 회원가입이 되면 메인화면 이동처리 해야하므로 cleanUpfunction을 걸어줘야 겠음
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email.value, pwd.value).then((userCredential) => {
        setIsLoged(true);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      switch (error.code) {
        case "auth/user-not-found" || "auth/wrong-password":
          return console.log("이메일 혹은 비밀번호가 일치하지 않습니다.");

        case "auth/email-already-in-use":
          return console.log("이미 사용 중인 이메일입니다.");

        case "auth/weak-password":
          return console.log("비밀번호는 6글자 이상이어야 합니다.");

        case "auth/network-request-failed":
          return console.log("네트워크 연결에 실패 하였습니다.");

        case "auth/invalid-email":
          return console.log("잘못된 이메일 형식입니다.");

        case "auth/internal-error":
          return console.log("잘못된 요청입니다.");

        default:
          return console.log("로그인에 실패 하였습니다.");
      }
    }
    email.value = "";
    pwd.value = "";
  };

  // 로그인 함수
  const logIn = async () => {
    // 로그인 되어있으면 alert띄우고 함수 탈출
    if (user.currentUser !== false) return alert("이미 로그인 되어있습니다.");
    setLoading(true);
    const email = inputRef.current.email;
    const pwd = inputRef.current.pwd;
    try {
      await signInFirebase().then(() => {
        setIsLoged(true);
        setLoading(false);
      });
    } catch (e) {
      setLoading(false);
      console.log(e);
    }

    email.value = "";
    pwd.value = "";
  };

  // 로그아웃 함수
  const logOut = async () => {
    // 이상한 로그인정보로 로그인 눌러도 setIsLoged가 false값이 되므로
    if (user.currentUser === false) return alert("로그인되어있지 않습니다.");
    try {
      await signOutFirebase().then(() => {
        setIsLoged(false);
      });
    } catch (e) {
      console.log(e);
    }
  };
  // firebase 통신은 함수들입니다. 각각 로그인 로그아웃을 담당합니다.
  const signInFirebase = useCallback(async () => {
    try {
      await signInWithEmailAndPassword(auth, inputRef.current.email.value, inputRef.current.pwd.value).then(
        (userCredential) => {
          const userComment = post.filter((target) => {
            return target.uid === userCredential.user.uid;
          });
          dispatch(initialFetchedUserPost(userComment));
          console.log("firbase에서 로그인됨", userCredential);
        }
      );
    } catch (e) {
      throw new Error("로그인 상태확인해주세요");
    }
  }, [dispatch, post]);

  // 로그아웃 - firebase와 통신하는 함수
  const signOutFirebase = async () => {
    try {
      await signOut(auth).then(() => console.log("firebase에서 로그아웃됨"));
    } catch (e) {
      throw new Error("로그인 중", e);
    }
  };

  useEffect(() => {
    //.currentUser 으로는 firebase의 초기화 시점 지연 문제로 유저의 로그인, 로그아웃 여부를 판단하기 부적절하다. 따라서,onAuthStateChanged(()=>{})를 사용해야겠다 .

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // user가 들어있으면 나중에 삭제 해야할것 같습니다.
        setIsLoged(true);
        dispatch(
          signUpInSetState({
            currentUser: true,
            email: user.email,
            photoUrl: user.photoURL,
            userName: user.displayName,
            uid: user.uid
          })
        );
      } else {
        // 나중에 삭제 해줘야 할것 같습니다.
        setIsLoged(false);
        // Redux의 user 객체 초기화
        dispatch(signOutSetState());
      }
    });
  }, [dispatch, setIsLoged]);

  useEffect(() => {
    return () => {
      console.log("해치웠나?");
      setLoading(false);
    };
  }, []);

  return (
    <>
      <StForm style={{ background: "#333" }}>
        <h2>로그인/회원가입</h2>
        <div>
          이메일 :
          <input name="email" ref={(el) => (inputRef.current["email"] = el)} />
        </div>
        <div>
          비번 : <input name="pwd" type="password" ref={(el) => (inputRef.current["pwd"] = el)} />
        </div>
        <StBtn onClick={signUp}>회원가입</StBtn>
        <StBtn onClick={logIn}>로그인</StBtn>
        <StBtn onClick={logOut}>로그아웃</StBtn>
      </StForm>

      {loading && (
        <StProgressJoinContainer>
          <div>
            {animationArr.map((a, i) => {
              console.log();
              return <StProgressJoinSpan $i={a} />;
            })}
          </div>
        </StProgressJoinContainer>
      )}

      {/* 그냥 로그인 버튼 누르면 로그인 되어있음으로 바뀌었다가 안되어있음으로 바뀌는데 이 문제는 나중에 해결해보시죠!! 아니면 해결방안이있다면 공유해요!! */}
      {!isLoged ? (
        <StH2>
          "로그인 <span style={{ color: "red" }}> 안되</span>어있음"
        </StH2>
      ) : (
        <StH2>{user.email} '님이 로그인 되어있음"</StH2>
      )}
    </>
  );
}

// progress Animation Start
const rotateParentAnimation = keyframes`
  0%{
    filter : hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
`;
const rotateChildrenAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  80%,100% {
    transform: scale(0);
  }
`;
const StProgressJoinSpan = styled.span`
  transform: ${(props) => `rotate(calc(18deg*${props.$i}))`};

  &::before {
    animation: ${rotateChildrenAnimation} 2s linear infinite;
    animation-delay: ${(props) => `calc(0.1s*${props.$i})`};
  }
`;

const StProgressJoinContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #042104;
  /* background-color: rgba(0, 0, 0, 0.5); */
  animation: ${rotateParentAnimation} 5s linear infinite;
  div {
    position: relative;
    width: 120px;
    height: 120px;
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: #00ff0a;
      box-shadow: 0 0 10px #00fa0a, 0 0 20px #00fa0a, 0 0 40px #00fa0a, 0 0 60px #00fa0a, 0 0 80px #00fa0a,
        0 0 100px #00fa0a;
    }
  }
`;

// progress Animation End

const StForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  height: auto;
  flex-direction: column;
  gap: 20px;
  > * {
    padding: 10px;
    background-color: #555;
    color: #fff;
  }
`;

const StBtn = styled.button`
  border: 1px solid #333;
  padding: 10px;
  width: 100px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #333;
    color: #fff;
  }
`;
const StH2 = styled.h2`
  text-align: center;
  font-size: 38px;
  color: orange;
  font-weight: bold;
`;
export default SampleJoin;
