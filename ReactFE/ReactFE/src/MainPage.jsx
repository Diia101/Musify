import { Box } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Album from "./albums/Album";
import AlbumPage from "./albums/AlbumPage";
import "./App.css";
import Artist from "./artist/Artist";
import Artists from "./artist/Artists";
import Dashboard from "./dashboard/Dashboard";
import HorizontalNavBar from "./dashboard/HorizontalNavBar";
import Search from "./dashboard/Search";
import VerticalNavBar from "./dashboard/VerticalNavBar";
import { MyContext } from "./navigation/NavContext";
import Playlist from "./Playlist/Playlist";
import Song from "./Song/components/Song";
import ChangeDetails from "./user_authentication/components/ChangeDetails";
import ChangePassword from "./user_authentication/components/ChangePassword";
import LoginForm from "./user_authentication/components/LoginForm";
import ProfilePage from "./user_authentication/components/ProfilePage";
import Register from "./user_authentication/components/Register";
import { useProtector } from "./user_authentication/hooks/Protector";

function MainPage() {
  const [route, setRoute] = useState({
    route: localStorage["route"] == "" ? "home" : localStorage["route"],
    params: null,
  });
  console.log(localStorage["route"]);
  console.log(`route: ${route.route}`);
  const { state, dispatch } = useContext(MyContext);

  const handleNavigation = useCallback((route, params = null) => {
    localStorage.setItem("route", route.route);
    setRoute({ route, params });
  }, []);

  useProtector(route, handleNavigation);

  useEffect(() => {
    dispatch({
      type: "navigate",
      payload: {
        destination: route.route,
        domain: "/",
        navigate: handleNavigation,
      },
    });
  }, [route.route, dispatch, handleNavigation]);

  const renderPage = () => {
    switch (route.route) {
      case "home":
        return <Dashboard handleNavigation={handleNavigation} />;
      case "login":
        return <LoginForm onNavigate={handleNavigation} />;
      case "register":
        return <Register onNavigate={handleNavigation} />;
      case "album":
        return <AlbumPage AlbumId={route.params.AlbumId} />;
      case "albums":
        return <Album handleNavigation={handleNavigation} />;
      case "changepass":
        return <ChangePassword onNavigate={handleNavigation} />;
      case "changedetails":
        return <ChangeDetails onNavigate={handleNavigation} />;
      case "profile":
        return <ProfilePage onNavigate={handleNavigation} />;
      case "songs":
        return <Song />;
      case "playlists":
        return <Playlist />;
      case "search":
        return (
          <Search
            searchString={route.params.searchString}
            handleNavigation={handleNavigation}
          />
        );
      case "artists":
        return <Artists handleNavigation={handleNavigation} />;
      case "artist":
        return (
          <Artist
            artistId={route.params.artistId}
            handleNavigation={handleNavigation}
          />
        );
      default:
        return <Dashboard handleNavigation={handleNavigation} />;
    }
  };

  const showNavBars = route.route !== "login" && route.route !== "register";
  return (
    <>
      <Box
        css={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        {showNavBars && (
          <Box css={{ flexShrink: 0 }}>
            <HorizontalNavBar handleNavigation={handleNavigation} />
          </Box>
        )}

        <Box css={{ justifyContent: "center", display: "flex", flexGrow: 1 }}>
          {showNavBars && (
            <Box css={{ flexShrink: 0 }}>
              <VerticalNavBar handleNavigation={handleNavigation} />
            </Box>
          )}
          <Box
            css={{
              justifyContent: "center",
              display: "flex",
              flexGrow: 1,
              height: "100%",
              width: "100%",
              alignItems: "center",
              overflow: "auto",
            }}
          >
            {renderPage()}
            <Toaster />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default MainPage;
