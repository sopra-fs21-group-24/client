import React from "react";
import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";

const Countdown = (props) => {
  const { initialMinute = 0, initialSeconds = 5 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          props.nextRound();
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div>
      {minutes === 0 && seconds === 0 ? null : (
        <Button color="teal" fluid size="large">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </Button>
      )}
    </div>
  );
};

export default Countdown;
