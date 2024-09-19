import { createSlice } from "@reduxjs/toolkit";

const notificationAndStyleSlice = createSlice({
  name: "notificationWithStyle",
  initialState: { message: "", style: "" },
  reducers: {
    setNotificationAndStyle(state, action) {
      return action.payload;
    },
  },
});

export const setNotificationAndStyleWithTimeout = (message, style, time) => {
  return (dispatch) => {
    dispatch(setNotificationAndStyle({ message, style }));

    setTimeout(() => {
      dispatch(setNotificationAndStyle({ message: "", style: "" }));
    }, time);
  };
};

export const { setNotificationAndStyle } = notificationAndStyleSlice.actions;

export default notificationAndStyleSlice.reducer;
