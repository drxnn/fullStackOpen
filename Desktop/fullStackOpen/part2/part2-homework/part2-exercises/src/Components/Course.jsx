import React from "react";

const Course = ({ course }) => {
  const totalExercises = (obj) => {
    return obj.parts.reduce((acc, current) => {
      acc += current.exercises;
      return acc;
    }, 0);
  };

  return (
    <>
      {course.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          {item.parts.map((x) => {
            return (
              <div key={x.id}>
                <p>
                  {x.name} {x.exercises}
                </p>
              </div>
            );
          })}

          <strong>
            <p>total exercises are {totalExercises(item)}</p>
          </strong>
        </div>
      ))}
    </>
  );
};

export default Course;
