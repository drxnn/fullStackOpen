import { useDispatch } from "react-redux";
import { addAnecdote, asObject } from "../reducers/anecdoteReducer";
import anecdotesServices from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const createAnecdote = async (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value = "";
    const anecdoteObject = asObject(anecdote);

    await anecdotesServices.newAnecdote(anecdoteObject);
    dispatch(addAnecdote(anecdote));
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
