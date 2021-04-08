import React from "react";
import { Button, Grid, Segment } from "semantic-ui-react";

const RoomSelection = ({
  toggleUsermodeDisplay,
  toggleCreateJoinRoomDisplay,
  toggleGamemodeDisplay,
}) => {
  return (
    <Grid centered>
      <Grid.Row>
        <p>Create a new room or join an existing room!</p>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width="4">
          <Button
            size="big"
            fluid
            color="blue"
            onClick={() => {
              toggleCreateJoinRoomDisplay();
              toggleGamemodeDisplay();
            }}
          >
            Create Room
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width="4">
          <Button size="big" fluid color="blue" onClick={() => {}}>
            Join Room
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width="4">
          <Button
            size="big"
            fluid
            color="black"
            onClick={() => {
              toggleCreateJoinRoomDisplay();
              toggleUsermodeDisplay();
            }}
          >
            Go back
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default RoomSelection;
