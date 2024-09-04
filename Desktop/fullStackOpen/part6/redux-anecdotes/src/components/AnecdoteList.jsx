import { useSelector, useDispatch } from "react-redux";
import { addVote, initializeAnecdotes } from "../reducers/anecdoteReducer";
import {
  removeNotification,
  setNotification,
} from "../reducers/notificationReducer";
import { useEffect } from "react";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    console.log(anecdotes);
    if (filter) {
      return anecdotes.filter((anecdote) => {
        return anecdote.content.toLowerCase().includes(filter.toLowerCase());
      });
    } else {
      return anecdotes;
    }
  });
  console.log("line 13", anecdotes);

  const handleVote = (anecdote) => {
    dispatch(addVote(anecdote.id));
    dispatch(setNotification(` you voted ${anecdote.content}`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 3000);
  };

  const sortedAnecdoes = [...anecdotes].sort((a, b) => b.votes - a.votes);
  return (
    <>
      {sortedAnecdoes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
