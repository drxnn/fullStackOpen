import { useParams } from "react-router-dom";

import { Patient } from "../../types";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";

function PatientInformation() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const id = useParams().id;

  useEffect(() => {
    const fetchPatients = async () => {
      const patient = await patientService.getPatient({ id });
      setPatient(patient);
    };
    void fetchPatients();
  });

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
    </div>
  );
}

export default PatientInformation;
