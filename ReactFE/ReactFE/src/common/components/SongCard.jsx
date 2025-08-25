import { css } from "@emotion/react";
import { Card } from "@mui/material";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import axiosInstance from "../../axiosInstance";
import Popup from "../../Song/components/Popup";
import ImageIcon from "./ImageIcon";

const cardCss = css`
  position: absolute;
  background-color: #defff2;
  border-radius: 15px;
  color: #000;
  margin-top: 25px;
  padding: 25px 0px;
  font:
    600 16px Poppins,
    sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 180px;
  text-align: center;
  position: relative;

  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);

  & p {
    margin: 10px 0px 10px 0px;
    font-size: 18px;
    &.spacingTop {
      margin-top: 25px;
    }
  }
  font-family: "Sansita Swashed", cursive;
  cursor: pointer;
`;

const artistOfSongCss = css`
  height: auto;
  width: feat-content;
  text-align: center;
  font:
    400 10px Poppins,
    sans-serif;
  color: #666;
  & p {
    font-size: 13px;
  }
  font-family: "Sansita Swashed", cursive;
`;

const topLeftImageCss = css`
  position: relative;
  top: 60px;
  left: 5px;
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  &:hover {
    background-color: #c8e6da;
  }
  z-index: 2;
  cursor: pointer;
`;

function SongCard({ song, onDelete }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const containerRef = useRef(null);

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  const handleDeleteClick = () => {
    togglePopup();
  };

  const handleDeleteConfirmed = () => {
    handleDelete();
    setIsPopupOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/songs/${song.id}`);
      onDelete(song.id);
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  return (
    <>
      <div
        css={css`
          position: relative;
          width: fit-content;
          height: 60%;
          &:hover {
            transform: scale(1.05);
          }

          transition: transform 0.3s ease-in-out;
        `}
      >
        {localStorage.getItem("artist-flag") == "true" && (
          <div css={topLeftImageCss} onClick={handleDeleteClick}>
            <img
              src="Icons/icons-for-buttons/delete-icon.png"
              width={24}
              height={24}
              alt="Delete"
            />
          </div>
        )}

        <Card css={cardCss} onClick={() => window.open(song.url)}>
          <ImageIcon type="song" id={song.id} />
          <p className="spacingTop">{song.title}</p>
          <div css={artistOfSongCss}>
            <p>by</p>
            <p>{song.artist}</p>
          </div>
        </Card>
      </div>
      {isPopupOpen && (
        <Popup
          onClose={togglePopup}
          isOpen={isPopupOpen}
          ref={containerRef}
          handleDeleteTrue={handleDeleteConfirmed}
          handleDeleteFalse={togglePopup}
        />
      )}
    </>
  );
}

SongCard.propTypes = {
  song: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default SongCard;
