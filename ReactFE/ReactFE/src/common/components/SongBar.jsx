import { css, keyframes } from "@emotion/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ImageIcon from "./ImageIcon";
import LinearDeterminate from "./LinearDetermiante";
import SkipButton from "./SkipButton";
import VolumeSetter from "./VolumeSetter";

const slideInFromBottom = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideOutToBottom = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

const songBarDiv = (isOpen) => css`
  height: 10%;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #d0d4e4;
  display: flex;
  align-items: center;
  gap: 30px;
  animation: ${isOpen ? slideInFromBottom : slideOutToBottom} 0.75s ease-in-out;
`;

const songMainCss = css`
  font-weight: 700;
  font-size: 23px;
  font-family: "Rufina", Times, serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  gap: 10px;
`;

const songTitleCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const volumeSetterDiv = css`
  display: flex;
  flex: 1;
  margin: 0px 10px;
  align-items: center;
  justify-content: right;
`;

const songIconDiv = css`
  display: flex;
  flex: 1;
  margin: 0px 10px;
  align-items: center;
  justify-content: left;
`;

function SongBar({ song, isOpen }) {
  const [isVisible, setVisible] = useState(isOpen);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setCurrentSong(song);
    }
  }, [isOpen, song]);

  const handleAnimationEnd = () => {
    if (!isOpen) setVisible(false);
  };

  return (
    isVisible && (
      <>
        <div css={songBarDiv(isOpen)} onAnimationEnd={handleAnimationEnd}>
          <div css={songIconDiv}>
            <ImageIcon type="song" id={currentSong.id} />
          </div>
          <div css={songMainCss}>
            <div css={songTitleCss}>
              <SkipButton orientation={"left"} />
              {currentSong.title}
              <SkipButton orientation={"rigth"} />
            </div>
            <LinearDeterminate duration={currentSong.duration} />
          </div>
          <div css={volumeSetterDiv}>
            <VolumeSetter />
          </div>
        </div>
      </>
    )
  );
}

SongBar.propTypes = {
  song: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default SongBar;
