import React from "react";
import * as St from "../../StyledComponents/modules/AddFormStyle/AddFormStyle";

export default function DetailForm({ DetailisOpen, setDetailIsopen, users }) {
  return (
    <>
      {DetailisOpen ? (
        <St.Main>
          <St.Container>
            <St.Warpper>
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
              <St.DetailContent>내용</St.DetailContent>

              {users ? (
                <St.Buttons>
                  <button>수정</button>
                  <button>삭제</button>
                  <button onClick={() => setDetailIsopen(false)}>홈으로</button>
                </St.Buttons>
              ) : (
                <St.Buttons>
                  <button onClick={() => setDetailIsopen(false)}>홈으로</button>
                </St.Buttons>
              )}
            </St.Warpper>
          </St.Container>
        </St.Main>
      ) : null}
    </>
  );
}
