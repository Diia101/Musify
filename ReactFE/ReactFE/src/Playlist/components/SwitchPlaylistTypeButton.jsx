import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../axiosInstance";

export default function SwitchPlaylistTypeButton({ playlist, setPlaylist }) {
  const userId = jwtDecode(localStorage.getItem("jwt")).sub;
  const exists = userId == playlist.owner.userId;
  const [visible, setVisible] = useState(playlist.isPublic);

  const updatePlaylistType = async () => {
    try {
      const data = {
        name: playlist.name,
        isPublic: !visible,
      };
      await axiosInstance.put(`/playlists/${playlist.playlistId}`, data);
    } catch (error) {
      toast.error(error.response.data.message || error.response.data.messages, {
        position: "bottom-center",
        style: {
          background: "#d0342c",
        },
      });
    }
  };

  const handleChangePlaylistType = () => {
    setVisible(visible ? false : true);

    setPlaylist({
      playlistId: playlist.playlistId,
      name: playlist.name,
      createdDate: playlist.createdDate,
      isPublic: !visible,
      owner: playlist.owner,
      songs: playlist.songs,
      isFollowed: playlist.isFollowed,
    });

    updatePlaylistType();
  };

  return (
    exists && (
      <IconButton
        id="changePlaylistTypeButton"
        color="black"
        onClick={handleChangePlaylistType}
        sx={{ ":focus": { outline: "none" } }}
      >
        {visible ? (
          <VisibilityIcon id="publicType" />
        ) : (
          <VisibilityOffIcon id="privateType" />
        )}
      </IconButton>
    )
  );
}

SwitchPlaylistTypeButton.propTypes = {
  playlist: PropTypes.shape({
    playlistId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    createdDate: PropTypes.string.isRequired,
    isPublic: PropTypes.bool.isRequired,
    owner: PropTypes.shape({
      userId: PropTypes.number.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
    }).isRequired,
    songs: PropTypes.array.isRequired,
    isFollowed: PropTypes.bool.isRequired,
  }).isRequired,
  setPlaylist: PropTypes.func.isRequired,
};
