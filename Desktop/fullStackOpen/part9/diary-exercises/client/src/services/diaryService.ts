import axios from "axios";
import { NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";

const getAll = async () => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(
    "http://localhost:3000/api/diaries"
  );
  console.log(response.data);
  return response.data;
};

const addNewDiary = async (diary: NewDiaryEntry) => {
  const response = await axios.post<NewDiaryEntry>(
    "http://localhost:3000/api/diaries",
    diary
  );
  return response.data;
};

export { getAll, addNewDiary };
