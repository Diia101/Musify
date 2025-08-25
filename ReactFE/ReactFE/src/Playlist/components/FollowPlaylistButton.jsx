import IconButton from "@mui/material/IconButton";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import axiosInstance from "../../axiosInstance";

const HeartContainer = styled("div")({
  display: "inline-block",
  verticalAlign: "middle",
});

const Heart = styled("div")({
  fontSize: "1em",
  position: "relative",
});

const Heartbeat = styled("div")({
  position: "relative",
  zIndex: 1,
  animation: "beat 5s linear infinite",
  color: "pink",
  "@keyframes beat": {
    "0%": { transform: "scale(1)" },
    "14%": { transform: "scale(0.9)" },
    "21%": { transform: "scale(1.1) skew(0.004turn)" },
    "28%": { transform: "scale(1) skew(0.008turn)" },
    "35%": { transform: "scale(1) skew(0)" },
  },
});

const Heartecho = styled("div")({
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  animation: "echo 2s linear infinite",
  "@keyframes echo": {
    "0%": { opacity: 0.5, transform: "scale(1)" },
    "14%": { opacity: 0.4, transform: "scale(0.8)" },
    "21%": { opacity: 0.4, transform: "scale(1.1)" },
    "100%": { opacity: 0, transform: "scale(3)" },
  },
});

export default function FollowPlaylistButton({ playlist, setPlaylist }) {
  const userId = jwtDecode(localStorage.getItem("jwt")).sub;
  const [visible, setVisible] = useState(playlist.isFollowed);
  const exists = userId != playlist.owner.userId;

  const manageFollowPlaylist = async () => {
    try {
      const data = {
        userId: userId,
      };
      if (!visible) {
        await axiosInstance.put(
          `/playlists/${playlist.playlistId}/follow`,
          data,
        );
      } else {
        await axiosInstance.put(
          `/playlists/${playlist.playlistId}/unfollow`,
          data,
        );
      }
    } catch (error) {
      toast.error(error.response.data.message || error.response.data.messages, {
        position: "bottom-center",
        style: {
          background: "#d0342c",
        },
      });
    }
  };

  const handleFollowPlaylist = () => {
    setVisible(visible ? false : true);

    setPlaylist({
      playlistId: playlist.playlistId,
      name: playlist.name,
      createdDate: playlist.createdDate,
      isFollowed: !visible,
      isPublic: playlist.isPublic,
      owner: playlist.owner,
      songs: playlist.songs,
    });

    manageFollowPlaylist();
  };

  return (
    exists && (
      <IconButton
        id="followPlaylistButton"
        color="black"
        onClick={handleFollowPlaylist}
        sx={{ ":focus": { outline: "none" }, width: "fit-content" }}
      >
        <HeartContainer>
          <Heart>
            <Heartbeat>{visible ? "❤️" : "🤍"}</Heartbeat>
            <Heartecho>❤</Heartecho>
          </Heart>
        </HeartContainer>
      </IconButton>
    )
  );
}


FollowPlaylistButton.propTypes = {
  playlist: PropTypes.shape({
    playlistId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    createdDate: PropTypes.string.isRequired,
    isPublic: PropTypes.bool.isRequired,
    isFollowed: PropTypes.bool.isRequired,
    owner: PropTypes.shape({
      userId: PropTypes.number.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
    }).isRequired,
    songs: PropTypes.array.isRequired,
  }).isRequired,
  setPlaylist: PropTypes.func.isRequired,
};
