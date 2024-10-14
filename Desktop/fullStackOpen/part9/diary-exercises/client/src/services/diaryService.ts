import axios from "axios";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";

const getAll = async () => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(
    "http://localhost:3000/api/diaries"
  );
  console.log(response.data);
  return response.data;
};

const addNewDiary = async (diary: NewDiaryEntry): Promise<DiaryEntry> => {
  const response = await axios.post("http://localhost:3000/api/diaries", diary);
  console.log(response.data);
  return response.data;
};

export { getAll, addNewDiary };
