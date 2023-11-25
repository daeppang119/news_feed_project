import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
                    <St.Container>
                      <St.Warpper onSubmit={(e) => e.preventDefault()}>
                        <St.DetailUserInfo>
                          <St.AvatarFigure>
                            <img src={user.photoUrl} alt="" />
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
                            <img src={item.imgurl} alt="" />
                          </St.DetailImgFigure>
                        ) : (
                          <St.DetailImgFigure style={{ display: "none" }}>
                            <img src={item.imgurl} alt="" />
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
                    <St.Container>
                      <St.Warpper onSubmit={(e) => e.preventDefault()}>
                        <St.DetailUserInfo>
                          <St.AvatarFigure>
                            <img src={user.photoUrl} alt="" />
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
                            <img src={item.imgurl} alt="" />
                          </St.DetailImgFigure>
                        ) : (
                          <St.DetailImgFigure style={{ display: "none" }}>
                            <img src={item.imgurl} alt="" />
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
