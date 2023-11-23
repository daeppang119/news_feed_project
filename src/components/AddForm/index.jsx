import { addDoc, collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import * as St from "../../StyledComponents/modules/AddFormStyle/AddFormStyle";
import { db } from "../../firebase/firebase";

export default function AddForm({ isOpen, setIsopen }) {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [hobby, setHobby] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data()
        };
        console.log(data);
      });
    };
    fetchData();
  }, []);

  return (
    <>
      {isOpen ? (
        <St.Main>
          <St.Container
            onSubmit={async (e) => {
              e.preventDefault();
              const newPost = {
                title,
                contents,
                hobby
              };

              const collectionRef = collection(db, "users");

              await addDoc(collectionRef, newPost);
            }}
          >
            <St.Warpper>
              <St.UserInfo>
                <St.AvatarFigure>
                  <img src={process.env.PUBLIC_URL + "/categoryimg/usericon.png"} />
                </St.AvatarFigure>
                <St.NickNameAndEmail>
                  <St.NickName>닉네임</St.NickName>
                  <St.Email>test01@gamil.com</St.Email>
                </St.NickNameAndEmail>
              </St.UserInfo>
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
                  value={hobby}
                  onChange={(e) => {
                    setHobby(e.target.value);
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
}
