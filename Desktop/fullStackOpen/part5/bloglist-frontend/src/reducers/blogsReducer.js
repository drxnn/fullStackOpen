import { createSlice } from "@reduxjs/toolkit";
import services from "../services/blogs";
import { allUsers } from "./userReducer";
import { useSelector } from "react-redux";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    // Beware:allBlogs also handles like and delete logic in App.jsx
    allBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const response = await services.getAll();
    console.log(response);
    dispatch(allBlogs(response));
  };
};

export const createBlogThunk = (newBlog) => {
  return async (dispatch, getState) => {
    try {
      const response = await services.createNewBlog(newBlog);
      console.log(response);
      dispatch(addBlog(response));

      const userId = getState().user.currentUser.id;
      const usersList = getState().user.allUsers;

      const updatedUsers = usersList.map((user) => {
        console.log(user, userId, user.id);
        return user.id === userId
          ? { ...user, blogs: user.blogs.concat(response) }
          : user;
      });
      dispatch(allUsers(updatedUsers));
    } catch (err) {
      console.error(err);
    }
  };
};

export const { allBlogs, addBlog } = blogsSlice.actions;
export default blogsSlice.reducer;
