import Content from "./Components/Content";
import Header from "./Components/Header";
import Total from "./Components/Total";

const App = () => {
  type CoursePart = {
    name: string;
    exerciseCount: number;
  };
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content items={courseParts} />
      <Total exercises={courseParts} />
    </div>
  );
};

export default App;
