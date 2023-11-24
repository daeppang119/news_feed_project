import { React, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as St from "../StyledComponents/modules/PersonalPage/PersonlPage.js";

import Modal from "./Modal.jsx";

function Mypage() {
  const [modalOpen, setModalOpen] = useState(false);
  const ModalHandler = () => {
    setModalOpen(!modalOpen);
  };
  const user = useSelector((state) => state.user);
  const post = useSelector((state) => state.post);
  console.log(post);
  //마이페이지 포스트 초기값배열
  console.log(user);
  //마이페이지 로그인 여부
  const [loginOk, setloginOk] = useState(user.currentUser);

  //이미지 state
  const [image, setImage] = useState("");

  const setPreviewImg = (event) => {
    var reader = new FileReader();

    reader.onload = function (event) {
      setImage(event.target.result);
    };

    reader.readAsDataURL(event.target.files[0]);
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
                <St.Avatar src={image} />
                <St.ImageLabel for="file">이미지변경</St.ImageLabel>
                <St.ChangeImg id="file" type="file" onChange={setPreviewImg} />
              </St.AvatarWrap>
              {/* 닉네임, 이메일 */}
              <St.ProfileInfo>
                <St.Section>
                  <St.Span>이름</St.Span>
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
                <Link to={"/"}>
                  <St.Direct>로그아웃</St.Direct>
                </Link>
                <span>|</span>
                <Link to={"/sampleMain"}>
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
                        <img src={ea.imgurl} />
                        <p>{ea.text}</p>
                        <p>{ea.date}</p>
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
