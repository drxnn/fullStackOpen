import { useDispatch } from "react-redux";
import { createNote } from "../reducers/noteReducer";

const NewNote = () => {
  const dispatch = useDispatch();

  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    if (content.length < 2) return;
    // will add more logic later
    dispatch(createNote(content));
  };

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  );
};

export default NewNote;
