import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import styled from "styled-components";
import { auth, storage } from "../../firebase/firebase";
import { updateUserInfoSetState } from "../../redux/modules/user";
function SampleImageUpload() {
  const [previewImage, setPreviewImage] = useState("");
  const [serverImage, setServerImage] = useState("");
  const [isUploadProfile, setIsUploadProfile] = useState(false);
  const profilePhotoKey = uuid();

  const defaultImg = process.env.PUBLIC_URL + "img/avatar.jpg";
  const user = useSelector((state) => state.user);
  const inputRef = useRef({});
  const [progressBar, setProgressBar] = useState(0);
  const dispatch = useDispatch();

  // 로직은 handleAddPost를 클릭하면, useEffect안에 있는 함수가 실행하여 upload를 합니다.
  // upload를 하는 조건은 이미지 || text가 있어야 합니다. 둘다 있어도 됩니다.

  // 클릭하면 file 열기
  const handleImgClick = useCallback((e) => {
    e.stopPropagation();
    inputRef.current.img.click();
  }, []);

  // 이미지 미리보기
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewImageUrl = URL.createObjectURL(file);
      setPreviewImage(previewImageUrl);
      setServerImage(file);
    }
  };

  // 이미지 미리보기 취소 =  default 이미지 보이기
  const handleCancelPreviewImg = () => {
    setPreviewImage(defaultImg);
  };
  // handleAddPost를 클릭하면 setIsUpload의 값이 변경되어 리렌더링 되면서 useEffect안에있는 upload함수가 실행됩니다.
  const handleAddPost = () => {
    if (user.currentUser === false) return alert("로그인부터");
    // 현재 글과 이전글이 같고, 이미지가 없으면 return 으로 46번라인 코드 바꿔야함
    if (!serverImage) return;
    setIsUploadProfile(true);
  };

  // firebase와 통신하는 함수
  const upDateFireBase = async () => {
    try {
      await upDateProfileonFireBase().then((profileUrl) =>
        dispatch(
          updateUserInfoSetState({
            photoUrl: profileUrl || process.env.PUBLIC_URL + "img/avatar.jpg",
            intro: inputRef.current.text.value,
            profilePhotoKey
          })
        )
      );
      // upload끝나면 false 해서 useEffect안 firebase통신 함수 진행 불가 시켜주기 + upload끝나면 ui 감춰줘 state
      setIsUploadProfile(false);

      // upload끝나면 다시 rest
      setProgressBar(0);
    } catch (e) {
      alert(e);
    }
  };
  const upDateProfileonFireBase = async () => {
    let PhotoURL;
    try {
      await new Promise((resolve, reject) => {
        const metaData = {
          contentType: serverImage.type
        };
        const imgRef = ref(storage, `profileImage/${user.email}/${profilePhotoKey}`);
        const uploadTask = uploadBytesResumable(imgRef, serverImage, metaData);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progressBar = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progressBar}% done`);
            setProgressBar(progressBar);
          },
          (error) => {
            const problem = JSON.stringify(error);
            throw new Error(problem);
          },
          (a) => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              resolve(url);
            });
          }
        );
      })
        .then(async (photoURL) => {
          await updateProfile(auth.currentUser, {
            displayName: inputRef.current.name.value,
            photoURL
          });
          PhotoURL = photoURL;
        })
        .then(() => console.log("updateProfile성공"));
      return PhotoURL;
    } catch (e) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    if (isUploadProfile) {
      upDateFireBase();
    }
  }, [isUploadProfile]);
  console.log(isUploadProfile);
  return (
    <StDiv>
      <div style={{ cursor: "pointer" }} onClick={handleImgClick}>
        <img src={previewImage || defaultImg} alt="" />
        <input
          type="file"
          ref={(props) => (inputRef.current["img"] = props)}
          style={{ display: "none" }}
          onChange={handleImgChange}
        />
      </div>
      <div>
        내용 : <input type="text" ref={(props) => (inputRef.current["text"] = props)} />
        닉네임 : <input type="text" ref={(props) => (inputRef.current["name"] = props)} />
      </div>
      <StBtnGroup>
        <button onClick={handleAddPost}>저장</button>
        <button onClick={handleCancelPreviewImg}>이미지 취소</button>
      </StBtnGroup>

      {isUploadProfile && (
        <StProgressUploadContainer>
          <span>진행률 {progressBar}%</span>
          <StProgressUploadSpan $progress={progressBar} />
        </StProgressUploadContainer>
      )}
    </StDiv>
  );
}

export default SampleImageUpload;
const StProgressUploadContainer = styled.div``;
const StProgressUploadSpan = styled.span`
  display: block;
  height: 3px;

  width: ${(props) => props.$progress}%;
  background-color: #042104;
`;
const StDiv = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  div {
    width: 360px;
    padding: 20px;
  }
`;

const StBtnGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  button {
    width: 120px;
    height: 30px;
    text-align: center;
    border: 1px solid black;
    &:hover {
      background-color: #333;
      color: #fff;
    }
  }
`;
