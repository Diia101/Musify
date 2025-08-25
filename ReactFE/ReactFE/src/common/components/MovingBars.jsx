import { css, keyframes } from "@emotion/react";
import PropTypes from "prop-types";

const growHeight = (height) => keyframes`
  from {
    height: 10px;
  }
  to {
    height: ${height}px;
  }
`;

const animatedDivStyle = (isAnimated, time, height) => css`
  width: 5px;
  height: 5px;
  background-color: #ec3b83;
  position: absolute;
  bottom: 0;
  border-radius: 50px;
  transition: 0.9s ease;
  ${isAnimated &&
  css`
    animation: ${growHeight(height)} ${time}s infinite alternate;
  `}
`;

const miniContainer = css`
  display: flex;
  width: 10px;
`;

const mainDivCss = css`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  width: fit-content;
  height: 100px;
  position: relative;
`;

function MovingBars(props) {
  const isAnimated = props.isAnimated;

  const numContainers = 20;
  function getRandomTime() {
    return (Math.random() + 0.5) * 2.5;
  }
  const durations = Array.from({ length: numContainers }, getRandomTime);

  return (
    <>
      <div css={mainDivCss}>
        {durations.map((duration, index) => (
          <div key={index} css={miniContainer}>
            <div css={animatedDivStyle(isAnimated, duration, 100)}></div>
          </div>
        ))}
      </div>
    </>
  );
}

MovingBars.propTypes = {
  isAnimated: PropTypes.bool.isRequired,
};

export default MovingBars;
