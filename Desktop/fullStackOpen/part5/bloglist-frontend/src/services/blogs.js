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

const createNewBlog = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog);
};

export default { getAll, setToken, createNewBlog };
