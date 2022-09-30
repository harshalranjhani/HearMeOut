import { useSelector } from "react-redux";
import "./App.css";
import Login from "./components/Login/Login";
import Playlists from "./components/Playlists/Playlists";
import Navbar from "./components/Navbar/Navbar";
import Welcome from "./components/Welcome/Welcome";
import FollowedArtists from "./components/Artists/FollowedArtists";
import Search from "./components/Search/Search";
import Player from "./components/Player/Player";
import { Alert, AlertTitle } from "@mui/material";
import RecentTracks from "./components/Recent Tracks/RecentTracks";

function App() {
  const accessToken = useSelector((state) => state.auth.accessToken);
  // const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  console.log(accessToken);
  const currentUser = useSelector((state) => state.user.user);
  return (
    <div className="App">
      <Navbar />
      {!accessToken && <Login />}
      {accessToken && <Playlists />}
      {accessToken && <FollowedArtists />}
      {accessToken && <RecentTracks />}
      {accessToken && <Welcome />}
      {accessToken && <Player />}
      {accessToken && <Search />}
      {!currentUser && (
        <Alert severity="error" sx={{ width: "50vh", margin: "auto" }}>
          <AlertTitle>Error</AlertTitle>
          Something went wrong —{" "}
          <strong>Try logging out and logging back in!</strong>
        </Alert>
      )}
    </div>
  );
}

export default App;
