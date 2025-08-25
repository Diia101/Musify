import { css } from "@emotion/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import "../App.css";
import axiosInstance from "../axiosInstance";
import ImageIcon from "../common/components/ImageIcon";
import MovingBars from "../common/components/MovingBars";
import SongBar from "../common/components/SongBar";
import AlbumList from "./AlbumList";

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
  width: 100vw;
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
const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#defff2",
    border: "none",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    width: "90%",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

const movingBarsDiv = css`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: right;
`;

const titleDiv = css`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const albumInformationDiv = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  gap: 50px;
`;

const albumNameCss = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & h1 {
    margin: 0px;
    font-family: "Sansita Swashed", cursive;
  }
`;

const getUserArtist = () => {
  const artistId = localStorage.getItem("user-artist-id");
  return artistId;
};

function AlbumPage({ AlbumId }) {
  const [userArtist, setUserArtist] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [artistSongs, setArtistSongs] = useState([]);
  const [album, setAlbum] = useState({
    title: "",
    releaseDate: "",
    songs: [],
    artist: {
      artistId: "",
      artistName: "",
      activePeriod: "",
      location: "",
      person: false,
    },
    description: "",
    genre: "",
    label: "",
  });

  const [currentIndexPlay, setCurrentIndexPlay] = useState(-1);

  const playCSS = currentIndexPlay !== -1 ? square : triangle;

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axiosInstance.get(
          `http://localhost:8081/albums/${AlbumId}`,
        );
        setAlbum(response.data);

        const userArtistId = getUserArtist();
        if (
          userArtistId &&
          (response.data.artist.artistId === parseInt(userArtistId), 10)
        ) {
          setUserArtist(userArtistId);
        }
      } catch (error) {
        console.error("Error fetching albums data:", error);
      }
    };

    fetchAlbums();
  }, [AlbumId, userArtist]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axiosInstance.get(
          `/songs/artist/${userArtist}/Album`,
        );
        setArtistSongs(response.data);
      } catch (error) {
        console.error("Error fetching albums data:", error);
      }
    };
    fetchSongs();
  }, [userArtist]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleAddToAlbum = async (songId) => {
    try {
      const response = await axiosInstance.post(
        `/albums/${AlbumId}/${songId}/songs`,
      );
      setAlbum(response.data);
    } catch (error) {
      console.error("Error adding song to album:", error);
    }
  };
  const availableSongs = artistSongs.filter(
    (song) => !album.songs.some((albumSong) => albumSong.id === song.id),
  );
  return (
    <>
      <div id="albumPage" css={AlbumsPageContainer}>
        {localStorage.getItem("isAdmin") === "true" && (
          <div
            onClick={handleOpenModal}
            css={{
              cursor: "pointer",
              position: "absolute",
              top: "210px",
              right: "140px",
            }}
          >
            <img
              id="addSongToAlbum"
              src="/Icons/icons-for-buttons/icon-create-playlist.png"
            ></img>
          </div>
        )}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Add Song Modal"
          style={customModalStyles}
        >
          <h2
            style={{
              color: "#333",
              marginBottom: "20px",
              alignContent: "center",
            }}
          >
            Select a Song to Add
          </h2>
          <ul>
            {availableSongs.length > 0 ? (
              availableSongs.map((song) => (
                <li
                  key={song.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <span>{song.title}</span>{" "}
                  <button
                    onClick={() => handleAddToAlbum(song.id)}
                    id="addModalToAlbum"
                    style={{
                      backgroundColor: "#d1b9d8",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      padding: "6px 12px",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#9a76a3")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#d1b9d8")
                    }
                  >
                    Add Song
                  </button>
                </li>
              ))
            ) : (
              <p style={{ textAlign: "center", marginTop: "20px" }}>
                All available songs are already in the album.
              </p>
            )}
          </ul>
          <button
            onClick={handleCloseModal}
            id="closeModalToAlbum"
            style={{
              backgroundColor: "#5aa185",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "8px 16px",
              cursor: "pointer",
              marginTop: "20px",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#2c6b52")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#5aa185")
            }
          >
            Close
          </button>{" "}
        </Modal>
        <div css={titleDiv}>
          <div css={albumInformationDiv}>
            <ImageIcon type="album" id={AlbumId} />
            <div css={albumNameCss}>
              <h1>{album.title}</h1>
              <p>By {album.artist.artistName}</p>
            </div>
          </div>
          <div css={movingBarsDiv}>
            <MovingBars isAnimated={currentIndexPlay !== -1} />
          </div>
        </div>
        <hr css={horizontalLine} />
        <LargeParagraph>Album Release Date: {album.releaseDate}</LargeParagraph>
        <LargeParagraph>
          {Array.isArray(album.songs) ? album.songs.length : 0} songs:{" "}
          {Array.isArray(album.songs)
            ? album.songs.reduce((sum, song) => sum + song.duration, 0)
            : 0}{" "}
          min
        </LargeParagraph>
        <div
          css={circle}
          onClick={() =>
            setCurrentIndexPlay(
              currentIndexPlay !== -1 ? -1 : album.songs.length === 0 ? -1 : 0,
            )
          }
        >
          <div css={playCSS}></div>
        </div>
        <AlbumList
          css={ListCSS}
          songs={album.songs || []}
          setCurrentIndexPlay={setCurrentIndexPlay}
          currentIndexPlay={currentIndexPlay}
        />
        <SongBar
          song={album.songs[currentIndexPlay]}
          isOpen={currentIndexPlay !== -1}
        />
      </div>
    </>
  );
}

AlbumPage.propTypes = {
  AlbumId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default AlbumPage;
