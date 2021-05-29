import React from "react";
import {
  ComponentTransition,
  AnimationTypes,
} from "react-component-transition";
import { fadeIn } from "react-animations";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withRouter } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {
  Button,
  Checkbox,
  Grid,
  Image,
  Table,
  TableHeader,
  Segment,
  Input,
  Icon,
  Menu,
  Modal,
  Header,
} from "semantic-ui-react";
import { handleError, api, getAuthConfig } from "../../helpers/api";
import { getWindowDimensions } from "../shared/models/WindowSize";
import Loader from "react-loader-spinner";
import "../../views/design/lobby.css";
import axios from 'axios';

let sourceLobby = axios.CancelToken.source();

class Lobby extends React.Component {
  constructor() {
    super();
    this.state = {
      lobbyId: null,
      selectedGamemode: "",
      roomKey: "",
      isLobbyPublic: null,
      creator: null,
      round: 0,
      users: [],
      isUpdating: false,
      hasGameStarted: false,
      gameId: null,
      init: true,
    };
  }

  startGame = async () => {
    const gameId = localStorage.getItem("gameId");
    try {
      const response = await api.get(`/games/${gameId}/start`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      this.setState({ hasGameStarted: true });
      this.props.history.push("/game");
    } catch (error) {
      // if (error.response.status == 412) {
      //   alert("yooo");
      // }
      if (
        window.confirm(
          "Something went wrong when trying to start your game. Would you like to know more about the error?"
        )
      ) {
        alert(`Error Details: ${handleError(error)}`);
      }
    }
  };

  fetchGame = async () => {
    const gameId = localStorage.getItem("gameId");
    try {
      const response = await api.get(`/games/${gameId}/`, getAuthConfig());
      this.setState({ round: response.data.round });
      console.log("Fetched this round: ", this.state.round);
    } catch (error) {
      console.log(`Cannot fetch the game`)
      
    }
  };

  listenForGameStart = async () => {
    let userId = localStorage.getItem("currentUserId");
    // console.log("start listening for games");
    // console.log(this.state.round, this.mounted);
    while (this.state.round == 0 && this.mounted) {
      await this.fetchGame();
      // console.log("Fetched Game and round is ", this.state.round);
      // wait for 1 s and fetch scores again
      if (this.state.round == 1 && this.state.creator !== userId) {
        this.setState({ hasGameStarted: true });
        this.props.history.push("/game");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // if (!this.state.mounted) return;
    }
  };

  // API Call to update lobby visibility & gamemode
  updateLobbyConfiguration = () => {
    const gameId = localStorage.getItem("gameId");
    this.setState({ hasGameStarted: true });

    const requestBody = JSON.stringify({
      userId: localStorage.getItem("currentUserId"),
      gamemode: this.state.selectedGamemode,
      publicStatus: this.state.isLobbyPublic,
    });

    try {
      api.put(`/games/${gameId}`, requestBody, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      this.setState({ isUpdating: false });
      this.setState({ hasGameStarted: false });
    } catch (error) {
      if (
        window.confirm(
          "Something went wrong when trying to update the lobby configuration. Would you like to know more about the error?"
        )
      ) {
        alert(`Error Details: ${handleError(error)}`);
      }
    }
  };

  // API Call to remove the user from the lobby list
  leaveLobby = async () => {
    sourceLobby.cancel();
    try {
      await api.put(`/lobby/${this.state.lobbyId}`, {}, getAuthConfig());

      localStorage.removeItem("lobbyId");
      localStorage.removeItem("gameId");
      this.props.history.push("/lobby/join");
    } catch (error) {
      if (
        window.confirm(
          "Something went wrong when trying to leave the lobby. Would you like to know more about the error?"
        )
      ) {
        alert(`Error Details: ${handleError(error)}`);
      }
    }
  };

  handleItemClick = (e, { name }) => {
    this.setState({ selectedGamemode: name });
    this.setState({ isUpdating: true });
    setTimeout(this.updateLobbyConfiguration, 1500);
  };

  handleTabClosing = () => {
    this.leaveLobby();
  }

  alertUser = (event) => {
    event.preventDefault();
    event.returnValue = '';
  }

  async componentDidMount() {
    this.mounted = true;
    const lobbyId = localStorage.getItem("lobbyId");
    //window.addEventListener('unload', this.handleTabClosing);
    

    if (!this.state.hasGameStarted && !this.state.isUpdating && this.mounted) {
      try {
        const response = await api.get(`/lobby/${lobbyId}`, {
          headers: {
            initial: this.state.init,
          },
        });
        this.setState({ lobbyId: response.data.id });
        this.setState({ creator: response.data.creator });
        this.setState({ users: response.data.users });
        this.setState({ roomKey: response.data.roomKey });
        this.setState({ isLobbyPublic: response.data.publicStatus });
        this.setState({ gameId: response.data.gameId });
        this.setState({ selectedGamemode: response.data.gamemode.name });

        localStorage.removeItem("gameId");
        localStorage.setItem("gameId", this.state.gameId);
      } catch (error) {
        console.log(`Cannot fetch the lobby`);
      }
    }

    this.setState({ init: false });
    this.listenForGameStart();

    while (
      !this.state.hasGameStarted &&
      !this.state.isUpdating &&
      this.mounted
    ) {
      try {
        const response = await api.get(`/lobby/${lobbyId}`, {
          headers: {
            initial: this.state.init,
          },
          cancelToken: sourceLobby.token
        });
        this.setState({ lobbyId: response.data.id });
        this.setState({ creator: response.data.creator });
        this.setState({ users: response.data.users });
        this.setState({ roomKey: response.data.roomKey });
        this.setState({ isLobbyPublic: response.data.publicStatus });
        this.setState({ gameId: response.data.gameId });
        this.setState({ selectedGamemode: response.data.gamemode.name });

        localStorage.removeItem("gameId");
        localStorage.setItem("gameId", this.state.gameId);
      } catch (error) {
        console.log(`Cannot fetch the lobby`);
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    //window.removeEventListener('unload', this.handleTabClosing);
  }

  render() {
    const { height, width } = getWindowDimensions();

    return (
      <div
        style={{
          backgroundImage: `url(../wallpaper.jpeg)`,
          height: height,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          // overflow: "hidden",
        }}
      >
        <Modal
          className="ui fullscreen modal"
          basic
          dimmer="blurring"
          open={true}
        >
          <Modal.Content>
            <ComponentTransition
              animateOnMount={true}
              enterAnimation={AnimationTypes.slideDown.enter}
              exitAnimation={AnimationTypes.fade.exit}
            >
              <Grid centered columns={3} verticalAlign="top">
                <Grid.Row>
                  <Grid.Column centered textAlign="center" width="4">
                    <Segment raised padded="very" size="big">
                      <Header>Lobby Configuration</Header>
                      {this.state.isUpdating ? (
                        <Loader
                          type="ThreeDots"
                          color="#008080"
                          height={50}
                          width={50}
                        />
                      ) : (
                        <div>
                          <Menu color="teal" compact secondary fluid>
                            <Menu.Item
                              name="Time"
                              active={this.state.selectedGamemode === "Time"}
                              position="left"
                              disabled={
                                !localStorage.getItem("currentUserId") ===
                                this.state.creator
                              }
                              onClick={this.handleItemClick}
                            >
                              <Icon name="clock outline" />
                              Time
                            </Menu.Item>
                            <Menu.Item
                              name="Pixelation"
                              active={
                                this.state.selectedGamemode === "Pixelation"
                              }
                              onClick={this.handleItemClick}
                            >
                              <Icon name="chess board" />
                              Pixelation
                            </Menu.Item>
                            <Menu.Item
                              name="Clouds"
                              active={this.state.selectedGamemode === "Clouds"}
                              position="right"
                              onClick={this.handleItemClick}
                            >
                              <Icon name="cloud" />
                              Clouds
                            </Menu.Item>
                          </Menu>
                          <p></p>
                          <Checkbox
                            toggle
                            checked={this.state.isLobbyPublic}
                            fitted
                            label="Public Lobby"
                            onChange={() => {
                              this.setState({
                                isLobbyPublic: !this.state.isLobbyPublic,
                              });
                              this.setState({ isUpdating: true });
                              setTimeout(this.updateLobbyConfiguration, 1500);
                            }}
                          />
                        </div>
                      )}
                    </Segment>
                  </Grid.Column>
                  <Grid.Column centered textAlign="center" width="7">
                    <Segment raised padded="very" size="big">
                      <Header as="h1">
                        Multiplayer -{" "}
                        {this.state.isLobbyPublic === true
                          ? "Public"
                          : "Private"}{" "}
                        Lobby
                      </Header>
                      <Header as="h3">
                        Gamemode: {this.state.selectedGamemode}
                      </Header>
                      <Header as="h3">
                        {this.state.users.length > 1 ? (
                          <Loader
                            type="Hearts"
                            color="#008080"
                            height={40}
                            width={40}
                          />
                        ) : (
                          <Loader
                            type="Oval"
                            color="#008080"
                            height={30}
                            width={30}
                          />
                        )}
                        {this.state.users.length > 1 ? (
                          <p> Waiting for host to start the game</p>
                        ) : (
                          <p> Waiting for more players to join</p>
                        )}
                      </Header>
                      <Table singleLine size="big">
                        <TableHeader>
                          <Table.Row>
                            <Table.HeaderCell>Player</Table.HeaderCell>
                            <Table.HeaderCell>Personal Best</Table.HeaderCell>
                            <Table.HeaderCell>Host</Table.HeaderCell>
                          </Table.Row>
                        </TableHeader>
                        <Table.Body>
                          {this.state.users.map((user) => {
                            return (
                              <Table.Row>
                                <Table.Cell>{user.username}</Table.Cell>
                                <Table.Cell>
                                  {this.state.selectedGamemode === "Time" &&
                                    user.highscores.Time}
                                  {this.state.selectedGamemode ===
                                    "Pixelation" && user.highscores.Pixelation}
                                  {this.state.selectedGamemode === "Clouds" &&
                                    user.highscores.Clouds}
                                </Table.Cell>
                                <Table.Cell>
                                  {" "}
                                  {this.state.creator == user.id ? (
                                    <Image
                                      src="./Crown.png"
                                      rounded
                                      size="mini"
                                    />
                                  ) : null}{" "}
                                </Table.Cell>
                              </Table.Row>
                            );
                          })}
                        </Table.Body>
                      </Table>
                    </Segment>
                    <br></br>
                    {this.state.creator ==
                    localStorage.getItem("currentUserId") ? (
                      <Button
                        disabled={this.state.users.length < 2}
                        size="big"
                        animated="fade"
                        color="green"
                        onClick={() => {
                          this.startGame();
                        }}
                      >
                        <Button.Content visible>Start Game</Button.Content>
                        <Button.Content hidden>
                          <Icon name="game" />
                        </Button.Content>
                      </Button>
                    ) : null}
                    <Button
                      size="big"
                      animated="fade"
                      color="red"
                      onClick={() => {
                        this.leaveLobby();
                      }}
                    >
                      <Button.Content visible>Leave Lobby</Button.Content>
                      <Button.Content hidden>
                        <Icon name="sign-out" />
                      </Button.Content>
                    </Button>
                  </Grid.Column>
                  <Grid.Column centered textAlign="center" width="4">
                    <Segment raised padded="very" size="big">
                      <Header>Invite Key</Header>
                      <Input type="text" fluid value={this.state.roomKey} />
                      <CopyToClipboard text={this.state.roomKey}>
                        <Button icon color="teal" size="big" fluid>
                          <Icon name="copy" />
                        </Button>
                      </CopyToClipboard>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </ComponentTransition>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default withRouter(Lobby);
