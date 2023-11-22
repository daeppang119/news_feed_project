import React, { useState } from "react";
import AddForm from "../components/AddForm";
import Category from "../components/Category/Category";
import DetailForm from "../components/DetailForm";
import Header from "../components/Header";

function Main() {
  const [isOpen, setIsopen] = useState(false);
  const [users, setusers] = useState(false);
  const [DetailisOpen, setDetailIsopen] = useState(false);
  return (
    <>
      <Header setIsopen={setIsopen} users={users} setusers={setusers} />
      <Category users={users} />
      <AddForm isOpen={isOpen} setIsopen={setIsopen} />
      <DetailForm DetailisOpen={DetailisOpen} setDetailIsopen={setDetailIsopen} users={users} />
      <button onClick={() => setDetailIsopen(true)}>모달열기</button>
    </>
  );
}

export default Main;
