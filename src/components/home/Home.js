import React from "react";
import { api, handleError } from "../../helpers/api";
import { withRouter } from "react-router-dom";
import UserModeSelection from "./UserModeSelection";
import GameModeSelection from "./GameModeSelection";
import RoomSelection from "./RoomSelection";
import { Button, Grid, Segment, Image } from "semantic-ui-react";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      isUsermodeDisplayed: true,
      isGamemodeDisplayed: false,
      isCreateJoinRoomDisplayed: false,
      selectedUsermode: null,
      selectedGamemode: null,
    };
  }

  toggleUsermodeDisplay = () => {
    this.setState({ isUsermodeDisplayed: !this.state.isUsermodeDisplayed });
  };

  toggleGamemodeDisplay = () => {
    this.setState({ isGamemodeDisplayed: !this.state.isGamemodeDisplayed });
  };

  toggleCreateJoinRoomDisplay = () => {
    this.setState({
      isCreateJoinRoomDisplayed: !this.state.isCreateJoinRoomDisplayed,
    });
  };

  setUsermode = (usermode) => {
    this.setState({ selectedUsermode: usermode });
  };

  setGamemode = (gamemode) => {
    this.setState({ selectedGamemode: gamemode });
  };

  async componentDidMount() {
    try {
    } catch (error) {
      alert(
        `Something went wrong while fetching the users: \n${handleError(error)}`
      );
    }
  }

  render() {
    return (
      <Grid columns={2} divided centered>
        <Grid.Row>
          <h1>Welcome to MAPGUESSЯ</h1>
        </Grid.Row>
        <Grid.Column>
          {this.state.isUsermodeDisplayed == true ? (
            <UserModeSelection
              toggleUsermodeDisplay={this.toggleUsermodeDisplay}
              toggleGamemodeDisplay={this.toggleGamemodeDisplay}
              toggleCreateJoinRoomDisplay={this.toggleCreateJoinRoomDisplay}
              setUsermode={this.setUsermode}
            />
          ) : null}
          {this.state.isGamemodeDisplayed == true ? (
            <GameModeSelection
              toggleUsermodeDisplay={this.toggleUsermodeDisplay}
              toggleGamemodeDisplay={this.toggleGamemodeDisplay}
              toggleCreateJoinRoomDisplay={this.toggleCreateJoinRoomDisplay}
              usermode={this.state.selectedUsermode}
              setGamemode={this.setGamemode}
            />
          ) : null}
          {this.state.isCreateJoinRoomDisplayed == true ? (
            <RoomSelection
              toggleUsermodeDisplay={this.toggleUsermodeDisplay}
              toggleCreateJoinRoomDisplay={this.toggleCreateJoinRoomDisplay}
              toggleGamemodeDisplay={this.toggleGamemodeDisplay}
            />
          ) : null}
        </Grid.Column>
        <Grid.Column>
          <p>Leaderboard will be displayed in this segment!</p>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(Home);
