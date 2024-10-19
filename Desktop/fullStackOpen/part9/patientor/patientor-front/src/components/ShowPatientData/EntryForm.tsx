import { useState } from "react";
import { HealthCheckEntry, HealthCheckRating, Patient } from "../../types";
import patientService from "../../services/patients";

// type Props = {};

const initialFormState: HealthCheckEntry = {
  description: "",
  date: "",
  specialist: "",
  diagnosisCodes: [],
  healthCheckRating: HealthCheckRating.Healthy,
  type: "HealthCheck",
  id: "",
};

type EntryFormProps = {
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  patient: Patient | null;
};

export default function EntryForm({ setPatient, patient }: EntryFormProps) {
  const [formData, setFormData] = useState(initialFormState);

  const handleFormSubmission = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (formData) console.log(formData);
      if (patient && patient.entries) {
        const updatedPatient = {
          ...patient,
          entries: [...patient.entries, formData],
        };

        setPatient(updatedPatient);

        await patientService.addEntry({ id: updatedPatient.id });
      }

      setFormData(initialFormState);
    } catch (err) {
      console.log(err);
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
      <h2>New HealthCheck Entry</h2>
      <form
        onSubmit={(e) => handleFormSubmission(e)}
        style={{ display: "flex", flexDirection: "column", gap: ".3rem" }}
      >
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

        <fieldset>
          <legend>Choose Health rating:</legend>
          <div>
            {" "}
            <input
              type="radio"
              id="Healthy"
              name="healthrating"
              value={HealthCheckRating.Healthy}
              checked={formData.healthCheckRating === HealthCheckRating.Healthy}
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
              checked={formData.healthCheckRating === HealthCheckRating.LowRisk}
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
