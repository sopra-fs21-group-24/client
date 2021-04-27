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
} from "semantic-ui-react";
import Crown from "../../assets/Crown.png";
import { handleError, api } from "../../helpers/api";
import HomeHeader from "../../views/Header";

class Lobby extends React.Component {
  constructor() {
    super();
    this.state = {
      lobbyId: null,
      selectedGamemode: "Time",
      inviteKey: "someInviteKey123",
      isLobbyPublic: true,
      creator: null,
      users: [
        { username: "Claudio", pb: 7000, host: true },
        { username: "Jerome", pb: 3250, host: false },
        { username: "Ben", pb: 2500, host: false },
      ],
    };
  }

  // TODO: SHOULD START THE GAME IN THE BACKEND THROUGH AN API CALL
  startGame = () => {
    this.props.history.push("/game");
  };

  // TODO: PUT REQUEST TO BACKEND TO UPDATE LOBBY SETTINGS (E.G. LOBBY VISIBILITY, GAMEMODE)
  async updateLobbyConfiguration() {
    
  }

  handleItemClick = (e, { name }) => this.setState({ selectedGamemode: name });

  async componentDidMount() {
    const lobbyId = this.props.match.params.id;
    try {
      await api
      .get(`/lobby/${lobbyId}`)
      .then((response) => {
        this.setState({ lobbyId: response.data.id });
        this.setState({ isLobbyPublic: response.data.public });
        return response.data;
      })
      .then((data) => {
        // TODO: Use response of the user IDs to then again fetch their username and highscores
        return api.get(`/users/`)
      });

    } catch (error) {
      alert(`Something failed\n${handleError(error)}`);
    }
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
        <Segment placeholder raised size="big">
          <Grid columns={3} stackable textAlign="center">
            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <Header>Lobby Configuration</Header>
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
                  defaultChecked
                  label="Public Lobby"
                  onChange={() => {
                    this.setState({ isLobbyPublic: !this.state.isLobbyPublic });
                  }}
                />
              </Grid.Column>
              <Grid.Column>
                <Header as="h1">
                  Multiplayer -{" "}
                  {this.state.isLobbyPublic === true ? "Public" : "Private"}{" "}
                  Lobby
                </Header>
                <Header as="h2">Gamemode: {this.state.selectedGamemode}</Header>
                <Header as="h3">
                  Status: Waiting for the host to start the game
                </Header>
                <Table singleLine size="huge">
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
                          <Table.Cell>{user.pb}</Table.Cell>
                          <Table.Cell>
                            {" "}
                            {user.host === true ? (
                              <Image src={Crown} rounded size="mini" />
                            ) : null}{" "}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
                <Button
                  size="big"
                  color="green"
                  onClick={() => {
                    this.startGame();
                  }}
                >
                  Start Game
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Header>Invite Key</Header>
                <Input type="text" value={this.state.inviteKey} />
                <CopyToClipboard text={this.state.inviteKey}>
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
