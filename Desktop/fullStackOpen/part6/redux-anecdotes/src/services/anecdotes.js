import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const initialAnecdotes = await axios.get(baseUrl);
  console.log(initialAnecdotes);
  return initialAnecdotes.data;
};

const newAnecdote = async (anecdote) => {
  await axios.post(baseUrl, anecdote);
};

export default { getAll, newAnecdote };
