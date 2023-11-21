import { css } from "styled-components";

const breakPoints = {
  md: 768,
  lg: 1200
};

const mediaQuery = Object.entries(breakPoints).reduce((acc, [key, value]) => {
  acc[key] = (...arg) => css`
    @media (min-width: ${value}px) {
      ${css(...arg)}
    }
  `;
  return acc;
}, {});

export default mediaQuery;
