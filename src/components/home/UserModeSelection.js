import React, { useState } from "react";
import { Button } from "semantic-ui-react";

const UserModeSelection = ({
  toggleUsermodeDisplay,
  toggleGamemodeDisplay,
  toggleCreateJoinRoomDisplay,
  setUsermode,
}) => {
  return (
    <div class="ui list">
      <p>Start a singleplayer game or play with friends!</p>
      <div class="item">
        <Button
          color="green"
          onClick={() => {
            toggleUsermodeDisplay();
            toggleGamemodeDisplay();
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
            toggleUsermodeDisplay();
            toggleCreateJoinRoomDisplay();
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