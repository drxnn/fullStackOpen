import { createSlice } from "@reduxjs/toolkit";

const styleSlice = createSlice({
  name: "stlye",
  initialState: "",
  reducers: {
    setStyle(state, action) {
      return action.payload;
    },
  },
});

export const { setStyle } = styleSlice.actions;

export default styleSlice.reducer;
