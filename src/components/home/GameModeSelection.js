import React from "react";
import { Button, Icon, Grid } from "semantic-ui-react";

const GameModeSelection = ({
  toggleGamemodeDisplay,
  toggleUsermodeDisplay,
  toggleCreateJoinLobbyDisplay,
  setGamemode,
  usermode,
}) => {

  return (
    <Grid centered>
      <Grid.Row>
        <h1>Choose which gamemode you want to play!</h1>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width="4">
          <Button
            size="big"
            fluid
            animated
            color="blue"
            onClick={() => {
              setGamemode("time");
            }}
          >
            <Button.Content visible>Time</Button.Content>
            <Button.Content hidden>
              <Icon name="hourglass half" />
            </Button.Content>
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width="4">
          <Button
            size="big"
            fluid
            color="blue"
            onClick={() => {
              setGamemode("pixelation");
            }}
          >
            Pixelation
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width="4">
          <Button
            size="big"
            fluid
            color="blue"
            onClick={() => {
              setGamemode("clouds");
            }}
          >
            Clouds
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
              if (usermode === "multiplayer") {
                toggleGamemodeDisplay();
                toggleCreateJoinLobbyDisplay();
              } else {
                toggleGamemodeDisplay();
                toggleUsermodeDisplay();
              }
            }}
          >
            Go back
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default GameModeSelection;
