import "./App.css";

import NewNote from "./Components/NewNote";
import Notes from "./Components/Notes";
import VisibilityFilter from "./Components/VisibilityFilter";
function App() {
  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
}

export default App;
