import { useSelector, useDispatch } from "react-redux";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter) {
      return state.anecdotes.filter((anecdote) => {
        console.log(anecdote.content);
        return anecdote.content
          .toLowerCase()
          .includes(state.filter.toLowerCase());
      });
    } else {
      return state.anecdotes;
    }
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    return {
      type: "INCREMENT",
      payload: { id },
    };
  };

  anecdotes.sort((a, b) => b.votes - a.votes);
  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
