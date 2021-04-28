import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  Button,
  Grid,
  Segment,
  Dimmer,
  Loader,
  Image,
} from "semantic-ui-react";
import { handleError, api } from "../../helpers/api";

const LobbySelection = ({
  toggleUsermodeDisplay,
  toggleCreateJoinLobbyDisplay,
  toggleGamemodeDisplay,
  createLobby,
}) => {
  const history = useHistory();

  const LoaderExampleActive = () => (
    <Segment>
      <Loader active />
      <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
    </Segment>
  );

  return (
    <Grid centered>
      <Grid.Row>
        <h1>Create a new lobby or join an existing lobby!</h1>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width="4">
          <Button
            size="big"
            fluid
            color="blue"
            onClick={() => {
              toggleCreateJoinLobbyDisplay();
              LoaderExampleActive();
              createLobby();
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
