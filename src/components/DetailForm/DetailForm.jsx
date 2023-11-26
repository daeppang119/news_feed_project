import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as St from "../../StyledComponents/modules/AddFormStyle/AddFormStyle";
import { auth, db } from "../../firebase/firebase";
import { editPost, removePost } from "../../redux/modules/post";
import { getFormattedDate } from "../../util/date";
export default function DetailForm({ DetailisOpen, setDetailIsopen, findTarget }) {
  const [isEditing, setIsEditing] = useState(false);
  const [fireStoreRemoveDate, setFireStoreRemoveDate] = useState();
  const [fireStoreUpdateData, setFireStoreUpdateDate] = useState();

  const user = useSelector((state) => state.user);
  const post = useSelector((state) => state.post);
  const textRef = useRef();

  const dispatch = useDispatch();

  const [editingText, setEditingText] = useState();

  //클릭하면 업뎃 으로 바꾸기
  const handleEdit = (id) => () => {
    const findTargetIndex = post.findIndex((target) => target.id === id);
    post[findTargetIndex].isEdit = true;
    dispatch(editPost([...post]));
  };
  // 클릭하면 업뎃 또는 return으로 함수 종료
  const handleUpdate = (prev) => (id) => {
    if (prev === textRef.current.value) return alert("수정해주세요");
    const findTargetIndex = post.findIndex((target) => target.id === findTarget);
    const updatedPost = [...post];

    updatedPost[findTargetIndex] = {
      ...updatedPost[findTargetIndex],
      contents: textRef.current,
      isEdit: false
    };

    setFireStoreUpdateDate({ ...updatedPost[findTargetIndex] });
    dispatch(editPost(updatedPost));
  };
  // 화면 먼저 그려주고 useEffect안에서 데이터 몰래 update하기;
  const updateFireStoreData = useCallback(async () => {
    const userDataRef = doc(db, `users`, fireStoreUpdateData.id);
    try {
      await updateDoc(userDataRef, fireStoreUpdateData).then(() => console.log("update완료"));
    } catch (e) {
      console.log(e);
    }
  }, [fireStoreUpdateData]);
  useEffect(() => {
    if (!fireStoreUpdateData) return;
    else {
      updateFireStoreData();
      return;
    }
  }, [fireStoreUpdateData, updateFireStoreData]);

  const onClickDeleteData = (id) => {
    setFireStoreRemoveDate(id);
    const newPosts = post.filter((target) => target.id !== id);
    dispatch(removePost(newPosts));
  };
  const deleteFireStoreData = useCallback(async () => {
    console.log(fireStoreRemoveDate);
    const removeDataRef = doc(db, "users", fireStoreRemoveDate);
    try {
      await deleteDoc(removeDataRef).then(() => console.log("삭제완료"));
    } catch (e) {
      console.log(e);
    }
  }, [fireStoreRemoveDate]);
  useEffect(() => {
    if (!fireStoreRemoveDate) return;
    else {
      deleteFireStoreData();
    }
  }, [deleteFireStoreData, fireStoreRemoveDate]);

  // 로그인 후
  if (user.currentUser) {
    return (
      <>
        {DetailisOpen
          ? post
              .filter((item) => item.id === findTarget)
              .map((item) => (
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
                    <St.Container onSubmit={(e) => e.preventDefault()}>
                      <St.Warpper>
                        <St.DetailUserInfo>
                          <St.AvatarFigure>
                            <img
                              src={auth.photoURL || process.env.PUBLIC_URL + "/DefaultProfile/defaultprofile.jpg"}
                              alt=""
                            />
                          </St.AvatarFigure>
                          <St.NickNameAndEmail>
                            {post
                              .filter((item) => item.id === findTarget)
                              .map((item) => {
                                return (
                                  <>
                                    <St.NickName key={item}>{item.userName}</St.NickName>
                                    <St.Email>{item.email}</St.Email>
                                  </>
                                );
                              })}
                          </St.NickNameAndEmail>
                        </St.DetailUserInfo>
                        <St.TitleAndDate>
                          <St.Title>{item.text}</St.Title>
                          <St.AddDate>{getFormattedDate(item.date)}</St.AddDate>
                        </St.TitleAndDate>
                        {item.imgurl ? (
                          <St.DetailImgFigure>
                            <SlideModal imgurl={item.imgurl} />
                          </St.DetailImgFigure>
                        ) : (
                          <St.DetailImgFigure style={{ display: "none" }}>
                            <SlideModal imgurl={item.imgurl} />
                          </St.DetailImgFigure>
                        )}
                        {isEditing ? (
                          <St.Content
                            defaultValue={item.contents}
                            onChange={(e) => {
                              textRef.current = e.target.value;
                              setEditingText(e.target.value);
                            }}
                          />
                        ) : (
                          <St.DetailContent>{item.contents}</St.DetailContent>
                        )}

                        {/* 로그인 후 내 게시물 볼 때 */}
                        {auth.currentUser.uid === item.uid ? (
                          <>
                            {isEditing ? (
                              <St.Buttons>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const answer = window.confirm("이대로 수정하시겠습니까?");
                                    if (!answer) return;
                                    handleUpdate(textRef.current)(item.id);
                                    setIsEditing(false);
                                  }}
                                >
                                  수정 완료
                                </button>
                                <button type="button" onClick={() => setIsEditing(false)}>
                                  취소
                                </button>
                              </St.Buttons>
                            ) : (
                              <St.Buttons>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIsEditing(true);
                                    handleEdit(findTarget);
                                  }}
                                >
                                  수정
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const answer = window.confirm("정말로 삭제하시겠습니까?");
                                    if (!answer) return;
                                    onClickDeleteData(findTarget);
                                  }}
                                >
                                  삭제
                                </button>
                                <button type="button" onClick={() => setDetailIsopen(false)}>
                                  홈으로
                                </button>
                              </St.Buttons>
                            )}
                          </>
                        ) : (
                          <St.Buttons>
                            <button type="button" onClick={() => setDetailIsopen(false)}>
                              홈으로
                            </button>
                          </St.Buttons>
                        )}
                      </St.Warpper>
                    </St.Container>
                  </St.Main>
                </div>
              ))
          : null}
      </>
    );
    // 로그인 전
  } else if (!user.currentUser) {
    return (
      <>
        {DetailisOpen
          ? post
              .filter((item) => item.id === findTarget)
              .map((item) => (
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
                    <St.Container onSubmit={(e) => e.preventDefault()}>
                      <St.Warpper>
                        <St.DetailUserInfo>
                          <St.AvatarFigure>
                            <img
                              src={auth.photoURL || process.env.PUBLIC_URL + "/DefaultProfile/defaultprofile.jpg"}
                              alt=""
                            />
                          </St.AvatarFigure>
                          <St.NickNameAndEmail>
                            <St.NickName>{user.userName}</St.NickName>
                            <St.Email>{user.email}</St.Email>
                          </St.NickNameAndEmail>
                        </St.DetailUserInfo>
                        <St.TitleAndDate>
                          <St.Title>{item.text}</St.Title>
                          <St.AddDate>{getFormattedDate(item.date)}</St.AddDate>
                        </St.TitleAndDate>
                        {item.imgurl ? (
                          <St.DetailImgFigure>
                            <SlideModal imgurl={item.imgurl} />
                          </St.DetailImgFigure>
                        ) : (
                          <St.DetailImgFigure style={{ display: "none" }}>
                            <SlideModal imgurl={item.imgurl} />
                          </St.DetailImgFigure>
                        )}

                        <St.DetailContent>{item.contents}</St.DetailContent>
                        <St.Buttons>
                          <button type="button" onClick={() => setDetailIsopen(false)}>
                            홈으로
                          </button>
                        </St.Buttons>
                      </St.Warpper>
                    </St.Container>
                  </St.Main>
                </div>
              ))
          : null}
      </>
    );
  }
}
function SlideModal({ imgurl }) {
  console.log(imgurl);
  const [imageIndex, setImageIndex] = useState(0);
  const showNextImage = () => {
    setImageIndex((idx) => {
      if (idx === imgurl.length - 1) return 0;
      return idx + 1;
    });
  };
  const showPrevImage = () => {
    setImageIndex((idx) => {
      if (idx === 0) return imgurl.length - 1;
      return idx - 1;
    });
  };

  return (
    <SliderContainer>
      <div>
        <div className="slide-wrapper">
          {imgurl.map((url) => (
            <img key={url} src={url} alt="" style={{ translate: `${-100 * imageIndex}%` }} />
          ))}

          <div className="button-group">
            <button
              className="right-button"
              style={{ right: "0", display: `${imageIndex === imgurl.length - 1 ? "none" : "block"}` }}
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
  height: 100%;
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
    padding: 8px;
    cursor: pointer;
    transition: background-color 100ms ease-in-out;
    &:hover,
    &:focus-visible {
      background-color: rgba(0, 0, 0, 0.1);
    }
    svg {
      stroke: white;
      fill: #000;
      width: 16px;
      height: 8px;
    }
  }
`;
