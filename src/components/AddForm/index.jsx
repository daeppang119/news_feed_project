import { addDoc, collection, getDocs, query } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as St from "../../StyledComponents/modules/AddFormStyle/AddFormStyle";
import { auth, db } from "../../firebase/firebase";
import { updatePost } from "../../redux/modules/post";
import { updateUserInfoSetState } from "../../redux/modules/user";

export default function AddForm({ isOpen, setIsopen, contents, setContents }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const user = useSelector((state) => state.user);
  const userDataRef = collection(db, "users");
  const dispatch = useDispatch();
  const inputRef = useRef({});

  const handleAddPost = async () => {
    if (!user.currentUser) return alert("로그인 후 작성 할 수 있습니다.");
    const text = inputRef.current.text.value;
    if (!user["post"]) user["post"] = [];
    const newPost = {
      text,
      contents,
      Date: new Date().toLocaleDateString("ko", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }),
      uid: auth.currentUser.uid || "",
      isEdit: false,
      category: category,
      imgurl: ""
    };
    user["post"].unshift(newPost);
    dispatch(updateUserInfoSetState({ ...user }));

    await addDoc(userDataRef, newPost);
    const q = query(userDataRef);
    const querySnapshot = await getDocs(q);
    const dataSet = new Set();
    querySnapshot.forEach((doc) => {
      dataSet.add({ id: doc.id, ...doc.data() });
    });
    const newPostState = [...dataSet];

    dispatch(updatePost(newPostState));
  };

  console.log(user);

  if (auth.currentUser) {
    return (
      <>
        {isOpen ? (
          <St.Main>
            <St.Container
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <St.Warpper>
                <St.TitleAndDate>
                  <St.Title>
                    <input
                      value={title}
                      ref={(props) => (inputRef.current["text"] = props)}
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
                  <button type="button" onClick={handleAddPost}>
                    추가
                  </button>
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
