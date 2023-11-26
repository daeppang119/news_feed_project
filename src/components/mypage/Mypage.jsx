import { getDownloadURL, uploadBytes } from "@firebase/storage";
import { ref } from "firebase/storage";
import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as St from "../../StyledComponents/modules/PersonalPage/PersonlPage.js";
import { auth, storage } from "../../firebase/firebase.js";
import { updateUserInfoSetState } from "../../redux/modules/user.js";
import Modal from "./MypageModal.jsx";
function Mypage() {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const ModalHandler = () => {
    setModalOpen(!modalOpen);
  };
  const user = useSelector((state) => state.user);
  const post = useSelector((state) => state.post);

  const [haveImg, setHaveImg] = useState(false);

  //로그인 여부
  const [loginOk, setloginOk] = useState(user.currentUser);

  //이미지 state
  const [image, setImage] = useState(null);

  const handleFileSelect = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    const imageRef = ref(storage, `Users/${auth.currentUser.email}/${image.name}`);
    await uploadBytes(imageRef, image);
    const downloadURL = await getDownloadURL(imageRef);
    dispatch(
      updateUserInfoSetState({
        photoUrl: downloadURL
      })
    );
  };

  return (
    <>
      {loginOk === false ? (
        <h1>ㅎㅇ</h1>
      ) : (
        <St.Container>
          <St.ProfileWrap>
            <St.ProfileBox>
              <St.HeadBox style={{ display: "flex" }}>
                <St.HeadText>내 프로필</St.HeadText>
                <St.Edit src={process.env.PUBLIC_URL + "/personalpageIMG/pencil2.png"} onClick={ModalHandler} />
              </St.HeadBox>
              {/* 사진 + 변경 */}
              <St.AvatarWrap>
                <St.Avatar src={user.photoUrl} />
                <St.ImageLabel for="file">이미지변경</St.ImageLabel>
                <St.ChangeImg id="file" type="file" onChange={handleFileSelect} />
                <button style={{ cursor: "pointer" }} onClick={handleUpload}>
                  upload
                </button>
              </St.AvatarWrap>
              {/* 닉네임, 이메일 */}
              <St.ProfileInfo>
                <St.Section>
                  <St.Span>닉네임</St.Span>
                  <St.Span>{user.userName}</St.Span>
                </St.Section>
                <St.Section>
                  <St.Span>이메일</St.Span>
                  <St.Span>{user.email}</St.Span>
                </St.Section>
                <St.Section style={{ marginTop: "20px" }} height={"70px"}>
                  <St.Span>{user.intro}</St.Span>
                </St.Section>
              </St.ProfileInfo>

              {/* 로그아웃, 홈 */}
              <St.DirectSection>
                <St.Direct>로그아웃</St.Direct>
                <span>|</span>
                <Link to={"/"}>
                  <St.Direct>홈으로</St.Direct>
                </Link>
              </St.DirectSection>
            </St.ProfileBox>
          </St.ProfileWrap>

          <St.FeedsBox>
            <St.LabelWrap>
              <St.FeedLabel>내 게시글</St.FeedLabel>
            </St.LabelWrap>
            <St.FeedsWrap>
              {post
                .filter((obj) => obj.uid === user.uid)
                .map((ea) => {
                  return (
                    <>
                      <St.Feed key={ea.id}>
                        {ea.imgurl.length <= 0 ? (
                          `${process.env.PUBLIC_URL + "/headerimg/logo.png"}`
                        ) : (
                          <St.MyNews src={ea.imgurl} />
                        )}
                        <St.TextWrap>
                          <St.MyText size={"20px"} color={"black"} weight={"700"}>
                            닉네임 {user.userName}
                          </St.MyText>
                          내용{" "}
                          <St.MyText size={"15px"} color={"white"}>
                            {ea.text}
                          </St.MyText>
                        </St.TextWrap>
                      </St.Feed>
                    </>
                  );
                })}
            </St.FeedsWrap>
          </St.FeedsBox>
          {/* 모달창 */}
          {modalOpen === false ? "" : <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} image={image} />}
        </St.Container>
      )}
    </>
  );
}

export default Mypage;
