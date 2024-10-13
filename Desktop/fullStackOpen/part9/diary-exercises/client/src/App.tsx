import { useEffect, useState } from "react";
import { NonSensitiveDiaryEntry } from "./types";
import { getAll } from "./services/diaryService";

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await getAll();
      setDiaries(diaries);
    };
    fetchDiaries();
  }, []);

  console.log(diaries);
  return (
    <div>
      <h1>data under here:</h1>
      <div>
        {diaries.map((diary) => (
          <div key={diary.id}>
            <p>
              date: {diary.date} <br /> visibility: {diary.visibility} <br />{" "}
              weather: {diary.weather}
            </p>
          </div>
        ))}
      </div>
      <div>
        <h2>Add a new diary:</h2>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            border: "3px solid black",
            padding: "1rem",
          }}
        >
          <label htmlFor="date">Date</label>
          <input type="date" name="date" />
          <label htmlFor="weather">Weather</label>
          <input type="text" name="weather" />
          <label htmlFor="visibility">Visibility</label>
          <input type="text" name="visibility" />
          <label htmlFor="comment">Comment</label>
          <input type="text" name="comment" />
        </form>
      </div>
    </div>
  );
}

export default App;
