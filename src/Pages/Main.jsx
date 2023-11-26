import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddForm from "../components/AddForm/AddForm";
import Header from "../components/Header/Header";
import MainCard from "../components/MainCard/MainCard";

function Main() {
  const post = useSelector((state) => state.post);

  const [isOpen, setIsopen] = useState(false);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  // 카테고리 클릭 or onChange 하면 post에서 filtering 처리하여 mainPage뜯어서 보여주세요, 요점은 post 원본은 냅둬야 하므로 state를 사용 하여 처리 하자!
  return (
    <>
      <Header setIsopen={setIsopen} setTitle={setTitle} setContents={setContents} />

      <MainCard />
      <AddForm
        isOpen={isOpen}
        setIsopen={setIsopen}
        contents={contents}
        setContents={setContents}
        title={title}
        setTitle={setTitle}
      />
    </>
  );
}

export default Main;
