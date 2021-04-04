import React from "react";
import { api, handleError } from "../../helpers/api";
import { withRouter } from "react-router-dom";
import UserModeSelection from "./UserModeSelection";
import GameModeSelection from "./GameModeSelection";
import RoomSelection from "./RoomSelection";

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
      <div class="ui center aligned container">
        <h1>Welcome to MAPGUESSЯ</h1>
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
        <p> SELECTED USERMODE: {this.state.selectedUsermode}</p>
        <p> SELECTED GAMEMODE: {this.state.selectedGamemode}</p>
      </div>
    );
  }
}

export default withRouter(Home);
