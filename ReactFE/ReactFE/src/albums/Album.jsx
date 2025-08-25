import { css } from "@emotion/react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../axiosInstance";
import AlbumCard from "../common/components/AlbumCard";
import Popup from "../Song/components/Popup";

const AlbumPageContainer = styled.div`
  background-color: #ffdeeb;
  display: flex;
  justify-content: top;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  text-align: center;
  padding: 20px;
  margin: 0;
  box-sizing: border-box;
  overflow: hidden;
  gap: 70px;
  font-family: "Sansita Swashed", cursive;
`;

const AlbumList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  font-family: "Sansita Swashed", cursive;
  gap: 30px;
`;

const MyPlaylistListItem = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  lineHeight: "normal",
  width: "fit-content",
  height: "fit-content",
  cursor: "pointer",
  fontFamily: "'Sansita Swashed', cursive",
}));

const Album = ({ handleNavigation }) => {
  const [albums, setAlbums] = useState([]);
  const [genre, setGenre] = useState("ALL");
  const [genres, setGenres] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [albumToDelete, setAlbumToDelete] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        let response;
        let albumList = null;
        response = await axiosInstance.get(`/albums`);
        const distinctGenres = [
          ...new Set(response.data.map((album) => album.genre)),
        ];
        setGenres(["ALL", ...distinctGenres]);
        if (genre === "ALL") albumList = response.data;
        else albumList = response.data.filter((album) => album.genre === genre);
        setAlbums(albumList);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchAlbums();
  }, [genre]);

  const handleGenreClick = (genre) => {
    setGenre(genre);
  };

  const handleDeleteClick = (album) => {
    setAlbumToDelete(album);
    setIsPopupOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (albumToDelete) {
      try {
        await axiosInstance.delete(`/albums/${albumToDelete.albumId}`);
        setAlbums((prevAlbums) =>
          prevAlbums.filter((alb) => alb.albumId !== albumToDelete.albumId),
        );
        setIsPopupOpen(false);
        setAlbumToDelete(null);
      } catch (error) {
        console.error("Error deleting album:", error);
      }
    }
  };

  return (
    <AlbumPageContainer id="albumsPage">
      <h1>Albums</h1>
      <h2
        css={css`
          margin-bottom: -20px;
          margin-top: 20px;
        `}
      >
        Filter Albums by genre:
      </h2>
      <div
        css={css`
          display: flex;
          gap: 80px;
          flex-direction: row;
          width: 100%;
          height: 40px;
          align-items: center;
          justify-content: center;
        `}
      >
        {genres.map((genre, index) => (
          <Button
            key={index}
            id={`filterButton-${genre}`}
            onClick={() => handleGenreClick(genre)}
            css={css`
              border-radius: 12px;
              padding: 17px 35px;
              background-color: #fd3f92;
              color: white;
              &:hover {
                background-color: #e73a76;
              }
            `}
          >
            {genre}
          </Button>
        ))}
      </div>
      <AlbumList id="albums">
        {albums.map((album) => (
          <MyPlaylistListItem
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
              onDelete={() => handleDeleteClick(album)}
            />
          </MyPlaylistListItem>
        ))}
      </AlbumList>
      {isPopupOpen && (
        <Popup
          handleDeleteTrue={handleDeleteConfirmed}
          handleDeleteFalse={() => setIsPopupOpen(false)}
        />
      )}
    </AlbumPageContainer>
  );
};

Album.propTypes = {
  handleNavigation: PropTypes.func.isRequired,
};

export default Album;
