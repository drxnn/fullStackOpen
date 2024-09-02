import { useEffect } from "react";
import "./App.css";
import noteService from "./services/notes";
import { setNotes } from "./reducers/noteReducer";
import { useDispatch } from "react-redux";
import NewNote from "./Components/NewNote";
import Notes from "./Components/Notes";
import VisibilityFilter from "./Components/VisibilityFilter";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    noteService.getAll().then((notes) => dispatch(setNotes(notes)));
  }, []);

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
}

export default App;
