import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import styled from "styled-components";
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
      user: user.userName,
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
    console.log(uploadImages);
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
                    {showImages.length ? <SlideModal showImages={showImages} setShowImages={setShowImages} /> : null}
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
function SlideModal({ showImages, setShowImages, setUploadImages, uploadImages }) {
  const [imageIndex, setImageIndex] = useState(0);
  const showNextImage = () => {
    setImageIndex((idx) => {
      if (idx === showImages.length - 1) return 0;
      return idx + 1;
    });
  };
  const showPrevImage = () => {
    setImageIndex((idx) => {
      if (idx === 0) return showImages.length - 1;
      return idx - 1;
    });
  };
  const handleDeleteImage = (id) => () => {
    const editImages = showImages.filter((_, idx) => idx !== id);
    setShowImages(editImages);
  };
  return (
    <SliderContainer>
      <div>
        <div className="slide-wrapper">
          {showImages.map((url, id) => {
            return (
              <div style={{ flexShrink: "0" }}>
                <img key={url} src={url} alt="" style={{ translate: `${-100 * imageIndex}%` }} />;
                <DeleteImage onClick={handleDeleteImage(id)}>x</DeleteImage>
              </div>
            );
          })}

          <div className="button-group">
            <button
              className="right-button"
              style={{ right: "0", display: `${imageIndex === showImages.length - 1 ? "none" : "block"}` }}
              onClick={showNextImage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
            </button>
            <button
              className="left-button"
              style={{ left: "0", display: `${imageIndex === 0 ? "none" : "block"}` }}
              onClick={showPrevImage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </SliderContainer>
  );
}
const SliderContainer = styled.div`
  width: 100%;
  max-width: 320px;
  height: 60px;
  &:hover {
    .button-group button {
      opacity: 1;
      visibility: 1;
    }
  }
  position: relative;
  > div {
    width: 100%;
    height: 100%;
  }
  .slide-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
  }

  img {
    display: block;
    aspect-ratio: 4/3;
    width: 100%;
    object-fit: cover;
    flex-shrink: 0;
    flex-grow: 0;
    transition: translate 300ms ease-in-out;
  }

  .button-group button {
    display: block;
    position: absolute;
    opacity: 0;
    visibility: 0;
    top: 0;
    bottom: 0;
    padding: 16px;
    cursor: pointer;
    transition: background-color 100ms ease-in-out;
    &:hover,
    &:focus-visible {
      background-color: rgba(0, 0, 0, 0.1);
    }
    svg {
      stroke: white;
      fill: #000;
      width: 32px;
      height: 32px;
    }
  }
`;
export const DeleteImage = styled.button`
  position: absolute;
  left: 50%;
  top: -40px;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  font-size: 20px;
  line-height: 2;
  text-align: center;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: transparent;
    color: #333;
  }
`;

const Div = styled.div`
  display: grid;
  place-content: center center;
  font-size: 30px;
  height: 100vh;
`;
