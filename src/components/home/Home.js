import React from "react";
import { api, handleError } from "../../helpers/api";
import { withRouter } from "react-router-dom";
import UserModeSelection from "./UserModeSelection";
import GameModeSelection from "./GameModeSelection";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null,
      isUsermodeDisplayed: true,
      isGamemodeDisplayed: false,
      selectedUsermode: null,
      selectedGamemode: null,
    };
  }

  toggleGamemode = () => {
    this.setState({ isUsermodeDisplayed: !this.state.isUsermodeDisplayed });
    this.setState({ isGamemodeDisplayed: !this.state.isGamemodeDisplayed });
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
      <div class="ui segment">
        <h1>Welcome to MAPGUESSЯ</h1>
        {this.state.isUsermodeDisplayed == true ? (
          <UserModeSelection
            toggleGamemode={this.toggleGamemode}
            setUsermode={this.setUsermode}
          />
        ) : null}
        {this.state.isGamemodeDisplayed == true ? (
          <GameModeSelection
            toggleGamemode={this.toggleGamemode}
            setGamemode={this.setGamemode}
          />
        ) : null}
      </div>
    );
  }
}

export default withRouter(Home);
