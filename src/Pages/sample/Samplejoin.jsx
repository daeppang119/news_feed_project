import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { auth } from "../../firebase/firebase";
import {
  failedLoginSetState,
  initialFetchedPost,
  signInSetState,
  signOutSetState,
  signUpSetState
} from "../../redux/modules/user";
function SampleJoin() {
  const user = useSelector((state) => state.user);
  const inputRef = useRef({});
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  // 회원가입 함수
  const signUp = async () => {
    const email = inputRef.current.email;
    const pwd = inputRef.current.pwd;

    try {
      dispatch(
        signUpSetState({
          email: email.value,
          pwd: pwd.value
        })
      );
      await createUserWithEmailAndPassword(auth, user.email, user.pwd);
    } catch (e) {
      if (e.code === "auth/invalid-email" || e.code === "auth/missing-email") {
        alert("이메일 고장");
      }
      if (e.code === "auth/missing-password" || e.code === "auth/invalid-password") {
        alert("비번 고장");
      }
    }

    email.value = "";
    pwd.value = "";
  };

  // 로그인 함수
  const logIn = async () => {
    const email = inputRef.current.email;
    const pwd = inputRef.current.pwd;

    dispatch(
      signInSetState({
        currentUser: true
      })
    );
    await signInFirebase();
    email.value = "";
    pwd.value = "";
  };

  const logOut = async () => {
    dispatch(signOutSetState());
    await signOutFirebase();
  };
  // firebase 통신은 함수들입니다. 각각 로그인 로그아웃을 담당합니다.
  const signInFirebase = useCallback(async () => {
    try {
      await signInWithEmailAndPassword(auth, inputRef.current.email.value, inputRef.current.pwd.value).then(
        (userCredential) => {
          const userComment = post.filter((target) => {
            console.log(target.uid, userCredential.user.uid);
            return target.uid === userCredential.user.uid;
          });
          console.log(userComment, userCredential.user.id);
          console.log(post);
          dispatch(initialFetchedPost(userComment));
          console.log("firbase에서 로그인됨", userCredential);
        }
      );
    } catch (e) {
      dispatch(failedLoginSetState({ currentUser: false }));
    }
  }, [dispatch, post]);
  const signOutFirebase = async () => {
    try {
      await signOut(auth).then(() => console.log("firebase에서 로그아웃됨"));
    } catch (e) {
      console.log("로그아웃중", e);
    }
  };

  useEffect(() => {
    //.currentUser 으로는 firebase의 초기화 시점 지연 문제로 유저의 로그인, 로그아웃 여부를 판단하기 부적절하다. 따라서,onAuthStateChanged(()=>{})를 사용해야겠다 .
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return;
      }
      return signOutFirebase();
    });
  }, [dispatch, user.currentUser, signInFirebase]);

  return (
    <>
      <StForm style={{ background: "#333" }}>
        <h2>로그인/회원가입</h2>
        <div>
          이메일 :
          <StInput name="email" ref={(el) => (inputRef.current["email"] = el)} />
        </div>
        <div>
          비번 : <input name="pwd" type="password" ref={(el) => (inputRef.current["pwd"] = el)} />
        </div>
        <StBtn onClick={signUp}>회원가입</StBtn>
        <StBtn onClick={logIn}>로그인</StBtn>
        <StBtn onClick={logOut}>로그아웃</StBtn>
      </StForm>

      {/* 그냥 로그인 버튼 누르면 로그인 되어있음으로 바뀌었다가 안되어있음으로 바뀌는데 이 문제는 나중에 해결해보시죠!! 아니면 해결방안이있다면 공유해요!! */}
      {!user.currentUser ? (
        <StH2>
          "로그인 <span style={{ color: "red" }}> 안되</span>어있음"
        </StH2>
      ) : (
        <StH2>"로그인 되어있음"</StH2>
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

const StInput = styled.input.attrs({
  type: "email"
})`
  all: unset;
  border: 1px solid black;
  padding-left: 12px;
  padding: 12px;
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
