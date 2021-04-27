import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withRouter } from "react-router-dom";
import {
  Button,
  Checkbox,
  Grid,
  Header,
  Image,
  Table,
  TableHeader,
  Segment,
  Input,
  Icon,
  Menu,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import Crown from "../../assets/Crown.png";
import { handleError, api } from "../../helpers/api";
import HomeHeader from "../../views/Header";
import UpdateAnimation from "../../views/design/UpdateAnimation";

class Lobby extends React.Component {
  constructor() {
    super();
    this.state = {
      lobbyId: null,
      selectedGamemode: "",
      roomKey: "",
      isLobbyPublic: null,
      creator: null,
      users: [],
      isUpdating: false,
      hasGameStarted: false,
    };
  }

  // TODO: Check what needs to be done with the response of GameGetDTO
  startGame = async () => {
    const gameId = localStorage.getItem("gameId");
    try {
      const response = await api.get(`/games/${gameId}/start`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      this.setState({hasGameStarted: true})
      this.props.history.push("/game");
    } catch (error) {
      alert(
        `Something went wrong when starting the game: \n${handleError(error)}`
      );
    }
  };

  updateLobbyConfiguration = async () => {
    const gameId = localStorage.getItem("gameId");

    const requestBody = JSON.stringify({
      userId: localStorage.getItem("currentUserId"),
      usermode: "Multiplayer",
      gamemode: this.state.selectedGamemode,
      publicStatus: this.state.isLobbyPublic,
    });

    try {
      await api.put(`/games/${gameId}`, requestBody, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      this.setState({ isUpdating: false });
    } catch (error) {
      alert(
        `Something went wrong when updating the lobby configuration: \n${handleError(
          error
        )}`
      );
    }
  };

  leaveLobby = async () => {
    try {
      const requestBody = JSON.stringify({
        userId: localStorage.getItem("currentUserId"),
      });
      await api.put(`/lobby/${this.state.lobbyId}`, requestBody);

      localStorage.removeItem("lobbyId");
      this.props.history.push("/home");
    } catch (error) {
      alert(
        `Something went wrong when leaving the lobby \n${handleError(error)}`
      );
    }
  };

  handleItemClick = (e, { name }) => {
    this.setState({ selectedGamemode: name });
    this.setState({ isUpdating: true });
    setTimeout(this.updateLobbyConfiguration, 1500);
  };

  async componentDidMount() {
    const lobbyId = localStorage.getItem("lobbyId");
    const gameId = localStorage.getItem("gameId");

    while(!this.state.hasGameStarted) {
    try {
      const response = await api.get(`/lobby/${lobbyId}`);
      this.setState({ lobbyId: response.data.id });
      this.setState({ creator: response.data.creator });
      this.setState({ users: response.data.users });
      this.setState({ roomKey: response.data.roomKey });
      this.setState({ isLobbyPublic: response.data.public });
    } catch (error) {
      alert(
        `Something went wrong when fetching the lobby \n${handleError(error)}`
      );
    }
    await new Promise((resolve) => setTimeout(resolve, 4000))
  }
  }
  // TODO: Display highscore according to gamemode
  render() {
    return (
      <div>
        <Segment placeholder raised size="big">
          <Grid columns={3} stackable textAlign="center">
            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <Header>Lobby Configuration</Header>
                {this.state.isUpdating ? (
                  <UpdateAnimation />
                ) : (
                  <div>
                    <Menu color="blue" compact secondary>
                      <Menu.Item
                        name="Time"
                        active={this.state.selectedGamemode === "Time"}
                        onClick={this.handleItemClick}
                      >
                        Time
                      </Menu.Item>
                      <Menu.Item
                        name="Pixelation"
                        active={this.state.selectedGamemode === "Pixelation"}
                        onClick={this.handleItemClick}
                      >
                        Pixelation
                      </Menu.Item>
                      <Menu.Item
                        name="Clouds"
                        active={this.state.selectedGamemode === "Clouds"}
                        onClick={this.handleItemClick}
                      >
                        Clouds
                      </Menu.Item>
                    </Menu>
                    <p></p>
                    <Checkbox
                      toggle
                      checked={this.state.isLobbyPublic}
                      label="Public Lobby"
                      onChange={() => {
                        this.setState({ isLobbyPublic: !this.state.isLobbyPublic });
                        this.setState({ isUpdating: true });
                        setTimeout(this.updateLobbyConfiguration, 1500);
                      }}
                    />
                  </div>
                )}
              </Grid.Column>
              <Grid.Column>
                <Header as="h1">
                  Multiplayer -{" "}
                  {this.state.isLobbyPublic === true ? "Public" : "Private"}{" "}
                  Lobby
                </Header>
                <Header as="h2">Gamemode: {this.state.selectedGamemode}</Header>
                <Header as="h3">
                  {this.state.selectedGamemode === ""
                    ? "Status: Please select a gamemode"
                    : "Status: Waiting for the host to start the game"}
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
                          <Table.Cell>{user.highTime}</Table.Cell>
                          <Table.Cell>
                            {" "}
                            {this.state.creator == user.id ? (
                              <Image src={Crown} rounded size="mini" />
                            ) : null}{" "}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
                &nbsp;&nbsp;&nbsp;
                {this.state.creator == localStorage.getItem("currentUserId") ? (
                  <Button
                    size="big"
                    color="green"
                    onClick={() => {
                      this.startGame();
                    }}
                  >
                    Start Game
                  </Button>
                ) : null}
                &nbsp;&nbsp;&nbsp;
                <Button
                  size="big"
                  color="red"
                  onClick={() => {
                    this.leaveLobby();
                  }}
                >
                  Leave Lobby
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Header>Invite Key</Header>
                <Input type="text" value={this.state.roomKey} />
                <CopyToClipboard text={this.state.roomKey}>
                  <Button icon attached>
                    <Icon name="copy" />
                  </Button>
                </CopyToClipboard>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}

export default withRouter(Lobby);
