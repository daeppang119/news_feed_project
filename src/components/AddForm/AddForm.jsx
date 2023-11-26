import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import * as St from "../../StyledComponents/modules/AddFormStyle/AddFormStyle";
import { auth, db, storage } from "../../firebase/firebase";
import { updatePost } from "../../redux/modules/post";
import { updateUserInfoSetState } from "../../redux/modules/user";
import AddSlider from "./AddSlider";
export default function AddForm({ isOpen, setIsopen, contents, setContents, title, setTitle }) {
  const [category, setCategory] = useState("");
  const user = useSelector((state) => state.user);
  const userDataRef = collection(db, "users");
  const dispatch = useDispatch();
  const inputRef = useRef({});
  const categoryArr = ["All", "Animation", "Game", "Sports", "Book", "Cook", "Lover", "Pet"];

  const [showImages, setShowImages] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  // 이미지 미리보여주는 함수
  const previewImages = (e) => {
    const files = e.target.files;
    let imagesUrl = [...showImages];
    uploadImages.push(files[0]);

    for (let i = 0; i < files.length; i++) {
      const currentImageUrl = URL.createObjectURL(files[i]);
      imagesUrl.push(currentImageUrl);
    }

    if (imagesUrl.length > 5) {
      imagesUrl.splice(0, 5);
    }

    setShowImages(imagesUrl);
  };
  console.log(uploadImages);
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
    const [photoUrlKeis, imagesUrl] = await handleUpLoadPostImages();
    if (!user["post"]) user["post"] = [];
    const newPost = {
      category: category,
      imgurl: imagesUrl || "",
      text: title,
      date: new Date().getTime(),
      contents: contents,
      uid: auth.currentUser.uid || "",
      isEdit: false,
      photoKey: photoUrlKeis
    };
    user["post"].unshift(newPost);
    dispatch(updateUserInfoSetState({ ...user }));

    await addDoc(userDataRef, newPost);
    const q = query(userDataRef, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    const dataSet = new Set();
    querySnapshot.forEach((doc) => {
      dataSet.add({ id: doc.id, ...doc.data() });
    });
    const newPostState = [...dataSet];

    dispatch(updatePost(newPostState));
  };

  const handleUpLoadPostImages = async () => {
    let photoUrlKeis = [];
    let imagesUrl = [];
    for (let i = 0; i < uploadImages.length; i++) {
      const postUrlKey = uuid();
      photoUrlKeis.push(postUrlKey);
      let upLoadImageRef = ref(storage, `${user.uid}/${postUrlKey}`);
      await uploadBytes(upLoadImageRef, uploadImages[i]);
      await getDownloadURL(upLoadImageRef).then((url) => imagesUrl.push(url));
    }
    setUploadImages([]);
    return [photoUrlKeis, imagesUrl];
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
                    {showImages.length ? <AddSlider showImages={showImages} setShowImages={setShowImages} /> : null}
                    이미지 :
                    <input
                      type="file"
                      multiple
                      ref={(props) => (inputRef.current["img"] = props)}
                      onChange={previewImages}
                    />
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
                      {categoryArr.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </St.Select>
                  </St.Selecter>

                  <St.Buttons>
                    <button
                      type="button"
                      onClick={() => {
                        //
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
