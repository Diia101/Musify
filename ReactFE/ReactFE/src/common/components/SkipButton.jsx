import { css } from "@emotion/react";
import PropTypes from "prop-types";

export default function SkipButton({ orientation }) {
  const rigthTriangle = css`
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 20px solid #82858f;
    border-bottom: 10px solid transparent;
  `;
  const leftTriangle = css`
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-right: 20px solid #82858f;
    border-bottom: 10px solid transparent;
  `;

  const style = orientation == "left" ? leftTriangle : rigthTriangle;

  const divCss = css`
    display: flex;
  `;

  return (
    <>
      <div css={divCss}>
        <div css={style}></div>
        <div css={style}></div>
      </div>
    </>
  );
}

SkipButton.propTypes = {
  orientation: PropTypes.string.isRequired,
};
