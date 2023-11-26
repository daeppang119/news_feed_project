import styled from "styled-components";
export const SliderContainer = styled.div`
  width: 100%;
  max-width: 320px;
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
    top: 50%;
    transform: translate(0, -50%);
    padding: 4px;
    cursor: pointer;
    border-radius: 100%;
    transition: background-color 100ms ease-in-out;
    &:hover,
    &:focus-visible {
      background-color: rgba(0, 0, 0, 0.1);
    }
    svg {
      stroke: white;
      fill: #000;
      width: 12px;
      height: 8px;
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
