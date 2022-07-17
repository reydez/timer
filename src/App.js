import { useEffect, useState } from "react";

function App() {
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        const computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;

        const computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setCounter((counter) => counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  const stopTime = () => {
    setIsActive(false);
    setCounter(0);
    setMinute("00");
    setSecond("00");
  };

  return (
    <div className="App">
      <div className="timer-container">
        <span className="minute">{minute}</span>
        <span>:</span>
        <span className="second">{second}</span>
      </div>
      <div className="btns-container">
        <button className="start" onClick={() => setIsActive(!isActive)}>
          {isActive ? "Pause" : "Play"}
        </button>
        <button className="reset" onClick={stopTime}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
