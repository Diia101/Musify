import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./MainPage";
import { MyProvider } from "./navigation/NavContext";
import PlaylistFullPage from "./Playlist/PlaylistFullPage";
import ForgotPassword from "./user_authentication/components/ForgotPassword";

function App() {
  return (
    <>
      <Router>
        <MyProvider>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/playlist/:playlistId"
              element={<PlaylistFullPage />}
            />
            <Route path="/resetPassword/:token" element={<ForgotPassword />} />
          </Routes>
        </MyProvider>
      </Router>
    </>
  );
}

export default App;
