import { useEffect, useState } from "react";
import { NonSensitiveDiaryEntry } from "./types";
import { addNewDiary, getAll } from "./services/diaryService";
import toNewDiaryEntry from "./utils";
import Notification from "./Components/Notification";
import { AxiosError } from "axios";

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

  const onSubmitNewDiary = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const formToAdd = toNewDiaryEntry(formData);

      await addNewDiary(formToAdd);
      setFormData({ date: "", weather: "", visibility: "", comment: "" });
    } catch (e) {
      console.log(e);

      if (e instanceof AxiosError) {
        setError(e.message);
      } else if (e instanceof Error) {
        setError(e.message);
      }

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
          <fieldset>
            {" "}
            <legend>Choose weather</legend>
            <input
              type="radio"
              name="weather"
              id="sunny"
              value="sunny"
              checked={formData.weather === "sunny"}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  weather: e.target.value,
                }))
              }
            />
            <label htmlFor="sunny">sunny</label>
            <input
              type="radio"
              name="weather"
              id="rainy"
              value="rainy"
              checked={formData.weather === "rainy"}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  weather: e.target.value,
                }))
              }
            />
            <label htmlFor="rainy">rainy</label>
            <input
              type="radio"
              name="weather"
              id="cloudy"
              value="cloudy"
              checked={formData.weather === "cloudy"}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  weather: e.target.value,
                }))
              }
            />
            <label htmlFor="cloudy">cloudy</label>
            <input
              type="radio"
              name="weather"
              id="stormy"
              value="stormy"
              checked={formData.weather === "stormy"}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  weather: e.target.value,
                }))
              }
            />
            <label htmlFor="stormy">stormy</label>
            <input
              type="radio"
              name="weather"
              id="windy"
              value="windy"
              checked={formData.weather === "windy"}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  weather: e.target.value,
                }))
              }
            />
            <label htmlFor="windy">windy</label>
          </fieldset>

          <fieldset>
            <legend>Choose visibility</legend>
            <input
              type="radio"
              name="visibility"
              id="great"
              value="great"
              checked={formData.visibility === "great"}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  visibility: e.target.value,
                }))
              }
            />
            <label htmlFor="great">great</label>
            <input
              type="radio"
              name="visibility"
              id="good"
              value="good"
              checked={formData.visibility === "good"}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  visibility: e.target.value,
                }))
              }
            />
            <label htmlFor="good">good</label>
            <input
              type="radio"
              name="visibility"
              id="ok"
              value="ok"
              checked={formData.visibility === "ok"}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  visibility: e.target.value,
                }))
              }
            />
            <label htmlFor="ok">ok</label>
            <input
              type="radio"
              name="visibility"
              id="poor"
              value="poor"
              checked={formData.visibility === "poor"}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  visibility: e.target.value,
                }))
              }
            />
            <label htmlFor="poor">poor</label>
          </fieldset>

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
