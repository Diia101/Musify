import { css } from "@emotion/react";
import { Card } from "@mui/material";
import PropTypes from "prop-types";
import ImageIcon from "./ImageIcon";

const cardCss = css`
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
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
  & p {
    margin: 10px 0px 10px 0px;
    font-size: 18px;
    &.spacingTop {
      margin-top: 25px;
    }
  }
  font-family: "Sansita Swashed", cursive;
`;

const ownerOfPlaylist = css`
  height: auto;
  width: fit-content;
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
  position: absolute;
  top: 5px;
  left: 5px;
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #c8e6da;
  }
`;

function PlaylistCard({ playlist, onClick, onDelete }) {
  const handleDeleteClick = (event) => {
    event.stopPropagation();
    onDelete();
  };

  return (
    <Card css={cardCss} onClick={onClick}>
      <ImageIcon type="playlist" id={playlist.playlistId} />
      <p className="spacingTop">{playlist.name}</p>
      <div css={ownerOfPlaylist}>
        <p>by</p>
        <p>{playlist.ownerName}</p>
      </div>
      <div css={topLeftImageCss} onClick={handleDeleteClick}>
        <img
          src="Icons/icons-for-buttons/delete-icon.png"
          width={24}
          height={24}
          alt="Delete"
        />
      </div>
    </Card>
  );
}

PlaylistCard.propTypes = {
  playlist: PropTypes.shape({
    playlistId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ownerName: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PlaylistCard;
