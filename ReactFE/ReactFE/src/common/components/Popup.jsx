import { css, keyframes } from "@emotion/react";
import PropTypes from "prop-types";
import { forwardRef, useState } from "react";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
`;

const popupCss = (isOpen) => css`
  position: absolute;
  background-color: #dee4ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  border-radius: 20px;
  padding: 10px;
  animation: ${isOpen ? fadeIn : fadeOut} 0.56s ease;
  opacity: ${isOpen ? 1 : 0};
  visibility: ${isOpen ? "visible" : "hidden"};
  transition:
    opacity 0.9s ease,
    visibility 0.9s ease;

  &:before {
    content: "";
    position: absolute;
    top: -9px;
    right: -9px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 20px solid #dee4ff;
    transform: rotate(45deg);
  }
`;

const selectCss = css`
  background-color: #fff9de;
  border-color: #b3ae9b;
  width: 180px;
  height: 25px;
  text-align: center;
  border-radius: 13px;
  margin: 10px 0;
  font:
    700 12px Poppins,
    sans-serif;
  outline: none;
  &:hover {
    border-color: #807d6f;
  }
`;

const buttonCss = css`
  width: 80px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-color: #b3ae9b;
  cursor: pointer;
  background-color: #fff9de;
  border-radius: 4px;
  font:
    700 12px Poppins,
    sans-serif;
  outline: none;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  &:hover {
    border-color: #807d6f;
  }
`;

const PopupAddPlaylist = forwardRef(
  ({ position, isOpen, playlists, onAddToPlaylist }, ref) => {
    const [selectedPlaylist, setSelectedPlaylist] = useState("");

    const handleSelectChange = (event) => {
      setSelectedPlaylist(event.target.value);
    };

    const handleAddClick = () => {
      if (selectedPlaylist) {
        onAddToPlaylist(selectedPlaylist);
      } else {
        alert("Please select a playlist.");
      }
    };

    return (
      <div
        css={popupCss(isOpen)}
        style={{
          top: position.top + 20,
          left: position.left + 5,
        }}
        ref={ref}
      >
        <select
          css={selectCss}
          value={selectedPlaylist}
          onChange={handleSelectChange}
        >
          <option value="">Choose a playlist</option>
          {playlists.map((playlist) => (
            <option key={playlist.id} value={playlist.id}>
              {playlist.name}
            </option>
          ))}
        </select>
        <br />
        <button css={buttonCss} onClick={handleAddClick}>
          Add
        </button>
      </div>
    );
  },
);

PopupAddPlaylist.propTypes = {
  position: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  playlists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onAddToPlaylist: PropTypes.func.isRequired,
};

PopupAddPlaylist.displayName = "PopupAddPlaylist";

export default PopupAddPlaylist;
