//TASK:
// Your task is to implement a web application for collecting customer feedback. There are only three options for feedback: good, neutral, and bad.
// The application must display the total number of collected feedback for each category

//TASK2:
//
// Expand your application so that it shows more statistics about the gathered feedback: the total number of collected feedback, the average score (good: 1, neutral: 0, bad: -1) and the percentage of positive feedback.

import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  return (
    <table>
      <h2>Statistics</h2>
      {!total ? (
        <>No Feedback given</>
      ) : (
        <>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="total" value={total} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive} />
        </>
      )}
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGood = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    setTotal(updatedGood + neutral + bad);
  };

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    setTotal(good + updatedNeutral + bad);
  };

  const handleBad = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setTotal(good + neutral + updatedBad);
  };

  //Calculate average
  const average = total === 0 ? 0 : (good - bad) / total;

  // Calculate positive feedbacks
  const positive = `${(good / total) * 100}%`;

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => handleGood()} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        average={average}
        total={total}
        positive={total !== 0 ? positive : undefined}
      />
    </div>
  );
};

export default App;
