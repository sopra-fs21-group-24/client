import React from "react";
import { useState, useEffect } from "react";
import { Button, Divider } from "semantic-ui-react";
import useSound from "use-sound";
import boop from "../../../sounds/boop.mp3";
import roundstart from "../../../sounds/roundstart.mp3";
import sheesh from "../../../sounds/sheesh.mp3";

const Countdown = (props) => {
  const { initialMinute = 0, initialSeconds = 10 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [playCountdown] = useSound(boop);
  const [playNextRound] = useSound(roundstart, { volume: 0.25 });
  const [playSheesh] = useSound(sheesh,{ volume: 0.25 });

  useEffect(() => {
    if (seconds == initialSeconds && props.score > 450){
      playSheesh()
    }
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
        if(seconds < 5 && seconds > 0) {
          playCountdown();
        }
      }
      if (seconds === 0) {
        if (minutes === 0) {
          playNextRound();
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
      <Divider horizontal> next round</Divider>
      {minutes === 0 && seconds === 0 ? null : (
        <Button color="teal" fluid size="large">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </Button>
      )}
    </div>
  );
};

export default Countdown;
