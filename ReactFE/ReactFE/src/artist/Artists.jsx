import { css } from "@emotion/react";
import { Box, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../axiosInstance";
import CardFactory from "../common/CardFactory";
import ArtistCreatePopup from "./ArtistCreatePopup";
import search from "/Icons/icons-for-buttons/icon-search.png";

const AddArtistButton = styled.button`
  margin-bottom: 19px;
  height: 47px;
  margin-top: 50px;
  background: #a3e5ff;
  color: black;
  border: none;
  border-radius: 20px;
  padding: 10px 15px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 2;
  width: 150px;
  transition:
    background-color 0.25s,
    box-shadow 0.25s,
    transform 0.25s;

  &:hover {
    background-color: #a3e5ff;
    border: 1px solid transparent;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
    transform: scale(1.1);
  }
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

const PageContainer = styled(Box)(() => ({
  backgroundColor: "#ffdeeb",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  minHeight: "100vh",
  width: "100vw",
  padding: "40px 20px",
  gap: "30px",
}));


const Artists = ({ handleNavigation }) => {
  const [artists, setArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreatePopup, setShowCreatePopup] = useState(false);

  const handleSubmitNewArtist = async (newArtist) => {
    try {
      const formattedArtist = {
        artistName: newArtist.artistName,
        location: newArtist.location,
        activePeriod: parseInt(newArtist.activePeriod, 10),
        isPerson: newArtist.isPerson === "true",
        userIds: Array.isArray(newArtist.userIds.split(",").map(Number))
          ? newArtist.userIds.split(",").map((id) => parseInt(id, 10))
          : [parseInt(newArtist.userIds, 10)],
      };

      await axiosInstance.post(`/artists`, formattedArtist);

      const response = await axiosInstance.get("/artists");
      setArtists(response.data);

      setShowCreatePopup(false);
    } catch (error) {
      console.error("Error adding artist:", error);
    }
  };

  const fetchArtists = async () => {
    try {
      const response = await axiosInstance.get("/artists");
      setArtists(response.data);
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };
  useEffect(() => {
    fetchArtists();
  }, [searchTerm]);

  const handleDeleteArtist = async (artistId) => {
    setArtists(artists.filter((artist) => artist.artistId !== artistId));
    fetchArtists();
  };

  return (
    <PageContainer id="artistPage">
      {localStorage.getItem("isAdmin") === "true" && (
        <AddArtistButton onClick={() => setShowCreatePopup(true)}>
          Create Artist
        </AddArtistButton>
      )}
      <h1>Artists</h1>
      <Box
        id="#searchInput"
        display="flex"
        alignItems="center"
        marginBottom={2}
      >
        <SearchInput
          id="searchArtist"
          placeholder="Search by artist name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon src={search} alt="Search Icon" />
      </Box>
      <Box id="artistList" sx={{ width: "100%", minHeight: 393 }}>
        <div
          css={css`
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            width: 100%;
            gap: 30px;
          `}
        >
          {artists
            .filter((artist) =>
              artist.artistName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()),
            )
            .map((artist) => {
              return (
                <div id="artistCard" key={artist.artistId}>
                  {CardFactory(
                    "artist",
                    artist,
                    handleNavigation,
                    handleDeleteArtist,
                  )}
                </div>
              );
            })}
        </div>
      </Box>
      {showCreatePopup && (
        <ArtistCreatePopup
          onClose={() => setShowCreatePopup(false)}
          onSubmit={handleSubmitNewArtist}
        />
      )}
    </PageContainer>
  );
};

Artists.propTypes = {
  handleNavigation: PropTypes.func.isRequired,
};

export default Artists;
