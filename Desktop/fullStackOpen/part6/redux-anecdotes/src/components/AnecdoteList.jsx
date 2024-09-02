import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter) {
      return anecdotes.filter((anecdote) => {
        return anecdote.content.toLowerCase().includes(filter.toLowerCase());
      });
    } else {
      return anecdotes;
    }
  });
  console.log("line 13", anecdotes);
  const dispatch = useDispatch();

  // const vote = (id) => {
  //   return {
  //     type: "INCREMENT",
  //     payload: { id },
  //   };
  // };

  [...anecdotes].sort((a, b) => b.votes - a.votes);
  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(addVote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
