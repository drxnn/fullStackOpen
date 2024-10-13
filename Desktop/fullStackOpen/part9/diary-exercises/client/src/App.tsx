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
    </div>
  );
}

export default App;
