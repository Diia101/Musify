import { css } from "@emotion/react";
import { Box, Button, Menu, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react"; // Added useRef here
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import PlaylistCard from "../common/components/PlaylistCard";
import Popup from "../Song/components/Popup";
import PlaylistCreatePopup from "./PlaylistCreatePopup";
import search from "/Icons/icons-for-buttons/icon-search.png";

const SearchContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 80%;
  max-width: 400px;
`;

const SearchInput = styled(TextField)`
  flex: 1;
  & .MuiFormLabel-root {
    color: black;
  }
  & .MuiInputBase-input {
    color: black;
  }
  & .MuiOutlinedInput-root {
    background-color: white;
    border-color: black;
  }
  & .MuiOutlinedInput-notchedOutline {
    border-color: black;
  }
  & .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: black;
  }
`;
const SearchIcon = styled("img")`
  width: 24px;
  height: 24px;
  margin-left: 8px;
  cursor: pointer;
`;

const PlaylistPageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffdeeb",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "100vh",
  width: "100vw",
  padding: theme.spacing(2),
}));

const AddPlaylistButton = styled(Button)(({}) => ({
  backgroundColor: "#a3e5ff",
  color: "black",
  marginTop: "50px",
  height: "47px",
  marginBottom: "19px",
  border: "20px",
  borderRadius: "20px",
  padding: "10px 15px",
  cursor: "pointer",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  zIndex: 2,
  width: "150px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  fontFamily: "Sansita Swashed",
  textTransform: "none",

  "&:hover": {
    backgroundColor: "#a3e5ff",
    border: "1px solid transparent",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.6)",
    transform: "scale(1.1)",
    transition: "background-color 0.25s, box-shadow 0.25s",
  },
}));

const Playlist = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreatePlaylistPopup, setShowCreatePlaylistPopup] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [playlistToDelete, setPlaylistToDelete] = useState(null);
  // const containerRef = useRef(null); // Reference for Popup
  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = (playlist) => {
    setPlaylistToDelete(playlist);
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
    }
  };

  const handleOpenCreatePlaylistPopup = () => {
    setShowCreatePlaylistPopup(true);
    handleClose();
  };

  const handleCloseCreatePlaylistPopup = () => {
    setShowCreatePlaylistPopup(false);
  };

  const handleSubmitCreatePlaylist = async (data) => {
    try {
      const response = await axiosInstance.post("/playlist", data);
      setPlaylists((prevPlaylists) => [...prevPlaylists, response.data]);
      alert("Playlist created successfully!");
      handleCloseCreatePlaylistPopup();
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axiosInstance.get("/playlists/public", {
          params: { name: searchTerm },
        });
        setPlaylists(response.data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, [searchTerm]);

  return (
    <PlaylistPageContainer>
      <AddPlaylistButton
        onClick={handleOpenCreatePlaylistPopup}
        id="createPlaylistButton"
      >
        Add a playlist
      </AddPlaylistButton>
      <h1>Playlists</h1>
      <SearchContainer>
        <SearchInput
          id="searchPlaylistInput"
          placeholder="Search by playlist name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon src={search} alt="Search Icon" />
      </SearchContainer>
      <Box sx={{ width: "100%", minHeight: 393 }}>
        <div
          css={css`
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            width: 100%;
            gap: 30px;
            cursor: pointer;
          `}
          id="playlistList"
        >
          {playlists
            .filter((playlist) =>
              playlist.name.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .map((playlist) => {
              const formattedPlaylist = {
                playlistId: playlist.playlistId,
                name: playlist.name,
                ownerName: `${playlist.owner.firstname} ${playlist.owner.lastname}`,
              };
              return (
                <PlaylistCard
                  key={playlist.playlistId}
                  playlist={formattedPlaylist}
                  onClick={() => navigate(`/playlist/${playlist.playlistId}`)}
                  onDelete={() => handleDeleteClick(playlist)}
                />
              );
            })}
        </div>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
      </Menu>
      {showCreatePlaylistPopup && (
        <PlaylistCreatePopup
          onClose={handleCloseCreatePlaylistPopup}
          onSubmit={handleSubmitCreatePlaylist}
        />
      )}
      {isPopupOpen && (
        <Popup
          handleDeleteTrue={handleDeleteConfirmed}
          handleDeleteFalse={() => setIsPopupOpen(false)}
        />
      )}
    </PlaylistPageContainer>
  );
};

export default Playlist;
