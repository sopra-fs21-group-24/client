import React from "react";
import { Button, Grid, Icon } from "semantic-ui-react";

const UserModeSelection = ({
  toggleUsermodeDisplay,
  toggleGamemodeDisplay,
  toggleCreateJoinLobbyDisplay,
  setUsermode,
}) => {
  return (
    <Grid centered>
      <Grid.Row>
        <h1>Start a singleplayer game or play with friends!</h1>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column centered>
          <center>

          <Button
            size="huge"
            // fluid
            animated
            color="green"
            onClick={() => {
              toggleUsermodeDisplay();
              toggleGamemodeDisplay();
            }}
            >
            <Button.Content visible>Singleplayer</Button.Content>
            <Button.Content hidden>
              <Icon name="user" />
            </Button.Content>
          </Button>
            </center>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column  centered>
          <center>

          <Button
            size="huge"
            // fluid
            animated
            color="red"
            onClick={() => {
              toggleUsermodeDisplay();
              toggleCreateJoinLobbyDisplay();
            }}
            >
            <Button.Content visible>Multiplayer</Button.Content>
            <Button.Content hidden>
              <Icon name="users" />
            </Button.Content>
          </Button>
            </center>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default UserModeSelection;
