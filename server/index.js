const express = require("express");
const app = express();
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config()
app.use(cors());
app.use(bodyParser.json());

app.post("/login", async (req, res) => {
  const code = req.body.code;
  // console.log(code);
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
      //   spotifyApi.setAccessToken(data.body["access_token"]);
    })
    .catch((err) => {
      console.log(err.message);
      res.sendStatus(400);
    });
});

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "46f8b7fe2f6a4e36b35466d68bb81637",
    clientSecret: "66d448ad64fb463ab570112539c7803d",
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });

      // Save the access token so that it's used in future calls
      //   spotifyApi.setAccessToken(data.body["access_token"]);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(5000, () => {
  console.log("App is listening on port 5000");
});
