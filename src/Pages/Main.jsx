import React, { useState } from "react";
import AddForm from "../components/AddForm/AddForm";
import Header from "../components/Header/Header";
import MainCard from "../components/MainCard/MainCard";

function Main() {
  const [isOpen, setIsopen] = useState(false);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

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
