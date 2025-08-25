/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

const bubbleAnimation = keyframes`
  0% {
    transform: scale(0) translateY(0) rotate(70deg);
  }

  100% {
    transform: scale(1.3) translateY(-100vh) rotate(360deg);
  }
`;

const dotStyle = css`
  height: 15%;
  width: 15%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 20%;
  right: 20%;
`;

const bubbleStyle = (width, color, position, time) => css`
  height: ${width}px;
  width: ${width}px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  position: absolute;
  top: ${position.x}px;
  left: ${position.y}px;
  background-color: ${color};
  animation: ${bubbleAnimation} ${time}s linear infinite;
  transform-origin: center;
`;

export default function Bubble({ width, color, position, time }) {
  return (
    <div css={bubbleStyle(width, color, position, time)}>
      <span css={dotStyle}></span>
    </div>
  );
}
