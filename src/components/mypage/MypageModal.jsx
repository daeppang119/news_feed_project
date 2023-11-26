import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { React, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import styled from "styled-components";
import * as St from "../../StyledComponents/modules/PersonalPage/Modal.js";
import { auth, storage } from "../../firebase/firebase";
import { updateUserInfoSetState } from "../../redux/modules/user.js";

function Modal({ modalOpen, setModalOpen }) {
  // modal handler
  const ModalHandler = () => {
    setModalOpen(!modalOpen);
  };
  const user = useSelector((state) => state.user);

  // form state start
  const [name, setName] = useState(user.userName);
  const [email, setEmail] = useState(user.email);
  const [intro, setIntro] = useState(user.intro);

  // edit
  //
  const dispatch = useDispatch();
  const inputRef = useRef({});

  // 미리보기 사진과 서버에 올릴 사진 state입니다.
  const [previewImage, setPreviewImage] = useState(user.photoURL);
  const [serverImage, setServerImage] = useState("");

  //  클릭하면, 이미지 업로드 시작합니다.
  const [isUploadProfileState, setIsUploadProfileState] = useState(false);

  // 파이어베이스 이동경로 설정해주고 삭제 업뎃 할 때 사용하려고 uuid를 만들어 주었습니다.
  const profilePhotoKey = uuid();

  // profile업로드 할 때 사진안바꿔주면 - 디폴트 처리 하려고 defaultImg로 처리합니다.
  const defaultImg = process.env.PUBLIC_URL + "img/avatar.jpg";

  // 업로드 진행률 보여주는 state입니다.
  const [progressBar, setProgressBar] = useState(0);

  // 로직은 handleAddPost를 클릭하면, useEffect안에 있는 함수가 실행하여 upload를 합니다.
  // upload를 하는 조건은 이미지 || text가 있어야 합니다. 둘다 있어도 됩니다.

  // 클릭하면 file 열기
  const handleImgClick = useCallback((e) => {
    e.stopPropagation();
    inputRef.current.img.click();
  }, []);

  // 이미지 미리보기 함수
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewImageUrl = URL.createObjectURL(file);
      setPreviewImage(previewImageUrl);
      setServerImage(file);
    }
  };

  // handleAddPost를 클릭하면 setIsUpload의 값이 변경되어 리렌더링 되면서 useEffect안에있는 upload함수가 실행됩니다.
  const handleAddPost = () => {
    if (user.currentUser === false) return alert("로그인부터");
    // 현재 글과 이전글이 같고, 이미지가 없으면 return 으로 46번라인 코드 바꿔야함
    if (!serverImage) return;
    setIsUploadProfileState(true);
    window.confirm("저장하시겠어요?");
  };

  // firebase와 통신하는 함수
  const upDateFireBase = async () => {
    try {
      await upDateProfileonFireBase().then((profileUrl) =>
        dispatch(
          updateUserInfoSetState({
            photoUrl: profileUrl || process.env.PUBLIC_URL + "img/avatar.jpg",
            intro: inputRef.current.text.value,
            userName: inputRef.current.name.value,
            profilePhotoKey
          })
        )
      );
      // upload끝나면 false 해서 useEffect안 firebase통신 함수 진행 불가 시켜주기 + upload끝나면 ui 감춰주라는 state입니다.
      setIsUploadProfileState(false);

      // upload끝나면 다시 progress 진행률 0으로 rest 하는 state입니다.
      setProgressBar(0);
      alert("완료되었습니다");
      setModalOpen(!modalOpen);
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
            userName: inputRef.current.name.value,
            photoURL
          });
          PhotoURL = photoURL;
        })
        .then(() => console.log("updateProfile성공"));
      return PhotoURL;
    } catch (e) {
      throw new Error(e);
      console.log(auth);
    }
  };

  // state변경이 되면 재렌더링 후 파이어베이스에 저장해주는 로직입니다.
  useEffect(() => {
    if (isUploadProfileState) {
      upDateFireBase();
    }
  }, [isUploadProfileState]);

  return (
    <St.ModalBox>
      <St.ModalContent>
        <St.ModalHeader>
          <St.CloseWrap>
            <St.CloseBtn src={process.env.PUBLIC_URL + "/personalpageIMG/close.png"} onClick={ModalHandler} />
          </St.CloseWrap>
          <St.HeaderText>프로필설정</St.HeaderText>
        </St.ModalHeader>
        <St.ModalDiv>계정</St.ModalDiv>
        <St.ModalAvatarWrap>
          <St.MAvatar src={user.photoUrl} onClick={handleImgClick} />
          <St.PreviewAvatar src={previewImage} alt="" />
          <input
            type="file"
            ref={(props) => (inputRef.current["img"] = props)}
            style={{ display: "none" }}
            onChange={handleImgChange}
            id="upload"
          />
          <label style={{ marginLeft: "15px", cursor: "pointer", fontSize: "13px" }} for="upload">
            이미지변경
          </label>
        </St.ModalAvatarWrap>

        <St.Form>
          <St.MEdit>
            <St.Fix>
              닉네임<span style={{ color: "#ff5c00" }}>*</span>
            </St.Fix>
            <St.EditContent
              type="text"
              ref={(props) => (inputRef.current["name"] = props)}
              onChange={(event) => {
                setName(event.target.value);
              }}
              defaultValue={name}
              maxLength={10}
              placeholder="최대 10글자"
            />
          </St.MEdit>
          <St.MEdit>
            <St.Fix>이메일</St.Fix>
            <St.EditContentfix
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              defaultValue={email}
              placeholder="올바른 형식을 갖춰주세요"
            />
          </St.MEdit>
          <St.MEdit>
            <St.Fix>
              소개글<span style={{ color: "#ff5c00" }}>*</span>
            </St.Fix>
            <St.EditContent
              type="text"
              ref={(props) => (inputRef.current["text"] = props)}
              onChange={(event) => {
                setIntro(event.target.value);
              }}
              defaultValue={intro}
              maxLength={100}
              placeholder="최대 100글자"
            />
          </St.MEdit>
          <St.SaveButtonWrap>
            {isUploadProfileState && (
              <StProgressUploadContainer>
                <span>진행률 {progressBar}%</span>
                <StProgressUploadSpan $progress={progressBar} />
              </StProgressUploadContainer>
            )}
            <St.SaveButton onClick={handleAddPost} src={process.env.PUBLIC_URL + "/personalpageIMG/stamp.png"} />
          </St.SaveButtonWrap>
        </St.Form>
      </St.ModalContent>
    </St.ModalBox>
  );
}
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

export default Modal;
