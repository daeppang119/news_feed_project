import React, { useState } from "react";
import AddForm from "../components/AddForm";
import Category from "../components/Category/Category";
import DetailForm from "../components/DetailForm";
import Header from "../components/Header";

function Main() {
  const [isOpen, setIsopen] = useState(false);
  const [DetailisOpen, setDetailIsopen] = useState(false);
  const [contents, setContents] = useState("");
  return (
    <>
      <Header setIsopen={setIsopen} />
      <Category />
      <AddForm isOpen={isOpen} setIsopen={setIsopen} contents={contents} setContents={setContents} />
      <DetailForm DetailisOpen={DetailisOpen} setDetailIsopen={setDetailIsopen} contents={contents} />
      <button type="button" onClick={() => setDetailIsopen(true)}>
        모달열기
      </button>
    </>
  );
}

export default Main;
