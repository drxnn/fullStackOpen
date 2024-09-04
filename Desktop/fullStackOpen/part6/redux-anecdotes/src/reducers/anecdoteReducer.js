import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

// only for new anecdote
export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((a) => a.id === id);
      // console.log(anecdoteToVote);
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
      }
    },
    addAnecdote(state, action) {
      state.push({ content: action.payload, id: getId(), votes: 0 });
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const addVoteToAnecdote = (anecdote) => {
  return async (dispatch) => {
    const id = anecdote.id;
    const newAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    await anecdoteService.addVote(newAnecdote, id);
    dispatch(addVote(id));
  };
};

export const addNewAnecdote = (anecdote) => {
  return async (dispatch) => {
    dispatch(addAnecdote(anecdote));
    const anecdoteAsObject = asObject(anecdote);
    await anecdoteService.newAnecdote(anecdoteAsObject);
  };
};
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

// console.log(initialState);

export const { addAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
