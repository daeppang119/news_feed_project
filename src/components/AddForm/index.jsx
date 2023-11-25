import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as St from "../../StyledComponents/modules/AddFormStyle/AddFormStyle";
import { auth, db, storage } from "../../firebase/firebase";
import { updatePost } from "../../redux/modules/post";
import { updateUserInfoSetState } from "../../redux/modules/user";

export default function AddForm({ isOpen, setIsopen, contents, setContents, title, setTitle }) {
  const [category, setCategory] = useState("");
  const user = useSelector((state) => state.user);
  const userDataRef = collection(db, "users");
  const dispatch = useDispatch();
  const inputRef = useRef({});

  const handleAddPost = async () => {
    if (!user.currentUser) return alert("로그인 후 작성 할 수 있습니다.");
    if (title === "") {
      alert("제목을 입력해주세요");
      return false;
    } else if (contents === "") {
      alert("내용을 입력해주세요");
      return false;
    } else if (category === "") {
      alert("카테고리를 지정해주세요");
      return false;
    }
    const text = inputRef.current.text.value;
    const photoUrl = await handleImageUpload();
    if (!user["post"]) user["post"] = [];
    const newPost = {
      text,
      contents,
      date: new Date().getTime(),
      uid: auth.currentUser.uid || "",
      isEdit: false,
      category: category,
      imgurl: photoUrl || ""
    };
    user["post"].unshift(newPost);
    console.log(user);
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

  const handleImageUpload = async () => {
    const imgFile = inputRef.current.img.files[0];
    try {
      if (!imgFile) return;
      const imgRef = ref(storage, `Users/${auth.currentUser.uid}/${imgFile.name}`);
      await uploadBytes(imgRef, imgFile);
      const downloadUrl = await getDownloadURL(imgRef);
      return downloadUrl;
    } catch (e) {
      alert("img:", e);
    }
  };

  if (auth.currentUser) {
    return (
      <>
        {isOpen ? (
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%"
            }}
          >
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
                  <St.ImgBox>
                    이미지 : <input type="file" ref={(props) => (inputRef.current["img"] = props)} />
                  </St.ImgBox>
                  <St.Content
                    value={contents}
                    ref={(props) => (inputRef.current["text"] = props)}
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
                      <option value="">취미를 선택해 주세요</option>
                      <option value="애니메이션">애니메이션</option>
                      <option value="게임">게임</option>
                      <option value="운동">운동</option>
                      <option value="독서">독서</option>
                    </St.Select>
                  </St.Selecter>

                  <St.Buttons>
                    <button
                      type="button"
                      onClick={() => {
                        handleAddPost();
                        if (title && contents && category) {
                          setIsopen(false);
                        }
                      }}
                    >
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
          </div>
        ) : null}
      </>
    );
  } else {
    return null;
  }
}
