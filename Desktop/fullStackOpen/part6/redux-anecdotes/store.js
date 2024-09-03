import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer, {
  setAnecdotes,
  // asObject,
} from "./src/reducers/anecdoteReducer";
import filterReducer from "./src/reducers/filterReducer";
import notificationReducer from "./src/reducers/notificationReducer";
import anecdotesServices from "./src/services/anecdotes";
// import anecdotes from "./src/services/anecdotes";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

anecdotesServices.getAll().then((anecdotes) => {
  store.dispatch(setAnecdotes(anecdotes));
});

console.log(store.getState());

export { store };
