import PropTypes from "prop-types";
import styled from "styled-components";

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const PopupContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const PopupButton = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:first-child {
    background-color: #d9534f;
    color: white;
  }

  &:last-child {
    background-color: #5bc0de;
    color: white;
  }
`;
const Popup = ({ handleDeleteTrue, handleDeleteFalse }) => {
  return (
    <PopupContainer id="popupDelete">
      <PopupContent>
        <h2>Are you sure you want to delete this?</h2>
        <div>
          <PopupButton id="yesDeleteAlbum" onClick={handleDeleteTrue}>
            Yes
          </PopupButton>
          <PopupButton id="noDeleteAlbum" onClick={handleDeleteFalse}>
            No
          </PopupButton>
        </div>
      </PopupContent>
    </PopupContainer>
  );
};
Popup.propTypes = {
  handleDeleteTrue: PropTypes.func.isRequired,
  handleDeleteFalse: PropTypes.func.isRequired,
};

export default Popup;
