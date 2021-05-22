import React from "react";
// import ReactGlobe from "react-globe";
import {
  ComponentTransition,
  AnimationTypes,
} from "react-component-transition";
import { withRouter, useHistory } from "react-router-dom";
import { Advertisement, Grid, Segment, Image } from "semantic-ui-react";
import { api, getAuthConfig, handleError } from "../../helpers/api";
import HomeHeader from "../../views/Header";
import GameModeSelection from "./GameModeSelection";
import LobbySelection from "./LobbySelection";
import UserModeSelection from "./UserModeSelection";
import Leaderboard from "./Leaderboard";
import {
  getWindowDimensions,
  useWindowDimensions,
} from "../shared/models/WindowSize";
import styled from "styled-components";
import swal from "sweetalert";

const adsEnabled = false;

const Footer = styled.footer`
  text-align: center;
  text-shadow: 2px 2px black;
  font-size: 20px;
  color: white;
  bottom: 10px;
  position: fixed;
`;

const Header = styled.h1`
  text-align: center;
  text-shadow: 2px 2px #006699;
  font-size: 30px;
  color: white;
  width: 100%;
`;

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
        if (err.response.status == 412  && oldGameId != null){
          let conf = window.confirm
          ("Want us to cancel your ongoing game and start this new one?")
          if (conf == true){

            await api
              .get("/games/" + oldGameId + "/exit", getAuthConfig())
              .then(() => {
                // console.log("ending cancelled game");
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
    let oldLobbyId = localStorage.getItem("lobbyId")

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
      .catch(async (err) => {

        this.toggleCreateJoinLobbyDisplay();
       
        if (err.response.status == 412  && oldLobbyId != null){
          let conf = window.confirm
          ("Want us to cancel your ongoing lobby and create a new one?")
          if (conf == true){
            await api.put(
              `/lobby/${oldLobbyId}`,
              {},
              getAuthConfig()
            ).then(()=>{
              // console.log("CANCELLED OLD LOBBY")
              localStorage.removeItem("lobbyId");
              this.createLobby()
              
            })

            // await aspi
            //   .get("/games/" + oldGameId + "/exit", getAuthConfig())
            //   .then(() => {
            //     console.log("cancelled old lobby");
            //     this.createLobby() //TODO: possible recursion trap
            //   });
          }
        } else {
          if (window.confirm("Something went wrong when creating a multiplayer lobby. Would you like to know more about the error?")){
            alert(`Error Details: ${handleError(err)}`)
          }
          }
      });
  };

  async componentDidMount() {
    this.getUser();
  }

  render() {
    const { height, width } = getWindowDimensions();
    return (
      <div>
        <video 
        autoPlay 
        loop 
        muted
        style={{position:"absolute",
                width:"100%",
                left: "50%",
                top:"50%",
                height:"100%",
                objectFit:"cover",
                transform:"translate(-50%,-50%)",
                zIndex:"-1"
        }}
         >
           <source src={window.location.origin + "/Earth3.mp4"} type="video/mp4"/>
        </video>
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
              </Grid.Column>
              <Grid.Column style={{ minWidth: "300px" }}>  
                  <Header as="h1" textAlign="center">
                    Leaderboards
                  </Header>
                  <Leaderboard />
              </Grid.Column>
            </Grid>
          </ComponentTransition>
          <Footer>Made with &hearts; by UZH students</Footer>
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
      this.logout();
    }
  }

  async updateUser(username, password) {
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
      
      swal("Something went wrong while updating your user","Maybe the username is already taken","error")
    
    }
  }
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("username");
    localStorage.removeItem("gameId");
    localStorage.removeItem("lobbyId");
    this.props.history.push("/");
  }
}

export default withRouter(Home);
