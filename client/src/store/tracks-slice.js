import { createSlice } from "@reduxjs/toolkit";

const tracksSlice = createSlice({
  name: "tracks",
  initialState: {
    currentTrack: null,
  },
  reducers: {
    setCurrentTrack(state, action) {
      console.log("working on it!");
    },
  },
});

export const tracksActions = tracksSlice.actions;
export default tracksSlice;
