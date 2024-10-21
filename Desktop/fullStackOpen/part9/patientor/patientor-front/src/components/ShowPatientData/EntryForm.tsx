import { useState } from "react";
import {
  EntryType,
  HealthCheckRating,
  NewEntryFormState,
  Patient,
} from "../../types";
import patientService from "../../services/patients";
import Notification from "../Notification";

const initialFormState: NewEntryFormState = {
  description: "",
  date: "",
  specialist: "",
  diagnosisCodes: [],
  healthCheckRating: HealthCheckRating.Healthy,
  type: EntryType.HealthCheck,
  id: "",
};

const EntryPerType = ({ formState }) => {
  switch (formState.type) {
    case EntryType.HealthCheck:
      //code
      break;
    case EntryType.Hospital:
      //handle
      break;
    case EntryType.OccupationalHealthcare:
      //handle;
      break;
    default:
      console.log("");
  }
};

type EntryFormProps = {
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  patient: Patient | null;
};

export default function EntryForm({ setPatient, patient }: EntryFormProps) {
  const [formData, setFormData] = useState(initialFormState);

  const [message, setMessage] = useState("");
  const handleFormSubmission = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (formData) console.log(formData);
      if (patient && patient.entries) {
        const addedEntry = await patientService.addEntry({
          id: patient.id,
          entry: formData,
        });

        const updatedPatient = {
          ...patient,
          entries: [...patient.entries, addedEntry],
        };
        setPatient(updatedPatient);
      }

      setFormData(initialFormState);
    } catch (err) {
      setMessage(`Something went wrong: ${err}`);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        border: "solid 2px black",
      }}
    >
      <Notification message={message} />
      <h2>New HealthCheck Entry</h2>
      <form
        onSubmit={(e) => handleFormSubmission(e)}
        style={{ display: "flex", flexDirection: "column", gap: ".3rem" }}
      >
        <div
          style={{ display: "flex", width: "15rem", flexDirection: "column" }}
        >
          <fieldset>
            <legend>Choose Entry Type:</legend>
            <div>
              <input
                type="radio"
                id="HealthCheck"
                name="healthcheck"
                value={EntryType.HealthCheck}
                checked={formData.type === EntryType.HealthCheck}
                onChange={() => {
                  setFormData((_p) => ({
                    type: EntryType.HealthCheck,
                    description: "",
                    date: "",
                    specialist: "",
                    diagnosisCodes: [],
                    healthCheckRating: HealthCheckRating.Healthy,
                    id: "",
                  }));
                }}
              />
              <label htmlFor="HealthCheck">HealthCheck</label>
            </div>
            <div>
              <input
                type="radio"
                id="OccupationalHealthcare"
                name="occupationalHealthCare"
                value={EntryType.OccupationalHealthcare}
                checked={formData.type === EntryType.OccupationalHealthcare}
                onChange={() => {
                  setFormData((_p) => ({
                    type: EntryType.OccupationalHealthcare,
                    description: "",
                    date: "",
                    specialist: "",
                    diagnosisCodes: [],
                    employerName: "",
                    sickLeave: {
                      startDate: "",
                      endDate: "",
                    },
                    id: "",
                  }));
                }}
              />
              <label htmlFor="OccupationalHealthcare">
                Occupational HealthCare
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Hospital"
                name="hospital"
                value={EntryType.Hospital}
                checked={formData.type === EntryType.Hospital}
                onChange={() => {
                  setFormData((_p) => ({
                    type: EntryType.Hospital,
                    description: "",
                    date: "",
                    specialist: "",
                    diagnosisCodes: [],
                    employerName: "",
                    discharge: {
                      date: "",
                      criteria: "",
                    },
                    id: "",
                  }));
                }}
              />
              <label htmlFor="Hospital">Hospital</label>
            </div>
          </fieldset>
        </div>
        <div
          style={{ display: "flex", width: "15rem", flexDirection: "column" }}
        >
          {" "}
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={({ target }) =>
              setFormData((p) => ({ ...p, description: target.value }))
            }
          />
        </div>
        <div
          style={{ display: "flex", width: "15rem", flexDirection: "column" }}
        >
          {" "}
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={({ target }) =>
              setFormData((p) => ({ ...p, date: target.value }))
            }
          />
        </div>

        <div
          style={{ display: "flex", width: "15rem", flexDirection: "column" }}
        >
          {" "}
          <label htmlFor="specialist">Specialist:</label>
          <input
            type="text"
            name="specialist"
            value={formData.specialist}
            onChange={({ target }) =>
              setFormData((p) => ({ ...p, specialist: target.value }))
            }
          />
        </div>

        <div
          style={{ display: "flex", width: "15rem", flexDirection: "column" }}
        >
          {" "}
          <label htmlFor="diagnosisCodes">Diagnosis Code:</label>
          <input
            type="text"
            name="diagnosisCodes"
            value={formData.diagnosisCodes}
            onChange={({ target }) =>
              setFormData((p) => ({
                ...p,
                diagnosisCodes: [target.value],
              }))
            }
          />
        </div>

        {formData.type === EntryType.HealthCheck && (
          <fieldset>
            <legend>Choose Health rating:</legend>
            <div>
              {" "}
              <input
                type="radio"
                id="Healthy"
                name="healthrating"
                value={HealthCheckRating.Healthy}
                checked={
                  formData.healthCheckRating === HealthCheckRating.Healthy
                }
                onChange={({ target }) => {
                  setFormData((p) => ({
                    ...p,
                    healthCheckRating: Number(target.value),
                  }));
                }}
              />
              <label htmlFor="Healthy">Healthy</label>
            </div>
            <div>
              <input
                type="radio"
                id="LowRisk"
                name="healthrating"
                value={HealthCheckRating.LowRisk}
                checked={
                  formData.healthCheckRating === HealthCheckRating.LowRisk
                }
                onChange={({ target }) => {
                  setFormData((p) => ({
                    ...p,
                    healthCheckRating: Number(target.value),
                  }));
                }}
              />
              <label htmlFor="LowRisk">Low Risk</label>
            </div>
            <div>
              <input
                type="radio"
                id="HighRisk"
                name="healthrating"
                value={HealthCheckRating.HighRisk}
                checked={
                  formData.healthCheckRating === HealthCheckRating.HighRisk
                }
                onChange={({ target }) => {
                  setFormData((p) => ({
                    ...p,
                    healthCheckRating: Number(target.value),
                  }));
                }}
              />
              <label htmlFor="HighRisk">High Risk</label>
            </div>
            <div>
              <input
                type="radio"
                id="CriticalRisk"
                name="healthrating"
                value={HealthCheckRating.CriticalRisk}
                checked={
                  formData.healthCheckRating === HealthCheckRating.CriticalRisk
                }
                onChange={({ target }) => {
                  setFormData((p) => ({
                    ...p,
                    healthCheckRating: Number(target.value),
                  }));
                }}
              />
              <label htmlFor="CriticalRisk">Critical Risk</label>
            </div>
          </fieldset>
        )}

        <button
          type="submit"
          style={{
            padding: ".5rem",
            borderRadius: "10px",
            width: "7rem",
            cursor: "pointer    ",
          }}
        >
          Add New Entry
        </button>
      </form>
    </div>
  );
}
