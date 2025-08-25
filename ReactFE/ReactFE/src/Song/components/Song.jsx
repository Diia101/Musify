import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import search from "../../../public/Icons/Songs/search.png";
import axiosInstance from "../../axiosInstance";
import CardFactory from "../../common/CardFactory";
import AddSongToPlaylist from "./AddSongToPlaylist";
import "./Animation.css";
import SongCreatePopup from "./SongCreatePopup";

const SearchContainer = styled.div`s
 display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 80%;
  max-width: 500px;
`;

const SearchInput = styled(TextField)`
  flex: 1;
  width: 100%;

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
  margin: 15px;
`;

const SearchIcon = styled("img")`
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: 530px;
  margin-top: -60px;
  align-self: center;
  margin-bottom: 50px;
`;

const SongPageContainer = styled.div`
  background-color: #ffdeeb;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  padding: 10px;
`;

const SongList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 30px;
  cursor: pointer;
  cursor: pointer;
`;

const AddSongButton = styled.button`
  margin-bottom: 20px;
  height: 50px;
  margin-top: 50px;
  justify-content: center;
  margin-bottom: 30px;
  background: #c2a9c6;
  border: none;
  border-radius: 20;
  padding: 10px 15px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 2;
 width: 150px;
  height: 200px
  :hover {
  background-color: green;
  transform: scale(1.25) perspective(1px)

  font-size: 1.5rem;
              box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.6);

`;

const Song = () => {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState(null);
  const fetchSongs = async () => {
    try {
      let response;

      response = await axiosInstance.get(`/songs/bySongName`, {
        params: { searchSongTitle: searchTerm },
      });

      setSongs(response.data);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };
  useEffect(() => {
    fetchSongs();
  }, [searchTerm]);

  const handleDeleteSong = async (songId) => {
    setSongs(songs.filter((song) => song.id !== songId));
    fetchSongs();
  };

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSubmitNewSong = async (newSong) => {
    try {
      const userArtistId = localStorage.getItem("user-artist-id");
      if (!userArtistId) return;

      newSong.artistIds = [parseInt(userArtistId, 10)];
      console.log("aa:", parseInt(userArtistId, 10), " ", newSong.artistIds);
      await axiosInstance.post(`/songs`, newSong);
      setShowCreatePopup(false);
      const response = await axiosInstance.get(`/songs/bySongName`, {
        params: { searchSongTitle: searchTerm },
      });
      setSongs(response.data);
    } catch (error) {
      console.error("Error adding song:", error);
    }
  };

  const handleAddToPlaylistClick = (songId) => {
    setSelectedSongId(songId);
    setShowAddToPlaylist(true);
  };

  const handleAddToPlaylist = async (playlistId) => {
    if (selectedSongId) {
      try {
        await axiosInstance.put(
          `/playlists/${playlistId}/song/${selectedSongId}`,
        );
        setShowAddToPlaylist(false);
        setSelectedSongId(null);
        fetchSongs();
      } catch (error) {
        console.error("Error adding song to playlist:", error);
      }
    }
  };
  return (
    <SongPageContainer>
      {localStorage.getItem("isAdmin") == "true" && (
        <img
          id="addSongButton"
          onClick={() => setShowCreatePopup(true)}
          src="/Icons/icons-for-buttons/add-to-playlist.png"
          css={{
            aspectRatio: "1",
            marginTop: "10px",
            objectFit: "cover",
            objectPosition: "center",
            width: "50px",
            height: "50px",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            cursor: "pointer",
            "&:hover": {
              transform: "scale(1.1)",
              boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)",
            },
          }}
        />
      )}
      <h1>Songs</h1>
      <SearchContainer>
        <SearchInput
          label="Search by song title"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon src={search} alt="Search Icon" />
      </SearchContainer>
      <div className="sound-wave">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <SongList id="songList">
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => {
            console.log(song);
            const artistNames = song.artistsOfASong
              ? song.artistsOfASong
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
              <div
                key={song.id}
                css={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {CardFactory("song", formattedSong, null, handleDeleteSong)}
                <AddSongButton
                  onClick={() => handleAddToPlaylistClick(song.id)}
                  id="addSongToPlaylistButton"
                >
                  Add to Playlist
                </AddSongButton>
              </div>
            );
          })
        ) : (
          <p>No songs found</p>
        )}
      </SongList>
      {showCreatePopup && (
        <SongCreatePopup
          onClose={() => setShowCreatePopup(false)}
          onSubmit={handleSubmitNewSong}
        />
      )}
      {showAddToPlaylist && (
        <AddSongToPlaylist
          onClose={() => setShowAddToPlaylist(false)}
          onSubmit={handleAddToPlaylist}
        />
      )}
    </SongPageContainer>
  );
};
export default Song;
