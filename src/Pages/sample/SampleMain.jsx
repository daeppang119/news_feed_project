import { addDoc, collection, getDocs, orderBy, query } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { auth, db, storage } from "../../firebase/firebase";
import { updatePost } from "../../redux/modules/post";
import { updateUserInfoSetState } from "../../redux/modules/user";
import SamplePersonal from "./SamplePersonal";

function SampleMain() {
  const inputRef = useRef({});
  const user = useSelector((state) => state.user);
  const userDataRef = collection(db, "users");
  const dispatch = useDispatch();

  // 이미지 파일 업로드 후 이미지 url과 같이 post를 추가하는 함수 입니다.
  const handleAddPost = async () => {
    if (!user.currentUser) return alert("로그인 부터 하자");
    const text = inputRef.current.text.value;
    const photoUrl = await handleImageUpload();
    if (!user["post"]) user["post"] = [];
    const newPost = {
      text,
      imgurl: photoUrl || "",
      uid: auth.currentUser.uid || "",
      isEdit: false,
      date: Date.now()
    };
    user["post"].unshift(newPost);
    console.log(user);
    dispatch(updateUserInfoSetState({ ...user }));

    // 여기서 부턴 firebase에 추가 후 다시 불러들여 post에 'id'를 부여 하기 위해 다시 추가 하는 로직입니다.
    await addDoc(userDataRef, newPost);
    const q = query(userDataRef, orderBy("date", "asc"));

    const querySnapshot = await getDocs(q);
    const dataSet = new Set();
    querySnapshot.forEach((doc) => {
      dataSet.add({ id: doc.id, ...doc.data() });
    });
    const newPostState = [...dataSet];

    dispatch(updatePost(newPostState));
  };

  // 이미지 업로드 함수 입니다.
  const handleImageUpload = async () => {
    const imgFile = inputRef.current.img.files[0];
    try {
      if (!imgFile) return;
      const imgRef = ref(storage, `Users/${auth.currentUser.uid}/${imgFile.name}`);
      await uploadBytes(imgRef, imgFile).then((snapshot) => {
        console.log(snapshot.bytesTransferred);
      });
      const downloadUrl = await getDownloadURL(imgRef);
      return downloadUrl;
    } catch (e) {
      alert("img:", e);
    }
  };

  return (
    <>
      <Div>
        <div>
          <div>
            <img src="img/avatar.jpg" alt="" />
          </div>
          이미지 : <input type="file" ref={(props) => (inputRef.current["img"] = props)} />
        </div>
        <div>
          내용 : <input type="text" ref={(props) => (inputRef.current["text"] = props)} />
        </div>
        <Button onClick={handleAddPost}>등록하기</Button>
      </Div>
      <SamplePersonal />
    </>
  );
}

export default SampleMain;

const Div = styled.div`
  display: grid;
  place-content: center center;
  gap: 20px;
  height: 500px;
  font-size: 24px;
`;

const Button = styled.button`
  border: 1px solid black;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #333;
    color: #fff;
  }
`;
