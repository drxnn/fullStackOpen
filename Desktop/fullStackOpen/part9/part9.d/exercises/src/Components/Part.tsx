import { CoursePart } from "../App";

export default function Part({ courseParts }: { courseParts: CoursePart[] }) {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  return (
    <>
      {courseParts.map((part: CoursePart) => {
        switch (part.kind) {
          case "basic":
            return (
              <div>
                <h4>{part.name}</h4>
                <br /> {part.exerciseCount} <br /> {part.kind}
              </div>
            );
          case "group":
            return (
              <div>
                <h4>{part.name}</h4> <br /> {part.exerciseCount} <br />{" "}
                {part.groupProjectCount} <br />
                {part.kind}
              </div>
            );
          case "background":
            return (
              <div>
                <h4>{part.name}</h4> <br />
                {part.backgroundMaterial} <br /> {part.kind}
              </div>
            );
          case "withDescription":
            return (
              <div>
                <h4>{part.name}</h4>
                <br />
                {part.description}
              </div>
            );
          case "special":
            return (
              <div>
                <h4>{part.name}</h4>
                <br />
                {part.exerciseCount} <br />
                {part.description} <br />
                {part.requirements} <br />
                {part.kind}
              </div>
            );
          default:
            return assertNever(part);
        }
      })}
    </>
  );
}
