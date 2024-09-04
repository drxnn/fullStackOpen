import { useDispatch } from "react-redux";

import { addNewAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const createAnecdote = async (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch(addNewAnecdote(anecdote));
  };
  return (
    <form onSubmit={createAnecdote}>
      <h2>create new</h2>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
