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
    <Grid centered >
      <Grid.Row centered>
        <h1>Create a new lobby or join an existing lobby!</h1>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column centered width="7">
          <center>

          <Button
            size="big"
            fluid
            color="blue"
            onClick={async() => {
              await createLobby();
              LoaderExampleActive();
              toggleCreateJoinLobbyDisplay();
            }}
            >
            Create Lobby
          </Button>
            </center>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column centered width="7">
          <center>
            
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
            </center>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column centered width="7">
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
