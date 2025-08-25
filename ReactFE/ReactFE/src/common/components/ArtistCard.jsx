import { css } from "@emotion/react";
import { Box, Button, Card, Modal, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../axiosInstance";
import ImageIcon from "./ImageIcon";

const cardCss = css`
  background-color: #defff2;
  border-radius: 15px;
  color: #000;
  margin-top: 25px;
  padding: 25px 0px;
  font:
    600 16px Poppins,
    sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 230px;
  width: 180px;
  text-align: center;
  position: relative;

  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);

  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
  & p {
    margin: 10px 0px 10px 0px;
    font-size: 18px;
    &.spacingTop {
      margin-top: 25px;
    }
  }
  font-family: "Sansita Swashed", cursive;
  cursor: pointer;
`;

const topLeftImageCss = css`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  z-index: 3;
  &:hover {
    background-color: #c8e6da;
  }
`;
function ArtistCard(props) {
  const artist = props.artist
    ? props.artist
    : {
        artistId: "0",
        artistName: "Missing Artist Name",
      };

  const onNavigate = props.onNavigate;
  const onDelete = props.onDelete;
  const [open, setOpen] = useState(false);

  const successToast = (message) => {
    toast.success(message, {
      position: "bottom-center",
      style: {
        background: "#00BF00",
      },
    });
  };

  const failToast = (message) => {
    toast.error(message, {
      position: "bottom-center",
      style: {
        background: "#D0342C",
      },
    });
  };

  const handleDeleteClick = async () => {
    try {
      await axiosInstance.delete(`/artists/${artist.artistId}`);
      onDelete(artist.artistId);
      successToast("Artist successfully deleted!");
    } catch (error) {
      console.log(error);
      failToast("Artist could not be deleted!");
    }
  };

  return (
    <div
      css={{
        position: "relative",
        width: "fit-content",
        height: "60%",
        "&:hover": {
          transform: "scale(1.05)",
        },
        transition: "transform 0.3s ease-in-out",
      }}
    >
      {localStorage.getItem("isAdmin") == "true" &&
        artist.artistId ===
          parseInt(localStorage.getItem("user-artist-id")) && (
          <div css={topLeftImageCss} onClick={() => setOpen(true)}>
            <img
              src="Icons/icons-for-buttons/delete-icon.png"
              width={24}
              height={24}
            />
          </div>
        )}
      <Card
        css={cardCss}
        onClick={() => {
          onNavigate("artist", {
            artistId: artist.artistId,
          });
        }}
      >
        <ImageIcon type="artist" id={artist.artistId} />
        <p>{artist.artistName}</p>
      </Card>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="reset-password-modal"
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          css={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            padding: "2% 3%",
          }}
        >
          <img src="../../Icons/del_icon.png" />
          <Typography
            id="delete-artist-modal"
            variant="h6"
            component="h2"
            css={{ margin: "5% 0" }}
          >
            Are you sure you want to delete {artist.artistName}?
          </Typography>

          <div css={{ display: "flex", flexDirection: "row", gap: "5rem" }}>
            <Button
              onClick={() => setOpen(false)}
              variant="contained"
              css={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid #fd3f92",
                "&:hover": {
                  backgroundColor: "#fd3f92",
                  border: "1px solid #fd3f92",
                },
              }}
            >
              Go back
            </Button>
            <Button
              onClick={handleDeleteClick}
              variant="contained"
              css={{
                backgroundColor: "#fd3f92",
                color: "black",
                border: "1px solid #fd3f92",
                "&:hover": {
                  backgroundColor: "#fd3f92",
                  border: "1px solid #fd3f92",
                },
              }}
            >
              Delete artist
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

ArtistCard.propTypes = {
  artist: PropTypes.shape({
    artistId: PropTypes.number.isRequired,
    artistName: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default ArtistCard;
