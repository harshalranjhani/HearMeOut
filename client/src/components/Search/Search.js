import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRef } from "react";
import SearchResults from "./SearchResults";

export default function Search() {
  const searchTerm = useRef();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [searchData, setSearchData] = React.useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm.current.value === "") setSearchData([]);
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${searchTerm.current.value}&type=track,artist,album&include_external=audio&limit=35`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    setSearchData(response.data);
  };

  return (
    <div style={{ width: 500 }}>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        onSubmit={handleSubmit}
        width={500}
        p={3}
        noValidate
        autoComplete="off"
      >
        <Input
          inputRef={searchTerm}
          fullWidth
          placeholder="Search for songs, artists and more"
          inputProps={"search"}
        />
      </Box>
      {searchData.length === 0 ? (
        <></>
      ) : (
        <Box>
          <SearchResults searchData={searchData} />
        </Box>
      )}
    </div>
  );
}
