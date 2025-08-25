import { styled } from "@mui/material";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import CardFactory from "../common/CardFactory";

const Container = styled("div")(({ theme }) => ({
  backgroundColor: "#FFDEEB",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "50px 50px",
  display: "flex",
  flexDirection: "row",
  [theme.breakpoints.down("md")]: {
    padding: "0 20px",
  },
}));
const List = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "2rem",
  width: "80%",
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
  width: "250px",
  height: "100%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

function Search({ searchString, handleNavigation }) {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  const fetchSongs = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`songs/bySongName`, {
        params: {
          searchSongTitle: encodeURIComponent(searchString),
        },
      });
      setSongs(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [searchString]);
  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);
  const fetchPlaylists = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`playlists/public`, {
        params: {
          name: encodeURIComponent(searchString),
        },
      });
      setPlaylists(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [searchString]);
  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);
  const fetchArtists = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`artists/search`, {
        params: {
          searchName: encodeURIComponent(searchString),
        },
      });
      setArtists(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [searchString]);
  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);
  const fetchAlbums = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`albums/search`, {
        params: {
          albumName: encodeURIComponent(searchString),
        },
      });
      setAlbums(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [searchString]);
  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);
  const handleDeleteSong = async () => {
    fetchSongs();
  };
  return (
    <div
      css={{
        display: "flex",
        marginTop: "0px",
        flexDirection: "column",
        fontSize: "55px",
        color: "#000",
        fontWeight: "700",
        height: "100%",
        width: "100%",
        backgroundColor: "#8e7987",
        marginLeft: 0,
        marginRight: 0,
        "@media (max-width: 991px)": {
          maxWidth: "100%",
          marginTop: "40px",
          fontSize: "40px",
        },
      }}
    >
      {songs.length > 0 && (
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
            Songs
          </div>
          <div
            css={{
              backgroundColor: "#000",
              minHeight: "3px",
              border: "`1px solid rgba(0, 0, 0, 1)",
            }}
          />
          <Container>
            <List>
              {songs.map((song) => {
                const artistNames = song.artistsOfASong
                  ? [...song.artistsOfASong]
                      .map((artist) => artist.artistName)
                      .join(" ft. ")
                  : "Unknown Artist";

                const formattedSong = {
                  id: song.id,
                  title: song.title,
                  artist: artistNames,
                };
                return (
                  <ListItem key={song.id} onClick={() => window.open(song.url)}>
                    {CardFactory("song", formattedSong, null, handleDeleteSong)}
                  </ListItem>
                );
              })}
            </List>
          </Container>
        </div>
      )}

      {playlists.length > 0 && (
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
            Playlists
          </div>
          <div
            css={{
              backgroundColor: "#000",
              minHeight: "3px",
              border: "`1px solid rgba(0, 0, 0, 1)",
            }}
          />
          <Container>
            <List>
              {playlists.map((playlist) => {
                const formattedPlaylist = {
                  playlistId: playlist.playlistId,
                  name: playlist.name,
                  ownerName: `${playlist.owner.firstname} ${playlist.owner.lastname}`,
                };
                return (
                  <ListItem
                    key={playlist.playlistId}

                  >
                    {CardFactory("playlist", formattedPlaylist, navigate)}
                  </ListItem>
                );
              })}
            </List>
          </Container>
        </div>
      )}

      {artists.length > 0 && (
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
            Artists
          </div>
          <div
            css={{
              backgroundColor: "#000",
              minHeight: "3px",
              border: "`1px solid rgba(0, 0, 0, 1)",
            }}
          />
          <Container>
            <List>
              {artists.map((artist) => (
                <ListItem
                  key={artist.artistId}
                  onClick={() => {
                    handleNavigation("artist", {
                      artistId: artist.artistId,
                    });
                  }}
                >
                  {CardFactory("artist", artist)}
                </ListItem>
              ))}
            </List>
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
            <List>
              {albums.map((album) => (
                <ListItem
                  key={album.albumId}
                  onClick={() => {
                    handleNavigation("album", {
                      AlbumId: album.albumId,
                    });
                  }}
                >
                  {CardFactory("album", album)}
                </ListItem>
              ))}
            </List>
          </Container>
        </div>
      )}
    </div>
  );
}
Search.propTypes = {
  handleNavigation: PropTypes.func.isRequired,
  searchString: PropTypes.string.isRequired,
};
export default Search;
