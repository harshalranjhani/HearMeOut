import React from "react";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";
import axios from "axios";

const Welcome = (props) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.user.user);
  const currentTrack = useSelector((state) => state.tracks.currentTrack);
  // const name = currentTrack.data.name;
  console.log(currentTrack);

  useEffect(() => {
    const getUserProfile = async () => {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      dispatch(
        userActions.setData({
          user: response.data,
          url: response.data.images[0].url,
        })
      );
    };
    getUserProfile();
  }, [accessToken, dispatch]);

  return (
    <Typography variant="h5" p={3} width={500} sx={{ marginRight: 0 }}>
      Welcome, {user.display_name}
    </Typography>
  );
};

export default Welcome;
