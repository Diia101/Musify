import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";

const DialogBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  z-index: 2;
  display: ${({ show }) => (show ? "block" : "none")};
  animation: fadeIn 1s ease both;
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 20px;
  border: 0;
  box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.1);
  padding: 2rem 3rem;
  max-width: 400px;
  z-index: 3;
  animation: fadeIn 1s ease both;

  h2 {
    font-weight: 600;
    font-size: 2rem;
    padding-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.3rem;
    padding: 0.5rem 0;
  }

  .close-button {
    position: absolute;
    top: 15px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const Button52 = styled.button`
  font-size: 16px;
  font-weight: 200;
  letter-spacing: 1px;
  padding: 13px 20px 13px;
  outline: 0;
  border: 1px solid black;
  cursor: pointer;
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &::after {
    content: "";
    background-color: #ffe54c;
    width: 100%;
    z-index: -1;
    position: absolute;
    height: 100%;
    top: 7px;
    left: 7px;
    transition: 0.2s;
  }

  &:hover::after {
    top: 0px;
    left: 0px;
  }

  @media (min-width: 768px) {
    padding: 13px 50px 13px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: rgb(10, 11, 14);
  color: white;
  border: none;
  padding: 13px 25px;
  border-radius: 17px;
  cursor: pointer;
  font-size: 0.8rem;
  transition:
    background-color 0.1s ease,
    transform 0.25s ease;
  box-shadow: 0 10px 20px -10px rgba(29, 92, 255, 0.5);

  &:hover {
    background-color: #d1b9d8;
    box-shadow: 0 20px 20px -10px rgba(29, 92, 255, 0.5);
    transform: translateY(-5px);
  }
`;

const ArtistCreatePopup = ({ onClose, onSubmit }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [artist, setArtist] = useState({
    artistName: "",
    location: "",
    activePeriod: "",
    isPerson: "true",
    userIds: "",
  });

  const handleSubmit = () => {
    if (!artist.artistName || !artist.userIds) {
      setErrorMessage(
        "Artist name and at least one associated user are required.",
      );
      return;
    }

    setErrorMessage("");
    onSubmit(artist);
    setSuccessMessage("Artist successfully saved!");
    setArtist({
      artistName: "",
      location: "",
      activePeriod: "",
      isPerson: "true",
      userIds: "",
    });
  };

  return (
    <>
      <DialogBackdrop
        show={!!successMessage || !!errorMessage}
        onClick={onClose}
      />
      <PopupContainer>
        <Button52 onClick={onClose} aria-label="Close">
          ❌
        </Button52>
        {!successMessage ? (
          <>
            <h2>Add a new artist</h2>
            {errorMessage && <p>{errorMessage}</p>}

            <FormGroup>
              <Label htmlFor="artistName">Artist Name</Label>
              <Input
                id="artistName"
                type="text"
                value={artist.artistName}
                onChange={(e) =>
                  setArtist({ ...artist, artistName: e.target.value })
                }
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                type="text"
                value={artist.location}
                onChange={(e) =>
                  setArtist({ ...artist, location: e.target.value })
                }
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="activePeriod">Active Period (Years)</Label>
              <Input
                id="activePeriod"
                type="number"
                value={artist.activePeriod}
                onChange={(e) =>
                  setArtist({ ...artist, activePeriod: e.target.value })
                }
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="isPerson">Is this a single person?</Label>
              <Select
                id="isPerson"
                value={artist.isPerson}
                onChange={(e) =>
                  setArtist({ ...artist, isPerson: e.target.value })
                }
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="userIds">Associated Users</Label>
              <Input
                id="userIds"
                type="text"
                placeholder="Enter user IDs separated by commas"
                value={artist.userIds}
                onChange={(e) =>
                  setArtist({ ...artist, userIds: e.target.value })
                }
              />
            </FormGroup>

            <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
          </>
        ) : (
          <>
            <h2>Success</h2>
            <p>{successMessage}</p>
          </>
        )}
      </PopupContainer>
    </>
  );
};

ArtistCreatePopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ArtistCreatePopup;
