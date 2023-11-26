import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import * as St from "../../StyledComponents/modules/HeaderStyle/StyledHeader";
import { signOutSetState } from "../../redux/modules/user";

export default function Header({ setIsopen, setTitle, setContents }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logouthandle = () => {
    dispatch(signOutSetState());
  };
  // console.log(user.CurrentUser);
  if (user.currentUser) {
    return (
      <St.Warpper>
        <St.Imgfigure>
          <img src={process.env.PUBLIC_URL + "/headerimg/logo.png"} />
        </St.Imgfigure>
        <St.InputLoginBox>
          <St.InputBox>
            <input type="text" maxLength={30} placeholder="관심있는 취미를 찾아보세요" />
            <button>
              <img src={process.env.PUBLIC_URL + "/headerimg/search.png"} alt="icon" />
            </button>
          </St.InputBox>

          <St.Buttons>
            <button onClick={logouthandle}>로그아웃</button>
            <button
              onClick={() => {
                setIsopen(true);
                setTitle("");
                setContents("");
              }}
            >
              글쓰기
            </button>
          </St.Buttons>
        </St.InputLoginBox>
      </St.Warpper>
    );
  } else if (!user.currentUser) {
    return (
      <St.Warpper>
        <St.Imgfigure>
          <img src={process.env.PUBLIC_URL + "/headerimg/logo.png"} />
        </St.Imgfigure>
        <St.InputBox>
          <input type="text" maxLength={30} placeholder="검색어를 입력하세요" />
          <button>
            <img src={process.env.PUBLIC_URL + "/headerimg/search.png"} alt="icon" />
          </button>
        </St.InputBox>

        <St.Buttons>
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </button>
          <button
            onClick={() => {
              navigate("/join");
            }}
          >
            회원가입
          </button>
        </St.Buttons>
      </St.Warpper>
    );
  }
}
