import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./StyledComponents/GlobalStyle";
import theme from "./StyledComponents/theme/theme";
import { db } from "./firebase/firebase";
import { initialFetchPost } from "./redux/modules/post";
import Router from "./shared/Router";

function App() {
  const post = useSelector((state) => state.post);
  const user = useSelector((state) => state.user);
  console.log(user);
  // console.log(post);
  const dispatch = useDispatch();
  const initialFetchData = useCallback(async () => {
    console.log("app에서 실행");
    // 전체 users라는 문서에서 내용물 다 가져오기
    // orderBy(key값,"desc||asc")
    const q = query(collection(db, "users"), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      post.unshift({ ...doc.data(), id: doc.id });
      dispatch(initialFetchPost(post));
    });

    // users의 특정 문서에서 내용물 다 가져오기 - 로그인 시 무언가 해줄 때 좋을듯
    // const conditionRef = collection(db, "users");
    // const conditionQ = query(conditionRef, where("uid", "==", auth.currentUser.uid));
    // const conditionQuerySnapshot = await getDocs(conditionQ);
    // console.log(conditionQuerySnapshot.docs);
    // console.log("-------조건으로 문서들 찾기-----");
    // conditionQuerySnapshot.forEach((doc) => {
    //   console.log(doc.id);
    //   console.log(doc.data());
    // });

    // // 카테고리 별로 클릭시 테마것만 보이게 하기
    // const cateRef = collection(db, "users");
    // const cateQuery = query(cateRef, where("category", "==", auth.currentUser.uid));
    // const cateSnapshot = await getDocs(cateQuery);
    // console.log(cateSnapshot.docs); // 배열의 length가 0이기에 조건문 걸기에 좋을것 같습니다.
    // cateSnapshot.forEach((doc) => {
    //   console.log(doc.id);
    //   console.log(doc.data);
    // });
  }, [post, dispatch]);

  // 원하는것만 데이터에서 얻어오는 함수
  // const FindWantPost = async (want, operator, target) => {
  //   const conditionalRef = collection(db, "user");
  //   const conditionalQuery = query(conditionalRef, where(want, operator, target));
  //   const conditionalQuerySnapshot = await getDocs(conditionalQuery);
  //   conditionalQuerySnapshot.forEach((doc) => {});
  // };
  useEffect(() => {
    if (post.length) {
      return;
    } else {
      initialFetchData();
    }
  }, [initialFetchData, post.length]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
