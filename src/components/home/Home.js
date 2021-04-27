import React from "react";
// import ReactGlobe from "react-globe";
import { withRouter, useHistory } from "react-router-dom";
import { Advertisement, Grid, Segment } from "semantic-ui-react";
import { api, handleError } from "../../helpers/api";
import HomeHeader from "../../views/Header";
import GameModeSelection from "./GameModeSelection";
import LobbySelection from "./LobbySelection";
import UserModeSelection from "./UserModeSelection";

const adsEnabled = false;
class Home extends React.Component {_
  constructor() {
    super();
    this.state = {
      isUsermodeDisplayed: true,
      isGamemodeDisplayed: false,
      isCreateJoinLobbyDisplayed: false,
      selectedUsermode: null,
      selectedGamemode: null,
      userScore: null,
      user: null,
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

  // TODO: Maybe use localStorage instead of path variable to access the correct lobby
  sendCreateGameRequest = async () => {
    const requestBody = JSON.stringify({
      usermode: this.state.selectedUsermode,
      gamemode: this.state.selectedGamemode,
      creator: localStorage.getItem("currentUserId"),
      public: true,
    });
    try {
      const response = await api.post(`/games`, requestBody);
      const lobbyId = response.data.id;
      this.props.history.push(`/lobby/${lobbyId}`);
    } catch (error) {
      alert(
        `Something went wrong while joining the lobby\n${handleError(error)}`
      );
    }
  };

  async componentDidMount() {
    // this.fetchUserHighScore();
    this.getUser();
  }

  render() {
    return (
      <div>
        <HomeHeader
          logout={this.logout}
          updateUser={this.updateUser}
          userScore={this.state.userScore}
          user={this.state.user}
          height={"50"}
        />
        <Segment placeholder raised>
          <Grid columns={2} divided centered>
            <Grid.Row></Grid.Row>
            {adsEnabled ? (
              <Grid.Column>
                <Advertisement centered unit="half page" test="Half Page" />
              </Grid.Column>
            ) : null}

            <Grid.Column>
              {this.state.isUsermodeDisplayed === true ? (
                <UserModeSelection
                  toggleUsermodeDisplay={this.toggleUsermodeDisplay}
                  toggleGamemodeDisplay={this.toggleGamemodeDisplay}
                  toggleCreateJoinLobbyDisplay={
                    this.toggleCreateJoinLobbyDisplay
                  }
                  setUsermode={this.setUsermode}
                />
              ) : null}
              {this.state.isGamemodeDisplayed === true ? (
                <GameModeSelection
                  toggleUsermodeDisplay={this.toggleUsermodeDisplay}
                  toggleGamemodeDisplay={this.toggleGamemodeDisplay}
                  toggleCreateJoinLobbyDisplay={
                    this.toggleCreateJoinLobbyDisplay
                  }
                  usermode={this.state.selectedUsermode}
                  setGamemode={this.setGamemode}
                />
              ) : null}
              {this.state.isCreateJoinLobbyDisplayed === true ? (
                <LobbySelection
                  toggleUsermodeDisplay={this.toggleUsermodeDisplay}
                  toggleCreateJoinLobbyDisplay={
                    this.toggleCreateJoinLobbyDisplay
                  }
                  toggleGamemodeDisplay={this.toggleGamemodeDisplay}
                  sendCreateGameRequest={this.sendCreateGameRequest}
                />
              ) : null}
            </Grid.Column>
            <Grid.Column>
              <h1>Leaderboard will be displayed in this column!</h1>
            </Grid.Column>
          </Grid>
        </Segment>
        {/* <ReactGlobe height="100vh" width="100vw"/> */}
      </div>
    );
  }

  async getUser() {
    try {
      let userId = localStorage.getItem("currentUserId");
      const response = await api.get("/users/" + userId);
      let userScore:{
        "clouds":response.data.highClouds,
        "pixelation":response.data.highPixel,
        "time": response.data.highTime
      }
      this.setState({user:response.data, userScore:userScore});
    } catch (error) {
      alert(
        `Something went wrong while fetching the users: \n${handleError(error)}`
      );
    }
  }

  // async fetchUserHighScore(){
  //   //TODO: switch to real API - uncomment this
  //   let userId = localStorage.getItem("currentUserId");

  //   try {
  //     const response = await api.get("/users/" + userId + '/scores');
  //     // TODO: unset this
  //     // this.setState({ userScore: response.data });
  //     this.setState({
  //       userScore:{
  //       "clouds":1000,
  //       "pixelation":500,
  //       "time": 300
  //     }})
  //   } catch (error) {
  //     alert(
  //       `Something went wrong while fetching the your user: \n${handleError(
  //         error
  //       )}`
  //     );
  //   }

  // }

  async updateUser(username, password) {
    console.log(username, password);
    try {
      let userId = localStorage.getItem("currentUserId");
      let token = localStorage.getItem("token");
      let data = {
        username: username,
        password: password,
        token: token
      };
      let config = {
        headers: {
          token: `${token}`,
        },
      };
      const response = await api.put("/users/" + userId, data, config);

      this.getUser();
    } catch (error) {
      alert(
        `Something went wrong while fetching the users: \n${handleError(error)}`
      );
    }
  }

  // async componentDidMount() {

  // }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUserId");
    this.props.history.push("/");
  }

  // render() {
  //   return (
  //     <Container>
  //      <HomeHeader logout={this.logout} updateUser={this.updateUser} user={this.state.user} height = {"50"}/>
  //       <Label>Let's guess them coordinates:</Label>
  //     </Container>
  //   );
  // }
}

export default withRouter(Home);
