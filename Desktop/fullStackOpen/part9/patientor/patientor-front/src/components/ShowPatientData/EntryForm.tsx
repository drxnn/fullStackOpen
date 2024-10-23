import { useEffect, useState } from "react";
import {
  Diagnose,
  Entry,
  EntryType,
  HealthCheckFormState,
  HealthCheckRating,
  HospitalFormState,
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

  type: EntryType.HealthCheck,
  id: "",
};

interface EntryPerTypeProps {
  formData: NewEntryFormState;
  setFormData: React.Dispatch<React.SetStateAction<NewEntryFormState>>;
}

const EntryPerType: React.FC<EntryPerTypeProps> = ({
  formData,
  setFormData,
}) => {
  const [dischargeData, setDischargeData] = useState({
    date: "",
    criteria: "",
  });
  const [occupationalHealthCareData, setOccupationalHealthCareData] = useState({
    employerName: "",
    sickLeave: { startDate: "", endDate: "" },
  });

  const [healthCheckData, setHealthCheckData] = useState<string | number>("");
  useEffect(() => {
    const commonFields = {
      id: formData.id,
      description: formData.description,
      date: formData.date,
      specialist: formData.specialist,
      diagnosisCodes: formData?.diagnosisCodes,
    };
    if (formData.type === EntryType.Hospital) {
      setFormData((_p) => ({
        ...commonFields,
        type: EntryType.Hospital,
        discharge: dischargeData,
      }));
    } else if (formData.type === EntryType.OccupationalHealthcare) {
      setFormData((_p) => ({
        ...commonFields,
        type: EntryType.OccupationalHealthcare,
        employer: occupationalHealthCareData.employerName,
        sickLeave: occupationalHealthCareData.sickLeave,
      }));
    } else if (formData.type === EntryType.HealthCheck) {
      setFormData((_p) => ({
        ...commonFields,
        type: EntryType.HealthCheck,
        healthCheckRating: healthCheckData,
      }));
    }
  }, [
    dischargeData,
    formData.type,
    setFormData,
    occupationalHealthCareData,
    formData.id,
    formData.description,
    formData.diagnosisCodes,
    formData.specialist,
    formData.date,
    healthCheckData,
  ]);

  console.log(dischargeData);

  switch (formData.type) {
    case EntryType.HealthCheck:
      return (
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
                (formData as HealthCheckFormState).healthCheckRating ===
                HealthCheckRating.Healthy
              }
              onChange={({ target }) => {
                setHealthCheckData(Number(target.value));
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
                (formData as HealthCheckFormState).healthCheckRating ===
                HealthCheckRating.LowRisk
              }
              onChange={({ target }) => {
                setHealthCheckData(Number(target.value));
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
                (formData as HealthCheckFormState).healthCheckRating ===
                HealthCheckRating.HighRisk
              }
              onChange={({ target }) => {
                setHealthCheckData(Number(target.value));
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
                (formData as HealthCheckFormState).healthCheckRating ===
                HealthCheckRating.CriticalRisk
              }
              onChange={({ target }) => {
                setHealthCheckData(Number(target.value));
              }}
            />
            <label htmlFor="CriticalRisk">Critical Risk</label>
          </div>
        </fieldset>
      );

    case EntryType.Hospital:
      return (
        <div>
          <fieldset>
            <legend> Discharge information:</legend>
            <div>
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                name="date"
                value={(formData as HospitalFormState).discharge?.date || ""}
                onChange={({ target }) => {
                  setDischargeData((p) => ({
                    ...p,
                    date: target.value,
                  }));
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="criteria">Criteria:</label>
              <textarea
                name="criteria"
                value={
                  (formData as HospitalFormState).discharge?.criteria || ""
                }
                onChange={({ target }) =>
                  setDischargeData((p) => ({
                    ...p,
                    criteria: target.value,
                  }))
                }
              />
            </div>
          </fieldset>
        </div>
      );

    case EntryType.OccupationalHealthcare:
      return (
        <div>
          <fieldset>
            <legend>Sick Leave Info:</legend>
            <div>
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                value={occupationalHealthCareData.sickLeave.startDate}
                onChange={({ target }) =>
                  setOccupationalHealthCareData((p) => ({
                    ...p,
                    sickLeave: {
                      startDate: target.value,
                      endDate: p.sickLeave.endDate,
                    },
                  }))
                }
              />
            </div>
            <div>
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                name="endDate"
                id="endDate"
                value={occupationalHealthCareData.sickLeave.endDate}
                onChange={({ target }) =>
                  setOccupationalHealthCareData((p) => ({
                    ...p,
                    sickLeave: {
                      startDate: p.sickLeave.startDate,
                      endDate: target.value,
                    },
                  }))
                }
              />
            </div>
          </fieldset>
          <label htmlFor="employer">Employer name(Optional):</label>
          <input
            type="text"
            name="employer"
            id="employer"
            value={occupationalHealthCareData.employerName}
            onChange={({ target }) =>
              setOccupationalHealthCareData((p) => ({
                ...p,
                employerName: target.value,
              }))
            }
          />
        </div>
      );

    default:
      console.log("");
  }
};

type EntryFormProps = {
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  patient: Patient | null;
  diagnoses: Diagnose[] | null;
};

export default function EntryForm({
  setPatient,
  patient,
  diagnoses,
}: EntryFormProps) {
  const [formData, setFormData] = useState(initialFormState);
  console.log(formData);

  const [message, setMessage] = useState("");
  const handleFormSubmission = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (formData) console.log(formData);
      if (patient && patient.entries) {
        const addedEntry = await patientService.addEntry({
          id: patient.id,
          entry: formData as Entry,
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
                  setFormData((p) => ({
                    ...p,
                    type: EntryType.HealthCheck,

                    healthCheckRating: HealthCheckRating.Healthy,
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
                  setFormData((p) => ({
                    ...p,
                    type: EntryType.OccupationalHealthcare,

                    employerName: "",
                    sickLeave: {
                      startDate: "",
                      endDate: "",
                    },
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
                  setFormData((p) => ({
                    ...p,
                    type: EntryType.Hospital,

                    employerName: "",
                    discharge: {
                      date: "",
                      criteria: "",
                    },
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
          <label htmlFor="diagnosisCodes">
            Diagnosis Code:
            <select
              name="diagnosisCodes"
              id="diagnosisCodes"
              onChange={({ target }) =>
                setFormData((p) => ({
                  ...p,
                  diagnosisCodes: [target.value],
                }))
              }
            >
              {diagnoses?.map((el, i) => (
                <option key={i} value={el.code}>
                  {el.code}
                </option>
              ))}
            </select>
          </label>
        </div>

        <EntryPerType formData={formData} setFormData={setFormData} />

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
