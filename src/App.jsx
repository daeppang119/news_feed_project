import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./StyledComponents/GlobalStyle";
import theme from "./StyledComponents/theme/theme";
import { db } from "./firebase/firebase";
import { setInitialListCount } from "./redux/modules/category";
import { initialFetchPost } from "./redux/modules/post";
import Router from "./shared/Router";
/*
- router 설치 완료
- styled component 설치 완료
- redux 설치 완료 하였습니다.
- firebase 설치 완료


Pages에는 회원가입, 메인화면, 개인페이지  총 3개로 나누었습니다. 

StyledComponents의 modules를 가보시면 아시겠지만 거기에 text 있숨다.
components 폴더의 Sample에 가보시면 거기에 text 있습니다.
redux 폴더의 module을 가보시면 text가 있습니다. 

StyledComponents/modules/StyledTest를 읽고 난 후 삭제 해주시면 감사하겠습니다.
Components/Sample을 이해하고 난 후 삭제 해 주시면 감사하겠습니다.
redux/ moduls/ 이거봐주세요 text를 읽고 난 후 삭제해 주세요.
*/

function App() {
  const post = useSelector((state) => state.post);
  // console.log("포스트 가져오기", post)
  const dispatch = useDispatch();
  const initialFetchData = useCallback(async () => {
    const q = query(collection(db, "users"), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      post.unshift({ ...doc.data(), id: doc.id });
      dispatch(initialFetchPost(post));
    });
    const initialSetCategory = post.reduce((acc, item) => {
      let count = 1;
      if (!acc[item]) {
        acc[item] = count;
      } else {
        acc[item] += count;
      }
      return acc;
    }, {});
    console.log(initialSetCategory);
    dispatch(setInitialListCount(initialSetCategory));
  }, [post, dispatch]);
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
