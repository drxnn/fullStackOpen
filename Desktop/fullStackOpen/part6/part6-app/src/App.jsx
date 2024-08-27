import { useState } from "react";

import "./App.css";
import { configureStore } from "@reduxjs/toolkit";

function App() {
  const [count, setCount] = useState(0);

  const counterReducer = (state = 0, action) => {
    if (action.type === "INCREMENT") {
      return state + 1;
    } else if (action.type === "DECREMENT") {
      return state - 1;
    } else if (action.type === "ZERO") {
      return 0;
    }

    return state;
  };

  const store = configureStore(counterReducer);
  console.log(store.getState());
  store.dispatch({ type: "INCREMENT" });
  store.dispatch({ type: "INCREMENT" });
  store.dispatch({ type: "INCREMENT" });
  console.log(store.getState());
  store.dispatch({ type: "ZERO" });
  store.dispatch({ type: "DECREMENT" });
  console.log(store.getState());
  return (
    <>
      <h1>Redux</h1>
    </>
  );
}

export default App;
