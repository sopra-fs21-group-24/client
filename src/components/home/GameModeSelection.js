import React from "react";
import { Button } from "semantic-ui-react";

const GameModeSelection = ({ toggleGamemode, setGamemode }) => {
  return (
    <div class="ui list">
      <p>Choose which gamemode you want to play!</p>
      <div class="item">
        <Button
          color="blue"
          onClick={() => {
            setGamemode("time");
          }}
        >
          Time
        </Button>
      </div>
      <div class="item">
        <Button
          color="blue"
          onClick={() => {
            setGamemode("pixelation");
          }}
        >
          Pixelation
        </Button>
      </div>
      <div class="item">
        <Button
          color="blue"
          onClick={() => {
            setGamemode("clouds");
          }}
        >
          Clouds
        </Button>
      </div>
      <div class="item">
        <Button
          color="black"
          onClick={() => {
            toggleGamemode();
          }}
        >
          Go back
        </Button>
      </div>
    </div>
  );
};

export default GameModeSelection;
