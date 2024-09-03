import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const initialAnecdotes = await axios.get(baseUrl);
  console.log(initialAnecdotes);
  return initialAnecdotes.data;
};

export default { getAll };
