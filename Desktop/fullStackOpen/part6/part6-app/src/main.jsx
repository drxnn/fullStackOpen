import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import "./index.css";

import { noteReducer } from "./reducers/noteReducer";

import filterReducer from "./reducers/filterReducer";

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
});

const store = createStore(reducer);
console.log(store.getState());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

// createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <div />
//   </Provider>
// );
