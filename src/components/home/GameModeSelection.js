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
    <Grid centered >
      <Grid.Row centered>
        <h1>Choose which gamemode you want to play!</h1>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column centered width={7}>
          <center >

          <Button
            size="big"
            // fluid
            color="blue"
            onClick={() => {
              createSingleplayerGame("Time");
            }}
            >
            Time
          </Button>
            </center>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column centered width={7}>
        <center>
          <Button
            size="big"
            fluid
            color="blue"
            onClick={() => {
              createSingleplayerGame("Pixelation");
            }}
          >
            Pixelation
          </Button>
          </center>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column centered width={7}>
          <center>
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
          </center>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column centered>
          <center>

        
          <Button
            size="big"
            // fluid
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
          </center>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default GameModeSelection;
