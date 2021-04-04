import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import GameModeSelection from "./GameModeSelection";

const UserModeSelection = ({ toggleGamemode, setUsermode }) => {
  return (
    <div class="ui list">
      <p>Start a singleplayer game or play with friends!</p>
      <div class="item">
        <Button
          color="green"
          onClick={() => {
            toggleGamemode();
            setUsermode("singleplayer");
          }}
        >
          Singleplayer
        </Button>
      </div>
      <div class="item">
        <Button
          color="red"
          onClick={() => {
            toggleGamemode();
            setUsermode("multiplayer");
          }}
        >
          Multiplayer
        </Button>
      </div>
    </div>
  );
};

export default UserModeSelection;
