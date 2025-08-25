import {
  Button,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  styled,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../Song/components/Popup";
import axiosInstance from "../axiosInstance";
import AlbumCard from "../common/components/AlbumCard";
import PlaylistCard from "../common/components/PlaylistCard";
import CreateAlbumModal from "./CreateAlbumModal";
import CreatePlaylistModal from "./CreatePlaylistModal";

const MyPlaylistContainer = styled("div")(({ theme }) => ({
  backgroundColor: "#FFDEEB",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "50px 50px",
  margin: "0px 20px",
  display: "flex",
  flexDirection: "row",
  [theme.breakpoints.down("md")]: {
    padding: "0 20px",
  },
}));

const MyPlaylistList = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "2rem",
  width: "80%",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "nowrap",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },
}));

const MyPlaylistListItem = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  lineHeight: "normal",
  width: "250px",
  height: "100%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  cursor: "pointer",
}));

const TransparentButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  boxShadow: "none",
  minWidth: "50px",
  height: "300px",
  "&:hover": {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  border: "none",
  padding: 0,
  [theme.breakpoints.down("md")]: {
    height: "auto",
  },
}));

const actions = [
  {
    icon: "/Icons/Playlists/icon-playlist-1.png",
    name: "Playlists",
    route: "playlists",
    width: "100px",
    height: "100px",
  },
  {
    icon: "/Icons/Artists/icon-artist-1.png",
    name: "Artists",
    route: "artists",
    width: "75px",
    height: "75px",
  },
  {
    icon: "/Icons/Albums/icon-album-1.png",
    name: "Albums",
    route: "albums",
    width: "75px",
    height: "75px",
  },
  {
    icon: "/Icons/Songs/icon-song-1.png",
    name: "Songs",
    route: "songs",
    width: "75px",
    height: "75px",
  },
];
const CustomSpeedDialAction = styled(SpeedDialAction)`
  .MuiSpeedDialAction-fab {
    margin: 10px;
  }

  .MuiSpeedDialAction-fab > .MuiFab-root {
    width: 100px;
    height: 100px;
  }

  .MuiSpeedDialAction-staticTooltipLabel {
    margin-top: 20px;
  }
  .MuiSpeedDialAction-staticTooltip {
    margin-top: 0px;
  }
  .MuiSpeedDialIcon-openIconOpen {
    margin-top: 20px;
  }
`;

const StyledSpeedDial = styled(SpeedDial)`
  position: relative;
  top: 20px;
  left: 0;
  width: 100%;
  margin-left: 25px;

  gap: 40px;

  .MuiSpeedDial-fab {
    width: 100px;
    height: 100px;
    background: #defff2;
    color: #d1b9d8;
    position: relative;
  }

  .MuiSpeedDialIcon-icon {
    position: absolute;
    font-size: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .MuiSpeedDialIcon-icon:hover {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  .MuiSpeedDial-actions {
    top: 50%;
    left: 50%;
    gap: 100px;
    width: 100%;
  }
`;

function Dashboard({ handleNavigation }) {
  const [playlists, setPlaylists] = useState([]);
  const [startIndex, setIndex] = useState(0);
  const visibleCount = 3;
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenPlaylist, setIsModalOpenPlaylist] = useState(false);
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [startIndexAlbum, setIndexAlbum] = useState(0);
  const [playlistToDelete, setPlaylistToDelete] = useState(null);
  const [albumToDelete, setAlbumToDelete] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleDeleteClick = (playlist) => {
    setPlaylistToDelete(playlist);
    setIsPopupOpen(true);
  };

  const handleDeleteClickAlbum = (album) => {
    setAlbumToDelete(album);
    setIsPopupOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (playlistToDelete) {
      try {
        await axiosInstance.delete(`/playlists/${playlistToDelete.playlistId}`);
        setPlaylists((prevPlaylists) =>
          prevPlaylists.filter(
            (pl) => pl.playlistId !== playlistToDelete.playlistId,
          ),
        );
        setIsPopupOpen(false);
        setPlaylistToDelete(null);
      } catch (error) {
        console.error("Error deleting playlist:", error);
      }
    } else if (albumToDelete) {
      try {
        await axiosInstance.delete(`/albums/${albumToDelete.albumId}`);
        setAlbums((prevAlbums) =>
          prevAlbums.filter((al) => al.albumId !== albumToDelete.albumId),
        );
        setIsPopupOpen(false);
        setAlbumToDelete(null);
      } catch (error) {
        console.error("Error deleting album:", error);
      }
    }
  };

  const fetchMyPlaylist = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`playlists/followed`);
      setPlaylists(response.data);
    } catch (error) {
      console.error("Error fetching playlists: ", error);
    }
  }, []);
  useEffect(() => {
    fetchMyPlaylist();
  }, [fetchMyPlaylist]);

  const fetchArtist = useCallback(async () => {

    if (localStorage.getItem("artist-flag") == "true") {
      try {
        const response = await axiosInstance.get("artists/user");
        setArtist(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error("Artist not found");
        } else {
          console.error("Error fetching artist: ", error);
        }
      }
    }
  }, []);

  const fetchMyAlbums = useCallback(async () => {
    if (!artist) return;
    try {
      const response = await axiosInstance.get(
        `artists/${artist.artistId}/albums`,
      );
      setAlbums(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [artist]);
  useEffect(() => {
    fetchArtist();
  }, [fetchArtist]);
  useEffect(() => {
    if (artist) {
      fetchMyAlbums();
    }
  }, [artist, fetchMyAlbums]);

  const handleNext = () => {
    if (playlists.length < visibleCount) return;
    setIndex((prevIndex) => (prevIndex + 1) % playlists.length);
  };
  const handlePrev = () => {
    if (playlists.length < visibleCount) return;
    setIndex(
      (prevIndex) => (prevIndex - 1 + playlists.length) % playlists.length,
    );
  };
  const handleNextAlbum = () => {
    if (albums.length < visibleCount) return;
    setIndexAlbum((prevIndex) => (prevIndex + 1) % albums.length);
  };
  const handlePrevAlbum = () => {
    if (albums.length < visibleCount) return;
    setIndexAlbum(
      (prevIndex) => (prevIndex - 1 + albums.length) % albums.length,
    );
  };
  const getVisiblePlaylists = () => {
    if (playlists.length < visibleCount) return playlists;
    return playlists
      .slice(startIndex, startIndex + visibleCount)
      .concat(
        playlists.slice(
          0,
          Math.max(0, startIndex + visibleCount - playlists.length),
        ),
      );
  };
  const getVisibleAlbums = () => {
    if (albums.length < visibleCount) return albums;
    return albums
      .slice(startIndexAlbum, startIndexAlbum + visibleCount)
      .concat(
        albums.slice(
          0,
          Math.max(0, startIndexAlbum + visibleCount - albums.length),
        ),
      );
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenModalPlaylist = () => {
    setIsModalOpenPlaylist(true);
  };
  const handleCloseModalPlaylist = () => {
    setIsModalOpenPlaylist(false);
  };
  const handleCreatePlaylist = async (newPlaylist) => {
    try {
      await axiosInstance.post("playlists", newPlaylist);
      await fetchMyPlaylist();
    } catch (error) {
      console.error("Error creating playlist", error);
    }
  };
  const handleCreateAlbum = async (newAlbum) => {
    try {
      await axiosInstance.post("albums", newAlbum);
      await fetchMyAlbums();
    } catch (error) {
      console.error("Error creating albums", error);
    }
  };

  Dashboard.propTypes = {
    handleNavigation: PropTypes.func.isRequired,
  };
  return (
    <>
      <div
        id="homePage"
        css={{
          display: "flex",
          flexDirection: "column",
          fontSize: "55px",
          color: "#000",
          fontWeight: "700",
          height: "100%",
          width: "100%",
          backgroundColor: "#fff5f9",
          overflowX: "hidden",
          "@media (max-width: 991px)": {
            maxWidth: "100%",
            marginTop: "40px",
            fontSize: "40px",
          },
        }}
      >
        {/* My Playlist */}
        <div>
          <div
            css={{
              display: "flex",
              alignItems: "start",
              marginRight: 20,
              marginLeft: 30,
              gap: "20px",
              "@media (max-width: 991px)": {
                maxWidth: "100%",
                flexWrap: "wrap",
                fontSize: "40px",
              },
            }}
          >
            <div
              css={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "45px",
                marginTop: "11px",
                flexGrow: "1",
                flexBasis: "auto",
                "@media (max-width: 991px)": {
                  fontSize: "40px",
                },
              }}
            >
              My Playlists
            </div>
            <img
              id="createPlaylistButton"
              src="/Icons/icons-for-buttons/icon-create-playlist.png"
              css={{
                transform: "scale(0.80)",
                transformOrigin: "top left",
                backgroundColor: "#fff",
                aspectRatio: "1",
                marginTop: "10px",
                objectFit: "cover",
                objectPosition: "center",
                width: "70px",
                height: "70px",
                borderRadius: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(0.9)",
                  boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)",
                },
              }}
              onClick={handleOpenModalPlaylist}
              alt="Create Playlist"
            />
          </div>
          <div
            css={{
              backgroundColor: "#000",
              minHeight: "3px",
              marginLeft: 20,
              marginRight: 20,
              border: "1px solid rgba(0, 0, 0, 1)",
            }}
          />
          <MyPlaylistContainer>
            <TransparentButton
              onClick={handlePrev}
              disabled={playlists.length < visibleCount}
            >
              <Typography variant="h4">{"<"}</Typography>
            </TransparentButton>
            <MyPlaylistList>
              {getVisiblePlaylists().length > 0 ? (
                getVisiblePlaylists().map((playlist) => (
                  <MyPlaylistListItem
                    key={playlist.playlistId}
                    css={{
                      transform: "scale(0.90)",
                      transformOrigin: "top left",
                    }}
                  >
                    <PlaylistCard
                      playlist={{
                        playlistId: playlist.playlistId,
                        name: playlist.name,
                        ownerName: `${playlist.owner.firstname} ${playlist.owner.lastname}`,
                      }}
                      onClick={() =>
                        navigate(`/playlist/${playlist.playlistId}`)
                      }
                      onDelete={() => handleDeleteClick(playlist)}
                    />
                  </MyPlaylistListItem>
                ))
              ) : (
                <div>
                  You have no Playlists. If you want to create one,{" "}
                  <button
                    onClick={handleOpenModalPlaylist}
                    style={{
                      color: "blue",
                      textDecoration: "underline",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    click here
                  </button>
                  .
                </div>
              )}
            </MyPlaylistList>
            <CreatePlaylistModal
              open={isModalOpenPlaylist}
              onClose={handleCloseModalPlaylist}
              onCreate={handleCreatePlaylist}
            />
            <TransparentButton
              onClick={handleNext}
              disabled={playlists.length < visibleCount}
            >
              <Typography variant="h4">{">"}</Typography>
            </TransparentButton>
          </MyPlaylistContainer>
        </div>

        {artist && (
          <>
            <div
              css={{
                display: "flex",
                alignItems: "start",
                marginRight: 20,
                marginLeft: 30,
                gap: "20px",
                "@media (max-width: 991px)": {
                  maxWidth: "100%",
                  flexWrap: "wrap",
                  fontSize: "40px",
                },
              }}
            >
              <div
                css={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "47px",
                  marginTop: "11px",
                  flexGrow: "1",
                  flexBasis: "auto",
                  "@media (max-width: 991px)": {
                    fontSize: "40px",
                  },
                }}
              >
                My Albums
              </div>
              <img
                src="/Icons/Albums/icon-add-album.png"
                id="addAlbumButton"
                css={{
                  transform: "scale(0.75)",
                  transformOrigin: "top left",
                  aspectRatio: "1",
                  marginTop: "10px",
                  objectFit: "cover",
                  objectPosition: "center",
                  width: "70px",
                  height: "70px",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(0.85)",
                    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)",
                  },
                }}
                onClick={handleOpenModal}
                alt="Add Album"
              />
            </div>
            <div
              css={{
                backgroundColor: "#000",
                minHeight: "3px",
                marginLeft: 20,
                marginRight: 20,
                border: "1px solid rgba(0, 0, 0, 1)",
              }}
            />
            <MyPlaylistContainer id="albumList">
              <TransparentButton
                onClick={handlePrevAlbum}
                disabled={albums.length < visibleCount}
              >
                <Typography variant="h4">{"<"}</Typography>
              </TransparentButton>
              <MyPlaylistList>
                {getVisibleAlbums().length > 0 ? (
                  getVisibleAlbums().map((album) => (
                    <MyPlaylistListItem
                      key={album.albumId}
                      css={{
                        transform: "scale(0.90)",
                        transformOrigin: "top left",
                      }}
                    >
                      <AlbumCard
                        album={album}
                        onClick={() => {
                          handleNavigation("album", {
                            AlbumId: album.albumId,
                          });
                        }}
                        onDelete={() => handleDeleteClickAlbum(album)}
                      />
                    </MyPlaylistListItem>
                  ))
                ) : (
                  <div>
                    You have no Albums. If you want to create one,{" "}
                    <button
                      onClick={handleOpenModal}
                      style={{
                        color: "blue",
                        textDecoration: "underline",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      click here
                    </button>
                    .
                  </div>
                )}
              </MyPlaylistList>
              <CreateAlbumModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onCreate={handleCreateAlbum}
                artistId={artist.artistId}
              />
              <TransparentButton
                onClick={handleNextAlbum}
                disabled={albums.length < visibleCount}
              >
                <Typography variant="h4">{">"}</Typography>
              </TransparentButton>
            </MyPlaylistContainer>
          </>
        )}

        <div>
          <div
            css={{
              display: "flex",
              alignItems: "start",
              marginLeft: 30,
              marginRight: 20,
              gap: "20px",
              "@media (max-width: 991px)": {
                maxWidth: "100%",
                flexWrap: "wrap",
                fontSize: "40px",
              },
            }}
          >
            <div
              css={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "49px",
                marginTop: "11px",
                flexGrow: "1",
                flexBasis: "auto",
                "@media (max-width: 991px)": {
                  fontSize: "40px",
                },
              }}
            >
              See what is new
            </div>
          </div>
          <div
            css={{
              backgroundColor: "#000",
              minHeight: "3px",
              marginLeft: 20,
              marginRight: 20,
              border: "1px solid rgba(0, 0, 0, 1)",
            }}
          />
          <StyledSpeedDial
            ariaLabel="SpeedDial"
            icon={<SpeedDialIcon />}
            direction={"right"}
          >
            {actions.map((action) => (
              <CustomSpeedDialAction
                key={action.name}
                icon={
                  <img
                    src={action.icon}
                    alt={action.name}
                    style={{ width: action.width, height: action.height }}
                  />
                }
                tooltipTitle={action.name}
                onClick={() => handleNavigation(action.route)}
              />
            ))}
          </StyledSpeedDial>
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
export default Dashboard;
