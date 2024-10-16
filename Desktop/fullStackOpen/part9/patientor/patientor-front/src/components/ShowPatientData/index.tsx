import { useParams } from "react-router-dom";

import { Patient } from "../../types";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import { light } from "@mui/material/styles/createPalette";

function PatientInformation() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const id = useParams().id;

  useEffect(() => {
    const fetchPatients = async () => {
      const patientData = await patientService.getPatient({ id });
      setPatient(patientData);
    };
    void fetchPatients();
  }, [id]);

  if (!patient) {
    return <div>no patient</div>;
  }

  return (
    <div>
      <h1>Name:{patient.name}</h1>
      <p>
        Gender:{patient.gender} <br /> DOB: {patient.dateOfBirth} <br />{" "}
        Occupation:{patient.occupation}
      </p>
      <div>
        {patient.entries.map((entry, id) => (
          <div key={id}>
            {entry.date} <br /> {entry.description} <br />{" "}
            {entry.diagnosisCodes?.map((el, i) => (
              <li key={i}>{el} </li>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientInformation;
