import React, { useState } from "react";
import { useSelector } from "react-redux";
import Category from "../components/Category/Category";
import Header from "../components/Header";
import MainPage from "../components/MainPage/MainPage";

function Main() {
  const post = useSelector((state) => state.post);
  const [categorizedPosts, setCategorizedPosts] = useState(post);
  return (
    <>
      <Header />
      <Category setCategorizedPosts={setCategorizedPosts} />
      <MainPage categorizedPosts={categorizedPosts} />
    </>
  );
}

export default Main;
