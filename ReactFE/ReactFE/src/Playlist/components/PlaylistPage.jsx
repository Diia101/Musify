import { css } from "@emotion/react";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "../../axiosInstance";
import ImageIcon from "../../common/components/ImageIcon";
import MovingBars from "../../common/components/MovingBars";
import SongBar from "../../common/components/SongBar";
import FollowPlaylistButton from "./FollowPlaylistButton";
import PlaylistSongList from "./PlaylistSongList";
import ShareButton from "./ShareButton";
import SwitchPlaylistTypeButton from "./SwitchPlaylistTypeButton";

const circle = css`
  height: 50px;
  width: 50px;
  border: 3px solid #000;
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #ffe8f1;
    transform: scale(1.05);
  }
  cursor: pointer;
`;

const triangle = css`
  width: 0;
  height: 0;
  border-top: 15px solid transparent;
  border-left: 20px solid #ec3b83;
  border-bottom: 15px solid transparent;
  margin: 0px 5px 0px 10px;
`;

const square = css`
  width: 20px;
  height: 20px;
  background-color: #ec3b83;
`;

const AlbumsPageContainer = css`
  background-color: #ffdeeb;
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  text-align: center;
  padding: 20px;
  margin: 0;
  box-sizing: border-box;
`;

const horizontalLine = css`
  color: black;
  background-color: black;
  width: 80vw;
  height: 2px;
`;

const ListCSS = css`
  width: 70vw;
  margin-top: 500px;
`;

const LargeParagraph = styled.p`
  font-size: 25px;
`;

const playlistInformationDiv = css`
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  gap: 50px;
`;

const titleDiv = css`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const playlistNameCss = css`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  & h1 {
    margin: 0px;
    font-family: "Verdana", cursive;
  }
`;

const movingBarsDiv = css`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: right;
`;

const informationDivCss = css`
  display: flex;
  width: 90%;
`;

function PlaylistPage({ playlistId }) {
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);
  const [currentIndexPlay, setCurrentIndexPlay] = useState(-1);
  const [currentUser, setCurrentUser] = useState(null);

  const playCSS = currentIndexPlay !== -1 ? square : triangle;

  useEffect(() => {
    if (!localStorage.getItem("jwt")) navigate("/");
    const fetchAlbums = async () => {
      try {
        const response = await axiosInstance.get(`playlists/${playlistId}`);
        setPlaylist(response.data);
      } catch (error) {
        console.error("Error fetching playlist data:", error);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (token) {
          const id = jwtDecode(token).sub;
          const response = await axiosInstance.get(`user/${id}`);
          setCurrentUser(response.data);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchAlbums();
    fetchCurrentUser();
  }, [navigate, playlistId]);

  useEffect(() => {
    const verifyPageAccess = () => {
      if (playlist.isPublic) {
        return true;
      }
      if (playlist.owner.userId === currentUser.userId) {
        return true;
      }
      return false;
    };
    if (playlist && currentUser) {
      if (!verifyPageAccess()) {
        navigate("/");
      }
    }
  }, [playlist, currentUser, navigate]);

  if (!playlist || !currentUser) {
    return null;
  }

  return (
    <div css={AlbumsPageContainer} id="PlaylistPage">
      <div css={titleDiv}>
        <div css={playlistInformationDiv}>
          <ImageIcon type="playlist" id={playlistId} />
          <div css={playlistNameCss}>
            <h1>{playlist.name}</h1>
            <p>
              By {playlist.owner.firstname} {playlist.owner.lastname}
            </p>
          </div>
        </div>
        <div css={movingBarsDiv}>
          <MovingBars isAnimated={currentIndexPlay !== -1} />
        </div>
      </div>
      <hr css={horizontalLine} />
      <div css={informationDivCss}>
        <div
          css={css`
            width: 10%;
          `}
        >
          <ShareButton />
        </div>
        <div
          css={css`
            width: 80%;
          `}
        >
          <LargeParagraph>Creation Date: {playlist.createdDate}</LargeParagraph>
          <LargeParagraph>
            {Array.isArray(playlist.songs) ? playlist.songs.length : 0} songs:{" "}
            {Array.isArray(playlist.songs)
              ? playlist.songs.reduce((sum, song) => sum + song.duration, 0)
              : 0}{" "}
            min
          </LargeParagraph>
        </div>
        <div>
          <SwitchPlaylistTypeButton
            playlist={playlist}
            setPlaylist={setPlaylist}
          />
          <FollowPlaylistButton playlist={playlist} setPlaylist={setPlaylist} />
        </div>
      </div>

      <div
        css={circle}
        onClick={() =>
          setCurrentIndexPlay(
            currentIndexPlay !== -1 ? -1 : playlist.songs.length === 0 ? -1 : 0,
          )
        }
      >
        <div css={playCSS}></div>
      </div>
      <PlaylistSongList
        css={ListCSS}
        songs={playlist.songs || []}
        setSongs={(songs) => {
          setPlaylist({
            playlistId: playlist.playlistId,
            name: playlist.name,
            createdDate: playlist.createdDate,
            isPublic: playlist.isPublic,
            isFollowed: playlist.isFollowed,
            owner: playlist.owner,
            songs: songs,
          });
        }}
        playlistId={playlist.playlistId}
        setCurrentIndexPlay={setCurrentIndexPlay}
        currentIndexPlay={currentIndexPlay}
      />
      <SongBar
        song={playlist.songs[currentIndexPlay]}
        isOpen={currentIndexPlay !== -1}
      />
    </div>
  );
}

PlaylistPage.propTypes = {
  playlistId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default PlaylistPage;
