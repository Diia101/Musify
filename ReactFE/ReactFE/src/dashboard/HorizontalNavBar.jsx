import SearchIcon from "@mui/icons-material/Search";
import { AppBar, Box, InputBase, Toolbar, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useState } from "react";
import Chatbot from "../chatbot/Chatbot";
import NavButton from "../navigation/NavButton";
import UserProfile from "./UserProfile";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function HorizontalNavBar({ handleNavigation }) {
  const [searchInput, setSearchInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSearch = (event) => {
    if (event.key == "Enter") {
      handleNavigation("search", { searchString: searchInput });
    }
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#D1B9D8",
        height: "80px",
        maxWidth: "false",
      }}
    >
      <Toolbar
        css={{
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "false",
        }}
      >
        <div
          css={{
            height: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box
            css={{
              height: "100%",
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <img src="../../logo/mus_main.png" css={{ height: "70%" }} />
            <Typography
              css={{
                color: "#3c77c9",
                fontFamily: "Sansita Swashed, cursive",
                fontWeight: "bold",
                letterSpacing: "5px",
                marginLeft: "5px",
                fontSize: "20px",
              }}
            >
              USIFY
            </Typography>
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleSearch}
            />
          </Search>
        </div>
        <div
          css={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <Box>
            <button id="navBarChatButton" onClick={handleOpenModal}>
              Talk to Chris
            </button>
            <Chatbot open={isModalOpen} onClose={handleCloseModal} />
          </Box>
          <UserProfile id="userProfileButton" onNavigate={handleNavigation} />
          <NavButton />
        </div>
      </Toolbar>
    </AppBar>
  );
}
HorizontalNavBar.propTypes = {
  handleNavigation: PropTypes.func.isRequired,
};
export default HorizontalNavBar;
