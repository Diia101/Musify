import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React, { useContext } from "react";

function VerticalNavBar({ handleNavigation }) {
  const [navOpen, setNavOpen] = React.useState(false);

  const handleMouseEnter = () => {
    setNavOpen(true);
  };
  const handleMouseLeave = () => {
    setNavOpen(false);
  };

  return (
    <div
      css={{
        display: "flex",
        height: "100%",
        transition: "width 0.3s",
        backgroundColor: "#D1B9D8",
        width: navOpen ? "240px" : "80px",
        overflow: "hidden",
        position: "relative",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          padding: navOpen ? "18px 0px" : "18px 0",
          transition: "padding 0.3s",
          width: "100%",
        }}
      >
        <Box
          id="navBarHomeButton"
          css={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            cursor: "pointer",
            width: "100%",
            "&:hover": {
              backgroundColor: "#ad96b0",
            },
          }}
          onClick={() => handleNavigation("home")}
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/db8e2abe59affe3691490923bfa5d6630f0d6e2a52a67fbbda6bb2e8f1e2c56a?"
            css={{
              aspectRatio: "1.14",
              margin: "10px",
              objectFit: "auto",
              objectPosition: "center",
              width: "60px",
            }}
          />
          {navOpen && (
            <Box
              css={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "22px",
                fontWeight: "bold",
                color: "#000",
                userSelect: "none",
              }}
            >
              Home
            </Box>
          )}
        </Box>
        <Box
          id="navBarSongButton"
          css={{
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
            gap: "20px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#ad96b0",
            },
          }}
          onClick={() => handleNavigation("songs")}
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b0b694b2e461556cbea941481d2e5d6c49ac659ac10106658638f8d671ff12bb?"
            css={{
              aspectRatio: "1.14",
              margin: "10px",
              objectFit: "auto",
              objectPosition: "center",
              width: "60px",
            }}
          />
          {navOpen && (
            <Box
              css={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "22px",
                fontWeight: "bold",
                color: "#000",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              Songs
            </Box>
          )}
        </Box>
        <Box
          id="navBarPlaylistButton"
          css={{
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
            gap: "20px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#ad96b0",
            },
          }}
          onClick={() => handleNavigation("playlists")}
        >
          <img
            loading="lazy"
            src="/Icons/Playlists/icon-playlist.png"
            css={{
              aspectRatio: "1.14",
              margin: "8px",
              objectFit: "auto",
              objectPosition: "center",
              width: "65px",
            }}
          />
          {navOpen && (
            <Box
              css={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "22px",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              Playlists
            </Box>
          )}
        </Box>
        <Box
          id="navBarAlbumButton"
          css={{
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
            gap: "20px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#ad96b0",
            },
          }}
          onClick={() => handleNavigation("albums")}
        >
          <img
            loading="lazy"
            src="/Icons/Albums/icon-album.png"
            css={{
              aspectRatio: "1.14",
              margin: "5px",
              objectFit: "auto",
              objectPosition: "center",
              width: "70px",
              height: "70px",
            }}
          />
          {navOpen && (
            <Box
              css={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "22px",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              Albums
            </Box>
          )}
        </Box>
        <Box
          id="navBarArtistButton"
          css={{
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
            gap: "20px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#ad96b0",
            },
          }}
          onClick={() => handleNavigation("artists")}
        >
          <img
            loading="lazy"
            src="/Icons/Artists/icon-artist.png"
            css={{
              aspectRatio: "1.14",
              margin: "5px",
              objectFit: "auto",
              objectPosition: "center",
              width: "67px",
            }}
          />
          {navOpen && (
            <Box
              css={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "22px",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              Artists
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
        </Box>
      </div>
    </div>
  );
}

VerticalNavBar.propTypes = {
  handleNavigation: PropTypes.func.isRequired,
};

export default VerticalNavBar;
