import Content from "./Components/Content";
import Header from "./Components/Header";
import Total from "./Components/Total";

const App = () => {
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartBasic extends CoursePartBase {
    description: string;
    kind: "basic";
  }

  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
  }

  interface CoursePartBackground extends CoursePartBase {
    description: string;
    backgroundMaterial: string;
    kind: "background";
  }

  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
  ];

  courseParts.forEach((element) => {
    switch (element.kind) {
      case "basic":
        console.log(element.description, element.name, element.exerciseCount);
        break;
      case "group":
        console.log(
          element.exerciseCount,
          element.groupProjectCount,
          element.name
        );
        break;
      case "background":
        console.log(element.backgroundMaterial);
        break;
      default:
        return assertNever(element);
    }
  });
  return (
    <div>
      <Header name={courseName} />
      <Content items={courseParts} />
      <Total exercises={courseParts} />
    </div>
  );
};

export default App;
