import React from "react";
import { Button, Icon, Grid } from "semantic-ui-react";

const GameModeSelection = ({
  toggleGamemodeDisplay,
  toggleUsermodeDisplay,
  toggleCreateJoinLobbyDisplay,
  usermode,
  createSingleplayerGame,
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
            animated ='fade'
            fluid
            color="blue"
            onClick={() => {
              createSingleplayerGame("Time");
            }}
          >
            <Button.Content visible>Time</Button.Content>
            <Button.Content hidden><Icon name="clock outline" /></Button.Content>

          </Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width="4">
          <Button
            size="big"
            animated ='fade'
            fluid
            color="blue"
            onClick={() => {
              createSingleplayerGame("Pixelation");
            }}
          >
            <Button.Content visible>Pixelation</Button.Content>
            <Button.Content hidden><Icon name="chess board" /></Button.Content>
            
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width="4">
          <Button
            disabled
            size="big"
            fluid
            color="blue"
            onClick={() => {
              createSingleplayerGame("Clouds");
            }}
          >
            Coming Soon 
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
