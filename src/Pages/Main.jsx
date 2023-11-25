import React from "react";
import { useSelector } from "react-redux";

function Main() {
  const user = useSelector((state) => state.user);
  console.log(user);
  return <>탭을 클릭해주세요</>;
}

export default Main;
