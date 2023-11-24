import styled, { keyframes } from "styled-components";

//progress Animation Start

const rotateParentAnimation = keyframes`
  0%{
    filter : hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
`;
const rotateChildrenAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  80%,100% {
    transform: scale(0);
  }
`;
const ProgressAnimate = {
  ProgressContainer: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    min-width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #042104;
    /* background-color: rgba(0, 0, 0, 0.5); */
    animation: ${rotateParentAnimation} 5s linear infinite;
    div {
      position: relative;
      width: 120px;
      height: 120px;
    }

    span {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #00ff0a;
        box-shadow: 0 0 10px #00fa0a, 0 0 20px #00fa0a, 0 0 40px #00fa0a, 0 0 60px #00fa0a, 0 0 80px #00fa0a,
          0 0 100px #00fa0a;
      }
    }
  `,
  ProgressSpan: styled.span`
    transform: ${(props) => `rotate(calc(18deg*${props.$i}))`};

    &::before {
      animation: ${rotateChildrenAnimation} 2s linear infinite;
      animation-delay: ${(props) => `calc(0.1s*${props.$i})`};
    }
  `,
  EffectionsNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
};
export default ProgressAnimate;
// export const StProgressJoinSpan = styled.span`
//   transform: ${(props) => `rotate(calc(18deg*${props.$i}))`};

//   &::before {
//     animation: ${rotateChildrenAnimation} 2s linear infinite;
//     animation-delay: ${(props) => `calc(0.1s*${props.$i})`};
//   }
// `;

// export const StProgressJoinContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   min-width: 100vw;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   min-height: 100vh;
//   background-color: #042104;
//   /* background-color: rgba(0, 0, 0, 0.5); */
//   animation: ${rotateParentAnimation} 5s linear infinite;
//   div {
//     position: relative;
//     width: 120px;
//     height: 120px;
//   }

//   span {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;

//     &::before {
//       content: "";
//       position: absolute;
//       top: 0;
//       left: 0;
//       width: 15px;
//       height: 15px;
//       border-radius: 50%;
//       background-color: #00ff0a;
//       box-shadow: 0 0 10px #00fa0a, 0 0 20px #00fa0a, 0 0 40px #00fa0a, 0 0 60px #00fa0a, 0 0 80px #00fa0a,
//         0 0 100px #00fa0a;
//     }
//   }
// `;
// export const animationArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

// progress Animation End
