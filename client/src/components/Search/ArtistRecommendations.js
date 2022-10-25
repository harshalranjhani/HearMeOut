import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

export default function ArtistRecommendations({ recommendationData }) {
  const currentTrack = useSelector((state) => state.tracks.currentTrack);
  // console.log(currentTrack.item.name);
  return (
    <>
      {recommendationData.tracks && (
        <div
          style={{
            display: "flex",
            width: "90vw",
            overflowY: "scroll",
          }}
        >
          <div>
            <Typography variant="h4" pl={10}>
              More Like "{currentTrack.item.name}"
            </Typography>
            <List
              sx={{
                width: "100%",
                maxWidth: "90vw",
                bgcolor: "transparent",
                height: "50vh",
                margin: "auto",
                overflowY: "scroll",
                padding: 0,
                listStyle: "none",
                "&::-webkit-scrollbar": {
                  width: "0.4em",
                },
                "&::-webkit-scrollbar-track": {
                  boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                  webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(0,0,0,.1)",
                  outline: "1px solid slategrey",
                },
              }}
            >
              {recommendationData.tracks.length &&
                recommendationData.tracks.map((track) => (
                  <ListItem
                    alignItems="flex-start"
                    sx={{ width: "40vw" }}
                    key={track.uri}
                  >
                    <ListItemAvatar>
                      {track.album && (
                        <Avatar
                          alt={track.name}
                          src={track.album.images[2].url}
                        />
                      )}
                      {!track.album && (
                        <Avatar alt={"Not Found"} src={"Not Found"} />
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      primary={track.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {track.artists
                              .map((artist) => artist.name)
                              .join(", ")}
                          </Typography>
                          {/* {" — I'll be in your neighborhood doing errands this…"} */}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
              {!recommendationData.tracks.length && (
                <ListItem alignItems="flex-start" sx={{ width: "40vw" }}>
                  No data found.
                </ListItem>
              )}
            </List>
          </div>
        </div>
      )}
      {!recommendationData && <></>}
    </>
  );
}
