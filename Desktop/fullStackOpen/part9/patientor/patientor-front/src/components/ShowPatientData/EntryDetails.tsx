import { assertNever } from "../../utils/middleware";

import { Entry } from "../../types";

interface EntryDetailsProps {
  entry: Entry;
}

export const EntryDetails = ({ entry }: EntryDetailsProps) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <div>
          <strong> {entry.date} </strong> <br /> <p>{entry.description}</p>
          <br />
          <p>
            Discharge info: {entry.discharge.criteria} <br /> Released on :
            {entry.discharge.date}
          </p>
          <br />
          <span>Diagnosed by: {entry.specialist}</span>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <strong>{entry.date}</strong> <br />
          <p>{entry.description}</p>
          <span>Employer Name:{entry.employerName}</span>
        </div>
      );
    case "HealthCheck":
      return (
        <div>
          <strong>{entry.date}</strong>
          <p>{entry.description}</p>
          <span>Health Check Rating:{entry.healthCheckRating}</span> <br />
          <span>Diagnosed by: {entry.specialist}</span>
        </div>
      );
    default:
      assertNever(entry);
  }
};
