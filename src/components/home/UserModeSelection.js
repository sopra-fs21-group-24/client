import React from "react";
import { Button, Grid, Icon } from "semantic-ui-react";

const UserModeSelection = ({
  toggleUsermodeDisplay,
  toggleGamemodeDisplay,
  toggleCreateJoinRoomDisplay,
  setUsermode,
}) => {
  return (
    <Grid centered> 
      <Grid.Row>
        <p>Start a singleplayer game or play with friends!</p>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width="6">
          <Button
            size="big"
            fluid
            animated
            color="green"
            onClick={() => {
              toggleUsermodeDisplay();
              toggleGamemodeDisplay();
              setUsermode("singleplayer");
            }}
          >
            <Button.Content visible>Singleplayer</Button.Content>
            <Button.Content hidden>
              <Icon name="user" />
            </Button.Content>
          </Button>
          </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width="6">
          <Button
            size="big"
            fluid
            animated
            color="red"
            onClick={() => {
              toggleUsermodeDisplay();
              toggleCreateJoinRoomDisplay();
              setUsermode("multiplayer");
            }}
          >
            <Button.Content visible>Multiplayer</Button.Content>
            <Button.Content hidden>
              <Icon name="users" />
            </Button.Content>
          </Button>
          </Grid.Column>
      </Grid.Row>
      </Grid>
  );
};

export default UserModeSelection;
