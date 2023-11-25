import { deleteDoc, doc } from "@firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as St from "../../StyledComponents/modules/AddFormStyle/AddFormStyle";
import { db } from "../../firebase/firebase";

export default function DetailForm({ DetailisOpen, setDetailIsopen, findTarget }) {
  const [isEditing, setIsEditing] = useState(false);

  const user = useSelector((state) => state.user);
  const post = useSelector((state) => state.post);
  const item = post;
  const [editingText, setEditingText] = useState(item.contents);
  console.log("Detail", user);
  const onClickDeleteData = async () => {
    alert("삭제하시겠습니까?");
    const postRef = doc(db, "users", post.id);
    await deleteDoc(postRef);
  };

  if (user.currentUser) {
    return (
      <>
        {DetailisOpen
          ? post
              .filter((item) => item.id === findTarget)
              .map((item) => (
                <St.Main>
                  <St.Container>
                    <St.Warpper onSubmit={(e) => e.preventDefault()}>
                      <St.DetailUserInfo>
                        <St.AvatarFigure>
                          <img src={process.env.PUBLIC_URL + "/categoryimg/usericon.png"} alt="" />
                        </St.AvatarFigure>
                        <St.NickNameAndEmail>
                          <St.NickName>{user.userName}</St.NickName>
                          <St.Email>{user.email}</St.Email>
                        </St.NickNameAndEmail>
                      </St.DetailUserInfo>
                      <St.TitleAndDate>
                        <St.Title>{item.text}</St.Title>
                        <St.AddDate>{item.Date}</St.AddDate>
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
                          value={editingText}
                          onChange={(e) => {
                            setEditingText(e.target.value);
                          }}
                        />
                      ) : (
                        <St.DetailContent>{item.contents}</St.DetailContent>
                      )}

                      {isEditing ? (
                        <St.Buttons>
                          <button type="button">수정 완료</button>
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
                            }}
                          >
                            수정
                          </button>
                          <button type="button" onClick={() => onClickDeleteData(item.id)}>
                            삭제
                          </button>
                          <button type="button" onClick={() => setDetailIsopen(false)}>
                            홈으로
                          </button>
                        </St.Buttons>
                      )}
                    </St.Warpper>
                  </St.Container>
                </St.Main>
              ))
          : null}
      </>
    );
  } else if (!user.currentUser) {
    return (
      <>
        {DetailisOpen
          ? post
              .filter((item) => item.id === findTarget)
              .map((item) => (
                <St.Main>
                  <St.Container>
                    <St.Warpper onSubmit={(e) => e.preventDefault()}>
                      <St.DetailUserInfo>
                        <St.AvatarFigure>
                          <img src={process.env.PUBLIC_URL + "/categoryimg/usericon.png"} alt="" />
                        </St.AvatarFigure>
                        <St.NickNameAndEmail>
                          <St.NickName>{user.userName}</St.NickName>
                          <St.Email>{user.email}</St.Email>
                        </St.NickNameAndEmail>
                      </St.DetailUserInfo>
                      <St.TitleAndDate>
                        <St.Title>{item.text}</St.Title>
                        <St.AddDate>{item.Date}</St.AddDate>
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
              ))
          : null}
      </>
    );
  }
}
