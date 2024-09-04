import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./src/reducers/anecdoteReducer";
import filterReducer from "./src/reducers/filterReducer";
import notificationReducer from "./src/reducers/notificationReducer";

// import anecdotes from "./src/services/anecdotes";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

console.log(store.getState());

export { store };
