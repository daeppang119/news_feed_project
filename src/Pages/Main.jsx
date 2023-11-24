import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

function Main() {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      setUserInfo({
        uid: user.uid,
        email: user.email,
        photoURL: user.photoURL,
        displayName: user.displayName
      });
    });
  }, []);

  return (
    <div>
      <div>{userInfo.displayName}</div>
      <div>{userInfo.email}</div>
      <div>
        <img src={userInfo.photoURL} alt="" />
      </div>
    </div>
  );
}

export default Main;
