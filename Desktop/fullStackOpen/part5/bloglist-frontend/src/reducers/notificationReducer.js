import { createSlice } from "@reduxjs/toolkit";
import { setStyle } from "./styleReducer";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const setNotificationWithTimeout = (message, style, time) => {
  return (dispatch) => {
    dispatch(setNotification(message));
    dispatch(setStyle(style));
    setTimeout(() => {
      dispatch(setNotification(""));
      dispatch(setStyle(""));
    }, time);
  };
};

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
