import axios from "axios";
import { NonSensitiveDiaryEntry } from "../types";

const getAll = async () => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(
    "http://localhost:3000/api/diaries"
  );
  return response.data;
};

export { getAll };
