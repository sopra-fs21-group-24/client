import React from "react";
import { withRouter } from "react-router-dom";
import { Advertisement, Grid } from "semantic-ui-react";
import styled from "styled-components";
import { api, getAuthConfig, handleError } from "../../helpers/api";
import { BaseContainer } from "../../helpers/layout";
import HomeHeader from "../../views/Header";
import GameModeSelection from "./GameModeSelection";
import RoomSelection from "./RoomSelection";
import UserModeSelection from "./UserModeSelection";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;
const adsEnabled = false;
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      isUsermodeDisplayed: true,
      isGamemodeDisplayed: false,
      isCreateJoinLobbyDisplayed: false,
      selectedUsermode: null,
      selectedGamemode: null,
      userScore:null,
      user: null
    };

   
    this.updateUser = this.updateUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  toggleUsermodeDisplay = () => {
    this.setState({ isUsermodeDisplayed: !this.state.isUsermodeDisplayed });
  };

  toggleGamemodeDisplay = () => {
    this.setState({ isGamemodeDisplayed: !this.state.isGamemodeDisplayed });
  };

  toggleCreateJoinLobbyDisplay = () => {
    this.setState({
      isCreateJoinLobbyDisplayed: !this.state.isCreateJoinLobbyDisplayed,
    });
  };

  setUsermode = (usermode) => {
    this.setState({ selectedUsermode: usermode });
  };

  setGamemode = (gamemode) => {
    this.setState({ selectedGamemode: gamemode });
  };

  async componentDidMount() {
    this.fetchUserHighScore();
    this.getUser();

  }

  //#region User
  async getUser() {
    try {
      let userId = localStorage.getItem("currentUserId");
      const response = await api.get("/users/" + userId);

      this.setState({ user: response.data });
    } catch (error) {
      alert(
        `Something went wrong while fetching the your user: \n${handleError(
          error
        )}`
      );
    }
  }

  async updateUser(username, password) {
    let userId = localStorage.getItem("currentUserId");
    
    let data = {}
   
    // Only add what changed
    if (username)
      data.username = username
    if(password)
      data.password = password

  

    try {
      await api.put("/users/" + userId, data, getAuthConfig());

      // Then fetch the newly updated user
      await this.getUser();

    } catch (error) {
      alert(
        `Something went wrong while fetching the users: \n${handleError(error)}`
      );
    }
  }
  //#endregion User

  // #region Scoring
  async fetchUserHighScore(){
    //TODO: switch to real API - uncomment this
    // let userId = localStorage.getItem("currentUserId");

    // try {
    //   const response = await api.get("/users/" + userId + '/scores', getAuthConfig());

    //   this.setState({ userScore: response.data });
    // } catch (error) {
    //   alert(
    //     `Something went wrong while fetching the your user: \n${handleError(
    //       error
    //     )}`
    //   );
    // }

    let temporary = {
      "clouds":1000,
      "pixelation":500,
      "time": 300
    }
    this.setState({ userScore: temporary});
    console.log("USER score", this.state)
  }

  //#endregion Scoring

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUserId");
    this.props.history.push("/login");
  }
  render() {
    return (
      <div>
        <HomeHeader
          logout={this.logout}
          updateUser={this.updateUser}
          user={this.state.user}
          userScore={this.state.userScore}
          height={"50"}
        />

        <Grid columns={2} divided centered>
          
          <Grid.Row></Grid.Row>
          
          {adsEnabled ? (
            <Grid.Column>
              <Advertisement centered unit="half page" test="Half Page" />
            </Grid.Column>
          ) : null}

          <Grid.Column>
            {this.state.isUsermodeDisplayed == true ? (
              <UserModeSelection
                toggleUsermodeDisplay={this.toggleUsermodeDisplay}
                toggleGamemodeDisplay={this.toggleGamemodeDisplay}
                toggleCreateJoinLobbyDisplay={this.toggleCreateJoinLobbyDisplay}
                setUsermode={this.setUsermode}
              />
            ) : null}
            {this.state.isGamemodeDisplayed == true ? (
              <GameModeSelection
                toggleUsermodeDisplay={this.toggleUsermodeDisplay}
                toggleGamemodeDisplay={this.toggleGamemodeDisplay}
                toggleCreateJoinLobbyDisplay={this.toggleCreateJoinLobbyDisplay}
                usermode={this.state.selectedUsermode}
                setGamemode={this.setGamemode}
              />
            ) : null}
            {this.state.isCreateJoinLobbyDisplayed == true ? (
              <RoomSelection
                toggleUsermodeDisplay={this.toggleUsermodeDisplay}
                toggleCreateJoinLobbyDisplay={this.toggleCreateJoinLobbyDisplay}
                toggleGamemodeDisplay={this.toggleGamemodeDisplay}
              />
            ) : null}
          </Grid.Column>
          <Grid.Column>
            <p>Leaderboard will be displayed in this column!</p>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Home);
