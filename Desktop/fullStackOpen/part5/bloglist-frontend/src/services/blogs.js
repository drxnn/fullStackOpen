import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const postComment = async (id, comment) => {
  const response = await axios.put(`${baseUrl}/${id}/comments`, {
    comment: comment,
  });
  return response.data;
};

// const getBlogsOfUser = async (id) => {
//   // get blogs of specific user here
// };

const createNewBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  console.log("response from createNewBlog", response.data);
  return response.data;
};

const blogLiked = async (blog) => {
  const url = `${baseUrl}/${blog.id}`;
  const response = await axios.put(url, blog);
  return response;
};

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const url = `${baseUrl}/${blog.id}`;

  try {
    const response = await axios.delete(url, config);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default {
  getAll,
  setToken,
  createNewBlog,
  blogLiked,
  deleteBlog,
  postComment,
};
