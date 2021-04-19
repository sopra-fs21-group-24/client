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
} from "semantic-ui-react";
import Crown from "../../assets/Crown.png";
import { handleError } from "../../helpers/api";
import HomeHeader from "../../views/Header";

class Lobby extends React.Component {
  constructor() {
    super();
    this.state = {
      lobbyId: null,
      selectedGamemode: "",
      inviteKey: "someInviteKey123",
      isLobbyPublic: true,
      users: {
        players: [
          { username: "Claudio", pb: 7000, host: true },
          { username: "Jerome", pb: 3250, host: false },
          { username: "Ben", pb: 2500, host: false },
        ],
      },
    };
  }

  // SHOULD START THE GAME IN THE BACKEND THROUGH AN API CALL
  startGame = () => {
    this.props.history.push("/game");
  };

  // PUT REQUEST TO BACKEND TO UPDATE LOBBY SETTINGS (E.G. LOBBY VISIBILITY, GAMEMODE)
  async updateGameSettings() {

  }

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
      <div>
        <HomeHeader />
        <Segment placeholder raised size="big">
          <Grid columns={3} stackable textAlign="center">
            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <Header>Lobby Configuration</Header>
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
                <Header as="h1">Multiplayer - Lobby</Header>
                <Header as="h2">
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
                    {this.state.users.players.map((user) => {
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
                  Start
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Header>Invite Key</Header>
                <Input type="text" value={this.state.inviteKey}/>
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
