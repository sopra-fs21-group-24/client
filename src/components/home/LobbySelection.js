import React from "react";
import { useHistory } from "react-router";
import { Button, Grid } from "semantic-ui-react";

const LobbySelection = ({
  toggleUsermodeDisplay,
  toggleCreateJoinLobbyDisplay,
  toggleGamemodeDisplay,
}) => {
  const history = useHistory();

  return (
    <Grid centered>
      <Grid.Row>
        <p>Create a new lobby or join an existing lobby!</p>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width="4">
          <Button
            size="big"
            fluid
            color="blue"
            onClick={() => {
              toggleCreateJoinLobbyDisplay();
              toggleGamemodeDisplay();
              history.push({
                pathname: "/lobby",
              });
            }}
          >
            Create Lobby
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
              history.push({
                pathname: "/lobby/join",
              });
            }}
          >
            Join Lobby
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
              toggleCreateJoinLobbyDisplay();
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

export default LobbySelection;
