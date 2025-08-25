import { css } from "@emotion/react";
import { Box, Button, Modal, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

const buttonStyle = css`
  background-color: #d1b9d8;
  color: #fff;
  border-radius: 8px;
  padding: 12px 24px;
  text-transform: uppercase;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background-color: #b59eb5;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const CreateAlbumModal = ({ open, onClose, onCreate, artistId }) => {
  const [createAlbum, setCreateAlbum] = useState({
    title: "",
    description: "",
    genre: "",
    releaseDate: "",
    label: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateAlbum({ ...createAlbum, [name]: value });
  };

  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    try {
      const newAlbum = {
        title: createAlbum.title,
        description: createAlbum.description,
        artistId: artistId,
        genre: createAlbum.genre,
        releaseDate: createAlbum.releaseDate,
        label: createAlbum.label,
      };
      await onCreate(newAlbum);
      onClose();
    } catch (error) {
      console.error("error creating album", error);
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        id="addAlbumPopUp"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "#defff2",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <h2>Create New Album</h2>
        <TextField
          label="Album Title"
          name="title"
          id="albumTitle"
          value={createAlbum.title}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Description"
          name="description"
          id="description"
          value={createAlbum.description}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Genre"
          name="genre"
          id="genre"
          value={createAlbum.genre}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Release Date"
          name="releaseDate"
          id="releaseDate"
          type="date"
          value={createAlbum.releaseDate}
          onChange={handleInputChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Label"
          name="label"
          id="label"
          value={createAlbum.label}
          onChange={handleInputChange}
          fullWidth
        />

        <Button
          id="createButton"
          variant="contained"
          css={buttonStyle}
          onClick={handleCreateAlbum}
        >
          Create
        </Button>
      </Box>
    </Modal>
  );
};
CreateAlbumModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  artistId: PropTypes.number.isRequired,
};
export default CreateAlbumModal;
