type Props = {
  name: string;
  exerciseCount: number;
};

type TotalProps = {
  exercises: Props[];
};

export default function Total({ exercises }: TotalProps): JSX.Element {
  return (
    <div>
      <p>
        {" "}
        Total Exercises:{" "}
        {exercises.reduce((acc, c) => {
          acc += c.exerciseCount;
          return acc;
        }, 0)}
      </p>
    </div>
  );
}
