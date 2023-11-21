import React from "react";
import styled from "styled-components";

export default function Header() {
  return (
    <Warpper>
      <Imgfigure>
        <img src={process.env.PUBLIC_URL + "/headerimg/logo.png"} />
      </Imgfigure>
      <InputBox>
        <input type="text" />
        <button>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAwElEQVR4nGNgIAU833mB+8OuS6Hvdl6J/7DrSuS7XRf9/q9axYyh8M3mKyEvt1zxgPFfb7vs+2brJVcURf///2e8Nu9u1uWFNzXhYqv+M19feCcDw8SjXU+yT/Q+toDxz9Q/5TrS+yIVQ+GWqlfeW8pf+++v/8+yqf4p1+aaVxGby95GYChcFfqfeVH6Z9el6Z+ylqV/Sl2e9jl8WcbnguUZX2IJhsSC5M8xi1O+ysxP+uxMUDFI0cLkb+EEFSIDANRjW/dyq7ziAAAAAElFTkSuQmCC"
            alt="icon"
          />
        </button>
      </InputBox>
      <Buttons>
        <button>계정정보</button>
        <button>글쓰기</button>
      </Buttons>
    </Warpper>
  );
}

const Warpper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100px;
`;

const Imgfigure = styled.div`
  width: 80px;
  height: 50px;
  & img {
    width: 70px;
    height: 40px;
  }

  @media screen and (min-width: 768px) {
    width: 100px;
    & img {
      margin-top: 5px;
      margin-left: 10px;
      width: 100px;
      height: 50px;
    }
  }
  @media screen and (min-width: 1024px) {
    width: 200px;
    & img {
      margin-top: 5px;
      margin-left: 10px;
      width: 200px;
      height: 40px;
    }
  }
  @media screen and (min-width: 1600px) {
    width: 200px;
    & img {
      margin-top: 5px;
      margin-left: 10px;
      width: 300px;
      height: 100px;
    }
  }
`;
const InputBox = styled.div`
  display: flex;
  margin-left: 10px;

  & input {
    font-size: 10px;
    border: 1px solid salmon;
    outline: 0;
    border-radius: 15px;
    padding: 5px;
    width: 150px;
  }
  & button {
    position: relative;
    right: 30px;
    border: 0;
    background-color: transparent;
    cursor: pointer;
  }
  @media screen and (min-width: 768px) {
    & input {
      width: 400px;
      font-size: 20px;
    }
    & button {
      scale: 2;
      right: 35px;
    }
  }
  @media screen and (min-width: 1024px) {
    & input {
      width: 500px;
    }
    & button {
      scale: 2;
      right: 35px;
    }
  }
  @media screen and (min-width: 1600px) {
    & input {
      width: 1000px;
      margin-top: 70px;
      padding: 13px;
      margin-left: 50px;
      font-size: 30px;
    }
    & button {
      margin-top: 70px;
      scale: 4;
      right: 50px;
    }
  }
`;
const Buttons = styled.div`
  display: flex;

  justify-content: center;

  width: 120px;
  & button {
    color: salmon;
    opacity: 0.7;
    font-weight: 1000;
    font-size: 8px;
    padding: 6px 8px;
    border-radius: 10px;
    border: 0;
    cursor: pointer;
    background-color: transparent;

    transition: all 0.2s;
  }

  & button:hover {
    transform: scale(1.05);
    opacity: 1.5;
    text-decoration: underline;
  }
  @media screen and (min-width: 768px) {
    margin-right: 30px;
    width: 150px;
    & button {
      font-size: 15px;
    }
  }
  @media screen and (min-width: 1024px) {
    margin-right: 30px;
    width: 200px;
    gap: 20px;
    & button {
      font-size: 20px;
    }
  }
  @media screen and (min-width: 1600px) {
    margin-right: 30px;
    margin-top: 70px;
    width: 400px;
    gap: 20px;
    & button {
      font-size: 35px;
    }
  }
`;
