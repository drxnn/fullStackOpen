// You will have to make changes to the application's existing reducer. Create a separate reducer for the new functionality by using the Redux Toolkit's createSlice function.

// The application does not have to use the Notification component intelligently at this point in the exercises. It is enough for the application to display the initial value set for the message in the notificationReducer.
import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return "";
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
