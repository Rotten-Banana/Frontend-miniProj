import React from "react";
import { useState, useEffect } from "react";

const Timer = () => {
  const [timer, settimer] = useState(5);
  const [isActive, setisActive] = useState(false);
  const toogleIsActive = () => {
    setisActive(!isActive);
  };
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        settimer((timer) => timer - 1);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);
  return (
    <div>
      <div>
        <h1>{timer}</h1>
      </div>
      <button onClick={toogleIsActive}>timer</button>
    </div>
  );
};

export default Timer;
