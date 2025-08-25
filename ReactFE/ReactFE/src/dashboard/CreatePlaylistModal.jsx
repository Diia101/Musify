import { css } from "@emotion/react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  TextField,
} from "@mui/material";
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

const CreatePlaylistModal = ({ open, onClose, onCreate }) => {
  const [createPlaylist, setCreatePlaylist] = useState({
    name: "",
    isPublic: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreatePlaylist({ ...createPlaylist, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setCreatePlaylist({ ...createPlaylist, isPublic: e.target.checked });
  };

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    try {
      const newPlaylist = {
        name: createPlaylist.name,
        isPublic: createPlaylist.isPublic,
      };
      await onCreate(newPlaylist);
      onClose();
    } catch (error) {
      console.error("error creating playlist", error);
    }
  };
  return (
    <Modal open={open} onClose={onClose} id="createPlaylistModal">
      <Box
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
        <h2>Create New Playlist</h2>
        <TextField
          id="playlistNameField"
          label="Playlist Name"
          name="name"
          value={createPlaylist.name}
          onChange={handleInputChange}
          fullWidth
        />
        <FormControlLabel
          control={
            <Checkbox
              id="checkBoxPublic"
              style={{ color: "#d1b9d8" }}
              checked={createPlaylist.isPublic}
              onChange={handleCheckboxChange}
            />
          }
          label="Public"
        />
        <Button
          variant="contained"
          css={buttonStyle}
          onClick={handleCreatePlaylist}
        >
          Create
        </Button>
      </Box>
    </Modal>
  );
};

export default CreatePlaylistModal;

CreatePlaylistModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};
