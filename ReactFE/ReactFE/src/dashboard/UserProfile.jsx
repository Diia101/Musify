import { css } from "@emotion/react";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { PropTypes } from "prop-types";
import React from "react";
import axiosInstance from "../axiosInstance";

const userProfileCss = css`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const circleCss = css`
  border: 1px solid #000;
  border-radius: 50px;
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font:
    bold 20px "Times New Roman",
    serif;
  background-color: #bde0fe;
`;

const smallDataDiv = css`
  height: fit-content;
  display: flex;
  flex-direction: column;

  & p {
    height: fit-content;
    margin: 0;
  }
`;

function UserProfile({ onNavigate }) {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";

  React.useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (token) {
          const id = jwtDecode(token).sub;
          const response = await axiosInstance.get(`user/${id}`);
          setCurrentUser(response.data);
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewProfile = () => {
    onNavigate("profile");
    handleMenuClose();
  };

  const handleLogout = () => {
    localStorage.setItem("jwt", "");
    localStorage.setItem("user-artist-id", null);
    localStorage.setItem("artist-flag", false);
    localStorage.setItem("isAdmin", "");
    localStorage.setItem("route", "");
    localStorage.setItem("userId", "");
    onNavigate("login");
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        {!currentUser ? (
          <p>Loading...</p>
        ) : (
          <div css={userProfileCss}>
            <div css={circleCss}>{currentUser.firstname[0]}</div>
            <div css={smallDataDiv}>
              <p>
                {currentUser.firstname} {currentUser.lastname}
              </p>
              <p>{currentUser.email}</p>
            </div>
          </div>
        )}
      </MenuItem>
      <MenuItem data-testid="profileButton" onClick={handleViewProfile}>
        Profile
      </MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      <IconButton
        data-testid="profileIcon"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
        css={{
          width: "60px",
          height: "60px",
        }}
      >
        <Avatar
          sx={{
            width: "100%",
            height: "100%",
            fontWeight: "bold",
            fontSize: "20px",
            color: "#000",
            fontFamily: '"Times New Roman", serif',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#bde0fe",
            border: "1px solid #000",
          }}
        >
          {currentUser && currentUser.firstname[0]}
        </Avatar>
      </IconButton>
      {renderMenu}
    </>
  );
}

UserProfile.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

export default UserProfile;
