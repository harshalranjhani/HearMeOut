import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    profileImgUrl: "",
  },
  reducers: {
    setData(state, action) {
      const newState = {
        user: action.payload.user,
        profileImgUrl: action.payload.url,
      };
      console.log(newState);
      return newState;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
