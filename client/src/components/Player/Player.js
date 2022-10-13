import React from "react";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import ShuffleOnIcon from "@mui/icons-material/ShuffleOn";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOnIcon from "@mui/icons-material/RepeatOn";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { Button, IconButton, Container, Typography } from "@mui/material";
import classes from "./Player.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { tracksActions } from "../../store/tracks-slice";
import { current } from "@reduxjs/toolkit";

const playerPlaying = true;
const shuffleOn = false;
const repeatOn = false;

function Player(props) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const [currentlyPlaying, setCurrentlyPlaying] = React.useState(null);
  React.useEffect(() => {
    const getCurrentlyPlayingTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 204) {
        return;
      }
      dispatch(
        tracksActions.setCurrentTrack({ setCurrentTrack: response.data })
      );
      setCurrentlyPlaying(response.data);
    };
    getCurrentlyPlayingTrack();
  }, [accessToken, dispatch]);

  return (
    <div
      style={{
        position: "absolute",
        marginLeft: "1vw",
        marginTop: "10vh",
        width: "500px",
      }}
    >
      {!currentlyPlaying && (
        <Container>
          <Container
            sx={{
              position: "absolute",
              marginLeft: "75.7vw",
              marginTop: "-15vh",
            }}
          >
            <img
              style={{ height: "200px", width: "200px" }}
              src="https://dannythomson.com/wp-content/uploads/2020/05/itunes-3.png"
              alt="sd"
            ></img>
          </Container>
          <Container
            sx={{
              position: "absolute",
              marginLeft: "75.5vw",
              marginTop: "20vh",
            }}
          >
            <IconButton>
              <SkipPreviousIcon fontSize="large" sx={{ margin: 1 }} />
            </IconButton>

            <IconButton>
              {playerPlaying ? (
                <PlayCircleFilledWhiteIcon
                  fontSize="large"
                  sx={{ margin: 1 }}
                />
              ) : (
                <PauseCircleFilledIcon fontSize="large" sx={{ margin: 1 }} />
              )}
            </IconButton>
            <IconButton>
              <SkipNextIcon fontSize="large" sx={{ margin: 1 }} />
            </IconButton>
            <br />
            <Container>
              <IconButton>
                {shuffleOn ? (
                  <ShuffleOnIcon fontSize="large" sx={{ margin: 1 }} />
                ) : (
                  <ShuffleIcon fontSize="large" sx={{ margin: 1 }} />
                )}
              </IconButton>
              <IconButton>
                {repeatOn ? (
                  <RepeatOnIcon fontSize="large" sx={{ margin: 1 }} />
                ) : (
                  <RepeatIcon fontSize="large" sx={{ margin: 1 }} />
                )}
              </IconButton>
            </Container>
            <Container>
              <Typography variant="h5" sx={{ margin: "auto" }}>
                Not Playing <br />
                <Typography variant="subtitle1" gutterBottom>
                  <AudiotrackIcon sx={{ marginTop: 1 }} />
                  Playlist
                </Typography>
                <Typography>Comma Separated Artists</Typography>
              </Typography>
            </Container>
          </Container>
        </Container>
      )}
      {currentlyPlaying && (
        <Container>
          <Container
            sx={{
              position: "absolute",
              marginLeft: "75.7vw",
              marginTop: "-15vh",
            }}
          >
            <img
              style={{ height: "200px", width: "200px" }}
              src={currentlyPlaying.item.album.images[1].url}
              alt={currentlyPlaying.item.name}
            ></img>
          </Container>
          <Container
            sx={{
              position: "absolute",
              marginLeft: "75.5vw",
              marginTop: "20vh",
            }}
          >
            <IconButton>
              <SkipPreviousIcon fontSize="large" sx={{ margin: 1 }} />
            </IconButton>

            <IconButton>
              {playerPlaying ? (
                <PlayCircleFilledWhiteIcon
                  fontSize="large"
                  sx={{ margin: 1 }}
                />
              ) : (
                <PauseCircleFilledIcon fontSize="large" sx={{ margin: 1 }} />
              )}
            </IconButton>
            <IconButton>
              <SkipNextIcon fontSize="large" sx={{ margin: 1 }} />
            </IconButton>
            <br />
            <Container>
              <IconButton>
                {shuffleOn ? (
                  <ShuffleOnIcon fontSize="large" sx={{ margin: 1 }} />
                ) : (
                  <ShuffleIcon fontSize="large" sx={{ margin: 1 }} />
                )}
              </IconButton>
              <IconButton>
                {repeatOn ? (
                  <RepeatOnIcon fontSize="large" sx={{ margin: 1 }} />
                ) : (
                  <RepeatIcon fontSize="large" sx={{ margin: 1 }} />
                )}
              </IconButton>
            </Container>
            <Container>
              <Typography variant="h5" sx={{ margin: "auto" }}>
                Now Playing <br />
                <Typography variant="subtitle1" gutterBottom>
                  <AudiotrackIcon sx={{ marginTop: 1 }} />
                  {currentlyPlaying.item.name}
                </Typography>
                <Typography>
                  {currentlyPlaying.item.artists
                    .map((artist) => artist.name)
                    .join(", ")}
                </Typography>
              </Typography>
            </Container>
          </Container>
        </Container>
      )}
    </div>
    // <div></div>
  );
}

export default Player;
