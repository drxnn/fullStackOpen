import { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />

      <AnecdoteForm />
    </div>
  );
};

export default App;
