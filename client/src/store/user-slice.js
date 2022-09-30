import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {}
  },
  reducers: {
    setData(state, action) {
      const newState = {
        user: action.payload.user
      };
      return newState;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
