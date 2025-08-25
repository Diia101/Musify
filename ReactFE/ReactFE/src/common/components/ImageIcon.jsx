import { css } from "@emotion/react";
import PropTypes from "prop-types";

const backgroundDivCss = css`
  border-radius: 15px;
  width: 86px;
  height: 86px;
  background-color: #c8e6da;
  align-content: center;
`;

function ImageIcon(props) {
  const id = props.id;

  const generateRandomNumber = () => {
    return Math.floor(id % 3) + 1;
  };

  const type = props.type;
  const generateImageLink = () => {
    const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
    const imageLink = `/Icons/${capitalizedType}s/icon-${type}-${generateRandomNumber()}.png`;
    return imageLink;
  };

  return (
    <div css={backgroundDivCss}>
      <img src={generateImageLink()} alt={`${type} icon`} />
    </div>
  );
}

ImageIcon.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default ImageIcon;
