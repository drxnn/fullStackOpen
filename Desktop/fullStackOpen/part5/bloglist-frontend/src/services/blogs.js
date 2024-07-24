import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getBlogsOfUser = async (id) => {
  // get blogs of specific user here
};

const createNewBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);
};

const blogLiked = async (blog) => {
  const url = `${baseUrl}/${blog.id}`;
  const response = await axios.put(url, blog);
};

export default { getAll, setToken, createNewBlog, blogLiked };
