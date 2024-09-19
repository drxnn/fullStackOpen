import { createSlice } from "@reduxjs/toolkit";
import services from "../services/blogs";

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
  return async (dispatch) => {
    try {
      const response = await services.createNewBlog(newBlog);
      console.log(response);
      dispatch(addBlog(response));
    } catch (err) {
      console.error(err);
    }
  };
};

export const { allBlogs, addBlog } = blogsSlice.actions;
export default blogsSlice.reducer;
