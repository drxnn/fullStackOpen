import axios from "axios";
import { Patient, PatientFormValues, Diagnose, Entry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getPatient = async ({ id }: { id: string | undefined }) => {
  console.log(id);
  const patient = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  console.log(patient);
  return patient.data;
};

const getDiagnoses = async () => {
  const diagnoses = await axios.get<Diagnose[]>(`${apiBaseUrl}/diagnoses`);
  console.log(diagnoses);
  return diagnoses.data;
};

const addEntry = async ({
  id,
  entry,
}: {
  id: string | undefined;
  entry: Entry;
}) => {
  console.log(id);
  console.log(`${apiBaseUrl}/patients/:${id}/entries`);
  const response = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    entry
  );
  console.log(response.data);
  return response.data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

export default {
  getAll,
  create,
  getPatient,
  getDiagnoses,
  addEntry,
};
