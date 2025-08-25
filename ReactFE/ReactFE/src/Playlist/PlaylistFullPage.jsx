import { Box } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import HorizontalNavBar from "../dashboard/HorizontalNavBar";
import VerticalNavBar from "../dashboard/VerticalNavBar";
import PlaylistPage from "./components/PlaylistPage";

export default function PlaylistFullPage() {
  const { playlistId } = useParams();
  const navigate = useNavigate();

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
        <Box css={{ flexShrink: 0 }}>
          <HorizontalNavBar
            handleNavigation={(route) => {
              navigate("/");
              localStorage.setItem("route", route);
            }}
          />
        </Box>

        <Box css={{ justifyContent: "center", display: "flex", flexGrow: 1 }}>
          <Box css={{ flexShrink: 0 }}>
            <VerticalNavBar
              handleNavigation={(route) => {
                navigate("/");
                localStorage.setItem("route", route);
              }}
            />
          </Box>
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
            <PlaylistPage playlistId={playlistId} />
            <Toaster />
          </Box>
        </Box>
      </Box>
    </>
  );
}
