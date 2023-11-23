import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import * as St from "../../StyledComponents/modules/AddFormStyle/AddFormStyle";
import { auth, db } from "../../firebase/firebase";

export default function AddForm({ isOpen, setIsopen, contents, setContents }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  console.log(auth.currentUser);

  if (auth.currentUser) {
    return (
      <>
        {isOpen ? (
          <St.Main>
            <St.Container
              onSubmit={async (e) => {
                e.preventDefault();
                const newPost = {
                  uid: auth.currentUser.uid,
                  userName: auth.currentUser.displayName,
                  profilePhotoUrl: "",
                  intro: "",
                  comment: [
                    {
                      title,
                      category,
                      imgurl: "",
                      text: contents,
                      date: new Date().toLocaleDateString("ko", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                      }),
                      email: auth.currentUser.email
                    }
                  ]
                };

                const collectionRef = collection(db, "users");

                await addDoc(collectionRef, newPost);
              }}
            >
              <St.Warpper>
                <St.TitleAndDate>
                  <St.Title>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      placeholder="주제를 정해주세요"
                    />
                  </St.Title>
                </St.TitleAndDate>
                <St.Content
                  value={contents}
                  onChange={(e) => setContents(e.target.value)}
                  placeholder="내용을 입력해주세요"
                ></St.Content>
                <St.Selecter>
                  <St.Lable>취미</St.Lable>
                  <St.Select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  >
                    <option value="애니메이션">애니메이션</option>
                    <option value="게임">게임</option>
                    <option value="운동">운동</option>
                    <option value="독서">독서</option>
                  </St.Select>
                </St.Selecter>

                <St.Buttons>
                  <button type="submit">추가</button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsopen(false);
                    }}
                  >
                    홈으로
                  </button>
                </St.Buttons>
              </St.Warpper>
            </St.Container>
          </St.Main>
        ) : null}
      </>
    );
  } else {
    return null;
  }
}
