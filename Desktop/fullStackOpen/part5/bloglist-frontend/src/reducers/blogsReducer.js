import { createSlice } from "@reduxjs/toolkit";
import services from "../services/blogs";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    getBlogs(state, action) {
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
    dispatch(getBlogs(response));
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

export const { getBlogs, addBlog } = blogsSlice.actions;
export default blogsSlice.reducer;
