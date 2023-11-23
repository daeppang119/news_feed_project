import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { auth } from "../../firebase/firebase";
import { initialFetchedUserPost, signOutSetState, signUpInSetState } from "../../redux/modules/user";
function SampleJoin() {
  const post = useSelector((state) => state.post);
  const user = useSelector((state) => state.user);
  const inputRef = useRef({});
  const dispatch = useDispatch();
  // 회원가입 하면 사용 할 local state입니다.
  const [isLoged, setIsLoged] = useState(false);

  // 회원가입 함수
  const signUp = async () => {
    const email = inputRef.current.email;
    const pwd = inputRef.current.pwd;
    try {
      await createUserWithEmailAndPassword(auth, email.value, pwd.value).then((userCredential) => {
        setIsLoged(true);
      });
    } catch (error) {
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
    const email = inputRef.current.email;
    const pwd = inputRef.current.pwd;
    try {
      await signInFirebase().then(() => {
        setIsLoged(true);
      });
    } catch (e) {
      console.log(e);
    }

    email.value = "";
    pwd.value = "";
  };

  // 로그아웃 함수
  const logOut = async () => {
    // 이상한 로그인정보로 로그인 눌러도 setIsLoged가 false값이 되므로
    try {
      await signOutFirebase().then(() => {
        setIsLoged(false);
      });
    } catch {
      alert();
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
      console.log("로그아웃중에", e);
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
