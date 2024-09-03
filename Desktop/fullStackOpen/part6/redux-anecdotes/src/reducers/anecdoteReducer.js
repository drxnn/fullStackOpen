import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

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

// console.log(initialState);

export const { addAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
