import { useState } from "react";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};
const Statistics = ({ total, average, positiveFeedBack }) => {
  if (total === 0) {
    return <>No Feedbad given </>;
  }
  return (
    <>
      <br />
      All {total}
      <br />
      average {average}
      <br />
      Positive {positiveFeedBack.toFixed(1)}
    </>
  );
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const handleGood = () => {
    setGood(good + 1);
    setTotal(total + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
    setTotal(total + 1);
  };
  const average = total === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / total;
  const positiveFeedBack = total === 0 ? 0 : (good / total) * 100;
  return (
    <>
      <h1>Give Feedback</h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <br />
      Good {good}
      <br />
      Neutral {neutral}
      <br />
      Bad {bad}
      <br />
      <Statistics
        total={total}
        average={average}
        positiveFeedBack={positiveFeedBack}
      />
    </>
  );
};

export default App;
