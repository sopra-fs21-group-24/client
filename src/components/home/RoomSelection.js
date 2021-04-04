import React from "react";
import { Button } from "semantic-ui-react";

const RoomSelection = ({
  toggleUsermodeDisplay,
  toggleCreateJoinRoomDisplay,
  toggleGamemodeDisplay,
}) => {
  return (
    <div class="ui list">
      <p>Create a new room or join an existing room!</p>
      <div class="item">
        <Button
          color="blue"
          onClick={() => {
            toggleCreateJoinRoomDisplay();
            toggleGamemodeDisplay();
          }}
        >
          Create
        </Button>
      </div>
      <div class="item">
        <Button color="blue" onClick={() => {}}>
          Join
        </Button>
      </div>
      <div class="item">
        <Button
          color="black"
          onClick={() => {
            toggleCreateJoinRoomDisplay();
            toggleUsermodeDisplay();
          }}
        >
          Go back
        </Button>
      </div>
    </div>
  );
};

export default RoomSelection;
