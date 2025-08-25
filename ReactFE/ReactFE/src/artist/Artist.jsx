import { css } from "@emotion/react";
import { styled } from "@mui/material";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import CardFactory from "../common/CardFactory";
import AlbumCard from "../common/components/AlbumCard";
import Popup from "../Song/components/Popup";
import Stage from "./Stage";

const Container = styled("div")(({ theme }) => ({
  backgroundColor: "#FFDEEB",
  justifyContent: "space-between",
  alignItems: "center",
  alignContent: "center",
  paddingBottom: "25px",
  [theme.breakpoints.down("md")]: {
    padding: "0 20px",
  },
  width: "100%",
  minHeight: "100px",
}));
const List = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "2rem",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },
}));

const ListItem = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  lineHeight: "normal",
  justifyContent: "center",
  alignItems: "center",
  width: "250px",
  height: "100%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const horizontalLine = css`
  color: black;
  background-color: black;
  width: 85vw;
  height: 2px;
`;

function Artist({ artistId, handleNavigation }) {
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [showAllSongs, setShowAllSongs] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(null);

  const fetchArtist = useCallback(async () => {
    let isMounted = true;
    try {
      const response = await axiosInstance.get(`artists/${artistId}`);

      if (isMounted) {
        setArtist(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("Artist not found");
      } else {
        console.error("Error fetching artist: ", error);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [artistId]);

  const fetchMyAlbums = useCallback(async () => {
    let isMounted = true;
    if (!artist) return;
    try {
      const response = await axiosInstance.get(
        `artists/${artist.artistId}/albums`,
      );
      if (isMounted) {
        setAlbums(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    return () => {
      isMounted = false;
    };
  }, [artist]);

  const fetchMySongs = useCallback(async () => {
    let isMounted = true;
    if (!artist) return;
    try {
      const response = await axiosInstance.get(
        `songs/artist/${artist.artistId}`,
      );
      if (isMounted) {
        setSongs(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    return () => {
      isMounted = false;
    };
  }, [artist]);

  useEffect(() => {
    const cleanupFetchArtist = fetchArtist();
    return cleanupFetchArtist;
  }, [fetchArtist]);

  useEffect(() => {
    if (artist) {
      const cleanupFetchMyAlbums = fetchMyAlbums();
      return cleanupFetchMyAlbums;
    }
  }, [artist, fetchMyAlbums]);

  useEffect(() => {
    if (artist) {
      const cleanupFetchMySongs = fetchMySongs();
      return cleanupFetchMySongs;
    }
  }, [artist, fetchMySongs]);

  const handleShowAllSongs = () => {
    setShowAllSongs(true);
  };

  const handleDeleteClick = (item, type) => {
    setItemToDelete(item);
    setDeleteType(type);
    setIsPopupOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (itemToDelete) {
      try {
        if (deleteType === "album") {
          await axiosInstance.delete(`/albums/${itemToDelete.albumId}`);
          setAlbums((prevAlbums) =>
            prevAlbums.filter((alb) => alb.albumId !== itemToDelete.albumId),
          );
        } else if (deleteType === "song") {
          await axiosInstance.delete(`/songs/${itemToDelete.id}`);
          setSongs((prevSongs) =>
            prevSongs.filter((song) => song.id !== itemToDelete.id),
          );
        }
        setIsPopupOpen(false);
        setItemToDelete(null);
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const displaySongs = showAllSongs ? songs : songs.slice(0, 8);

  return (
    <>
      <div
        id="ArtistPage"
        css={{
          display: "flex",
          flexDirection: "column",
          fontSize: "55px",
          color: "#000",
          fontWeight: "700",
          height: "100%",
          alignItems: "center",
          width: "100%",
          "@media (max-width: 991px)": {
            maxWidth: "100%",
            marginTop: "40px",
            fontSize: "40px",
          },
          backgroundColor: "#fff5f9",
        }}
      >
        {artist && (
          <>
            <div
              css={css`
                width: 85%;
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-top: 16px;
              `}
            >
              <div
                css={css`
                  width: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                `}
              >
                <h2
                  css={css`
                    font-size: 75px;
                  `}
                >
                  <u>Artist:</u> {artist.artistName}
                </h2>
              </div>
              <div
                css={css`
                  width: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: flex-end;
                `}
              >
                <Stage artists={artist.artists} />
              </div>
            </div>
          </>
        )}

        <hr css={horizontalLine} />
        <div
          css={css`
            width: 85%;
          `}
        >
          {songs.length > 0 && (
            <div
              css={{
                width: "100%",
              }}
            >
              <div
                css={{
                  display: "flex",
                  alignItems: "start",
                  flexWrap: "wrap",
                  gap: "20px",
                  fontFamily: "Poppins, sans-serif",
                  "@media (max-width: 991px)": {
                    maxWidth: "100%",
                    flexWrap: "wrap",
                    fontSize: "40px",
                  },
                }}
              >
                Songs
              </div>
              <div
                css={{
                  backgroundColor: "#000",
                  minHeight: "3px",
                  border: "`1px solid rgba(0, 0, 0, 1)",
                  width: "100%",
                }}
              />
              <Container>
                <List id="songList">
                  {displaySongs.map((song) => {
                    const artistNames = song.artistsOfASong
                      ? [...song.artistsOfASong]
                          .map((artist) => artist.artistName)
                          .join(" ft. ")
                      : "Unknown Artist";

                    const formattedSong = {
                      id: song.id,
                      title: song.title,
                      artist: artistNames,
                      url: song.url,
                    };
                    return (
                      <ListItem key={song.id}>
                        {CardFactory(
                          "song",
                          formattedSong,
                          () => window.open(song.url),
                          () => handleDeleteClick(song, "song"),
                        )}
                      </ListItem>
                    );
                  })}
                </List>
                {!showAllSongs && songs.length > 8 && (
                  <button
                    onClick={handleShowAllSongs}
                    style={{
                      backgroundColor: "#d1b9d8",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      padding: "15px 20px",
                      fontSize: "1.1rem",
                      cursor: "pointer",
                      marginTop: "20px",
                    }}
                  >
                    Display All
                  </button>
                )}
              </Container>
            </div>
          )}
          {albums.length > 0 && (
            <div>
              <div
                css={{
                  display: "flex",
                  alignItems: "start",
                  marginRight: 10,
                  gap: "20px",
                  fontFamily: "Poppins, sans-serif",
                  marginTop: "11px",
                  flexGrow: "1",
                  flexBasis: "auto",
                  "@media (max-width: 991px)": {
                    maxWidth: "100%",
                    flexWrap: "wrap",
                    fontSize: "40px",
                  },
                }}
              >
                Albums
              </div>
              <div
                css={{
                  backgroundColor: "#000",
                  minHeight: "3px",
                  border: "`1px solid rgba(0, 0, 0, 1)",
                }}
              />

              <Container>
                <List id="artistAlbums">
                  {albums.map((album) => (
                    <ListItem
                      key={album.albumId}
                      onClick={() => {
                        handleNavigation("album", {
                          AlbumId: album.albumId,
                        });
                      }}
                    >
                      <AlbumCard
                        album={album}
                        onClick={() => {
                          handleNavigation("album", {
                            AlbumId: album.albumId,
                          });
                        }}
                        onDelete={() => handleDeleteClick(album, "album")}
                      />
                    </ListItem>
                  ))}
                </List>
              </Container>
            </div>
          )}
        </div>
      </div>
      {isPopupOpen && (
        <Popup
          handleDeleteTrue={handleDeleteConfirmed}
          handleDeleteFalse={() => setIsPopupOpen(false)}
        />
      )}
    </>
  );
}

Artist.propTypes = {
  artistId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  handleNavigation: PropTypes.func.isRequired,
};

export default Artist;
