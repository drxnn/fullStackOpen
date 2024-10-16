import { useParams } from "react-router-dom";

import { Diagnose, Patient } from "../../types";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import { EntryDetails } from "./EntryDetails";

function PatientInformation() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnose[] | null>(null);
  const id = useParams().id;

  useEffect(() => {
    const fetchPatients = async () => {
      const patientData = await patientService.getPatient({ id });
      const diagnosesData = await patientService.getDiagnoses();
      setPatient(patientData);
      setDiagnoses(diagnosesData);
    };
    void fetchPatients();
  }, [id]);

  const handleDiagnoses = (diagnosesCode: string) => {
    if (!diagnoses) return null;

    return diagnoses.map((el: Diagnose, i): React.JSX.Element | null => {
      if (!el) {
        return null;
      }

      if (el.code === diagnosesCode) {
        return (
          <div key={i}>
            {el.code} <br />
            {el.name}
          </div>
        );
      }

      return null;
    });
  };

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
        {patient.entries.map((entry, i) => (
          <div key={i}>
            {entry.diagnosisCodes?.map((el, i) => (
              <div key={i}>{handleDiagnoses(el)}</div>
            ))}
            <EntryDetails entry={entry} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientInformation;
