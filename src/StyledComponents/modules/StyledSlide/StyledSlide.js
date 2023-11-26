import styled from "styled-components";
export const SliderContainer = styled.div`
  width: 100%;
  max-width: 320px;
  height: 240px;
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
    height: 100%;
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
    padding: 16px;
    cursor: pointer;
    transition: background-color 100ms ease-in-out;
    &:hover,
    &:focus-visible {
      background-color: rgba(0, 0, 0, 0.1);
    }
    svg {
      stroke: white;
      fill: #000;
      width: 32px;
      height: 32px;
    }
  }
`;
export const DeleteImage = styled.button`
  position: absolute;
  left: 50%;
  top: -40px;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  font-size: 20px;
  line-height: 2;
  text-align: center;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: transparent;
    color: #333;
  }
`;

export const Div = styled.div`
  display: grid;
  place-content: center center;
  font-size: 30px;
  height: 100vh;
`;
