import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    addUser(state, action) {
      state.currentUser = action.payload;
    },
    allUsers(state, action) {
      state.allUsers = action.payload;
    },
  },
});

export const initializeUsers = () => {
  return async (dispatch) => {
    const response = await usersService.getUsers();
    console.log(response);
    dispatch(allUsers(response));
  };
};

export const { addUser, allUsers } = userSlice.actions;
export default userSlice.reducer;
