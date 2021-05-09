import React from "react";
// import ReactGlobe from "react-globe";
import {
  ComponentTransition,
  AnimationTypes,
} from "react-component-transition";
import { withRouter, useHistory } from "react-router-dom";
import { Advertisement, Grid, Segment, Image, Header } from "semantic-ui-react";
import { api, getAuthConfig, handleError } from "../../helpers/api";
import HomeHeader from "../../views/Header";
import GameModeSelection from "./GameModeSelection";
import LobbySelection from "./LobbySelection";
import UserModeSelection from "./UserModeSelection";
import LeaderboardLoader from "./Leaderboard";
import {
  getWindowDimensions,
  useWindowDimensions,
} from "../shared/models/WindowSize";

const adsEnabled = false;

class Home extends React.Component {
  _;
  constructor() {
    super();
    this.state = {
      isUsermodeDisplayed: true,
      isGamemodeDisplayed: false,
      isCreateJoinLobbyDisplayed: false,
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

  // API Call to create a new singleplayer game
  // /games/{gameId}/start endpoint returns a game, what to do with it?
  createSingleplayerGame = async (gamemode) => {
    let oldGameId = localStorage.getItem("gameId")
    const requestBody = JSON.stringify({
      userId: localStorage.getItem("currentUserId"),
      usermode: "Singleplayer",
      gamemode: gamemode,
      publicStatus: false,
    });

    await api
      .post(`/games`, requestBody, getAuthConfig())
      .then(async (response) => {
        localStorage.setItem("gameId", response.data.gameId);
        await api
          .get(`/games/${response.data.gameId}/start`, getAuthConfig())
          .then(() => {
            this.props.history.push(`/game`);
          });
      })
      .catch(async (err) => {
        console.log(err.response)
        if (err.response.status == 412  && oldGameId != null){
          let conf = window.confirm
          ("Want us to cancel your ongoing game and start this new one?")
          if (conf == true){

            await api
              .get("/games/" + oldGameId + "/exit", getAuthConfig())
              .then(() => {
                console.log("ending cancelled game");
                this.createSingleplayerGame(gamemode) //TODO: possible recursion trap
              });
          }
        } else {

          alert(
            `Something went wrong when creating a singleplayer game\n${handleError(
              err
            )}`
            );
          }
      });
  };

  // API Call to create a new multiplayer game/lobby
  createLobby = async () => {
    const requestBody = JSON.stringify({
      userId: localStorage.getItem("currentUserId"),
      usermode: "Multiplayer",
      gamemode: "Time",
      publicStatus: true,
    });

    await api
      .post(`/games`, requestBody, getAuthConfig())
      .then(async (response) => {
        localStorage.setItem("lobbyId", response.data.lobbyId);
        localStorage.setItem("gameId", response.data.gameId);
        this.props.history.push(`/lobby`);
      })
      .catch((error) => {
        this.toggleCreateJoinLobbyDisplay()
        alert(
          `Something went wrong when creating a multiplayer lobby\n${handleError(
            error
          )}`
        );
      });
  };

  async componentDidMount() {
    this.getUser();
  }

  render() {
    const { height, width } = getWindowDimensions();
    return (
      <div
        style={{
          backgroundImage: `url(./wallpaper.jpeg)`,
          height: height,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <ComponentTransition
          animateOnMount={true}
          enterAnimation={AnimationTypes.slideUp.enter}
          exitAnimation={AnimationTypes.slideUp.exit}
        >
          <HomeHeader
            logout={this.logout}
            updateUser={this.updateUser}
            userScore={this.state.userScore}
            user={this.state.user}
            height={"50"}
          />
        </ComponentTransition>
        <div
          style={{
            marginLeft: "50px",
            marginRight: "50px",
            marginTop: "125px",
          }}
        >
          {/* <Segment placeholder raised> */}
          <ComponentTransition
            animateOnMount={true}
            enterAnimation={AnimationTypes.slideDown.enter}
            exitAnimation={AnimationTypes.fade.exit}
          >
            <Grid columns={2} centered>
              {/* <Grid.Row></Grid.Row> */}

              <Grid.Column style={{ minWidth: "300px" }}>
                <Segment raised>
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
                      createSingleplayerGame={this.createSingleplayerGame}
                    />
                  ) : null}
                  {this.state.isCreateJoinLobbyDisplayed === true ? (
                    <LobbySelection
                      toggleUsermodeDisplay={this.toggleUsermodeDisplay}
                      toggleCreateJoinLobbyDisplay={
                        this.toggleCreateJoinLobbyDisplay
                      }
                      toggleGamemodeDisplay={this.toggleGamemodeDisplay}
                      createLobby={this.createLobby}
                    />
                  ) : null}
                </Segment>
              </Grid.Column>
              <Grid.Column style={{ minWidth: "300px" }}>
                <Segment raised>
                  <Header as="h1" textAlign="center">
                    Leaderboard
                  </Header>
                  <LeaderboardLoader />
                </Segment>
              </Grid.Column>
            </Grid>
          </ComponentTransition>
        </div>
      </div>
    );
  }

  async getUser() {
    try {
      let userId = localStorage.getItem("currentUserId");
      const response = await api.get("/users/" + userId);
      let userScore = {
        clouds: response.data.highscores.Clouds,
        pixelation: response.data.highscores.Pixelation,
        time: response.data.highscores.Time,
      };
      this.setState({ user: response.data, userScore: userScore });
    } catch (error) {
      alert(
        "While getting your user data we came across an error, you will be logged out and navigate to the landing page!"
      );
      this.logout();
    }
  }

  async updateUser(username, password) {
    console.log(username, password);
    try {
      let userId = localStorage.getItem("currentUserId");
      let token = localStorage.getItem("token");
      let data = {
        username: username,
        password: password,
        token: token,
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
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("username");
    this.props.history.push("/");
  }
}

export default withRouter(Home);
