import React, { useState } from "react";
import * as St from "../../StyledComponents/modules/AddFormStyle/AddFormStyle";

export default function AddForm({ isOpen, setIsopen }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <>
      {isOpen ? (
        <St.Main>
          <St.Container
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <St.Warpper>
              <St.UserInfo>
                <St.AvatarFigure>
                  <img src={process.env.PUBLIC_URL + "/categoryimg/usericon.png"} />
                </St.AvatarFigure>
                <St.NickNameAndEmail>
                  <St.NickName>닉네임</St.NickName>
                  <St.Email>test01@gamil.com</St.Email>
                </St.NickNameAndEmail>
              </St.UserInfo>
              <St.TitleAndDate>
                <St.Title>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="주제를 정해주세요"
                  />
                </St.Title>
              </St.TitleAndDate>
              <St.Content
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 입력해주세요"
              ></St.Content>
              <St.Selecter>
                <St.Lable>취미</St.Lable>
                <St.Select>
                  <option>애니메이션</option>
                  <option>게임</option>
                  <option>운동</option>
                  <option>독서</option>
                </St.Select>
              </St.Selecter>

              <St.Buttons>
                <button type="submit">추가</button>
                <button
                  type="button"
                  onClick={() => {
                    setIsopen(false);
                  }}
                >
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
