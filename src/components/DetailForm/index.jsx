import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as St from "../../StyledComponents/modules/AddFormStyle/AddFormStyle";
import { auth } from "../../firebase/firebase";

export default function DetailForm({ DetailisOpen, setDetailIsopen, contents }) {
  const [isEditing, setIsEditing] = useState(false);

  const user = useSelector((state) => state.user);
  const foundData = user.post[0];
  const [editingText, setEditingText] = useState(foundData.contents);

  if (auth.currentUser) {
    return (
      <>
        {DetailisOpen ? (
          <St.Main>
            <St.Container>
              <St.Warpper onSubmit={(e) => e.preventDefault()}>
                <St.DetailUserInfo>
                  <St.AvatarFigure>
                    <img src={process.env.PUBLIC_URL + "/categoryimg/usericon.png"} />
                  </St.AvatarFigure>
                  <St.NickNameAndEmail>
                    <St.NickName>{auth.currentUser.displayName}</St.NickName>
                    <St.Email>{auth.currentUser.email}</St.Email>
                  </St.NickNameAndEmail>
                </St.DetailUserInfo>
                <St.TitleAndDate>
                  <St.Title>{foundData.text}</St.Title>
                  <St.AddDate>{foundData.Date}</St.AddDate>
                </St.TitleAndDate>
                {isEditing ? (
                  <St.Content
                    defaultValue={foundData.contents}
                    value={editingText}
                    onChange={(e) => {
                      setEditingText(e.target.value);
                    }}
                  />
                ) : (
                  <St.DetailContent>{foundData.contents}</St.DetailContent>
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
                    <button type="button">삭제</button>
                    <button type="button" onClick={() => setDetailIsopen(false)}>
                      홈으로
                    </button>
                  </St.Buttons>
                )}
              </St.Warpper>
            </St.Container>
          </St.Main>
        ) : null}
      </>
    );
  } else if (!auth.currentUser) {
    return (
      <>
        {DetailisOpen ? (
          <St.Main>
            <St.Container>
              <St.Warpper onSubmit={(e) => e.preventDefault()}>
                <St.DetailUserInfo>
                  <St.AvatarFigure>
                    <img src={process.env.PUBLIC_URL + "/categoryimg/usericon.png"} />
                  </St.AvatarFigure>
                  <St.NickNameAndEmail>
                    <St.NickName>닉네임</St.NickName>
                    <St.Email>test01@gamil.com</St.Email>
                  </St.NickNameAndEmail>
                </St.DetailUserInfo>
                <St.TitleAndDate>
                  <St.Title>제목</St.Title>
                  <St.AddDate>23. 11. 22 PM 08:50</St.AddDate>
                </St.TitleAndDate>
                <St.DetailContent>{contents}</St.DetailContent>
                <St.Buttons>
                  <button type="button" onClick={() => setDetailIsopen(false)}>
                    홈으로
                  </button>
                </St.Buttons>
              </St.Warpper>
            </St.Container>
          </St.Main>
        ) : null}
      </>
    );
  }
}
