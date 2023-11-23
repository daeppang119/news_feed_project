import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AddForm from "../components/AddForm";

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
export const db = getFirestore(AddForm);
