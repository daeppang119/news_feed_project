import React from "react";
import * as St from "../../StyledComponents/modules/HeaderStyle/StyledHeader";

export default function Header() {
  return (
    <St.Warpper>
      <St.Imgfigure>
        <img src={process.env.PUBLIC_URL + "/headerimg/logo.png"} />
      </St.Imgfigure>
      <St.InputBox>
        <input type="text" maxLength={30} placeholder="관심있는 취미를 찾아보세요" />
        <button>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAwElEQVR4nGNgIAU833mB+8OuS6Hvdl6J/7DrSuS7XRf9/q9axYyh8M3mKyEvt1zxgPFfb7vs+2brJVcURf///2e8Nu9u1uWFNzXhYqv+M19feCcDw8SjXU+yT/Q+toDxz9Q/5TrS+yIVQ+GWqlfeW8pf+++v/8+yqf4p1+aaVxGby95GYChcFfqfeVH6Z9el6Z+ylqV/Sl2e9jl8WcbnguUZX2IJhsSC5M8xi1O+ysxP+uxMUDFI0cLkb+EEFSIDANRjW/dyq7ziAAAAAElFTkSuQmCC"
            alt="icon"
          />
        </button>
      </St.InputBox>
      <St.Buttons>
        <button>계정정보</button>
        <button>글쓰기</button>
      </St.Buttons>
    </St.Warpper>
  );
}
