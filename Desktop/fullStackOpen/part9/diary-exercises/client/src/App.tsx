import { useEffect, useState } from "react";
import { NonSensitiveDiaryEntry } from "./types";
import { addNewDiary, getAll } from "./services/diaryService";
import toNewDiaryEntry from "./utils";
import Notification from "./Components/Notification";

// import { v4 as uuidv4 } from "uuid";

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [formData, setFormData] = useState({
    date: "",
    weather: "",
    visibility: "",
    comment: "",
  });
  const [error, setError] = useState<string>("");
  console.log(formData);

  const onSubmitNewDiary = (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const formToAdd = toNewDiaryEntry(formData);

      addNewDiary(formToAdd);
      setFormData({ date: "", weather: "", visibility: "", comment: "" });
    } catch (e: unknown) {
      console.log(e);
      setError("something went wrong");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

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
      <Notification error={error} />
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
          <input
            type="date"
            name="date"
            onChange={(e) =>
              setFormData((p) => {
                return {
                  ...p,
                  date: e.target.value,
                };
              })
            }
          />
          <label htmlFor="weather">Weather</label>
          <input
            type="text"
            name="weather"
            onChange={(e) =>
              setFormData((p) => {
                return {
                  ...p,
                  weather: e.target.value,
                };
              })
            }
          />
          <label htmlFor="visibility">Visibility</label>
          <input
            type="text"
            name="visibility"
            onChange={(e) =>
              setFormData((p) => {
                return {
                  ...p,
                  visibility: e.target.value,
                };
              })
            }
          />
          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            name="comment"
            onChange={(e) =>
              setFormData((p) => {
                return {
                  ...p,
                  comment: e.target.value,
                };
              })
            }
          />
          <button type="submit" onClick={(e) => onSubmitNewDiary(e)}>
            Add new diary
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
