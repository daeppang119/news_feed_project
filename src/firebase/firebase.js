import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// .env.local 이라는 파일을 root에서 만들어주고 그 파일 안에다
//REACT_APP_FB_API_KEY = "AIzaSyAxmTgM_oMiwatey1BLjk30SEG9X07Bx4A"
// 변수명으로 작성 해주세요 그리고 line 8번처럼 해주세요

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
export const fireBase = initializeApp(firebaseConfig);
// user정보를 담고있습니다. - firebase와 통신 했을 때 로그인 되어있으면 aut.currentUser가 객체형태로 담겨져 있고 로그인이 안되어있으면 null 값입니다.
export const auth = getAuth(fireBase);

// 이미지 저장하려고 storage를 불러왔습니다.
export const storage = getStorage(fireBase);

// db안에 storage에 등록한 이미지 저장 주소와 text 등을 string으로 담고있는 Cloud firebase 입니다.
export const db = getFirestore(fireBase);
