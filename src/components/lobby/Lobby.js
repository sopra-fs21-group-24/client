import React from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Checkbox,
  Grid,
  Header,
  Image,
  Table,
  TableHeader,
} from "semantic-ui-react";
import Crown from "../../assets/Crown.png";
import { handleError } from "../../helpers/api";

class Lobby extends React.Component {
  constructor() {
    super();
    this.state = {
      lobbyId: null,
      selectedGamemode: "",
      inviteKey: "",
      isLobbyPublic: false,
      users: {
        players: [
          { username: "Ben", pb: 2500, host: true },
          { username: "Jerome", pb: 3250, host: false },
          { username: "Claudio", pb: 7000, host: false },
        ],
      },
    };
  }

  startGame = () => {};

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
      <Grid centered>
        <Grid.Row>
          <Grid.Column width="5">
            <Header as="h1">Multiplayer - Lobby</Header>
            <Header as="h2">
              Status: Waiting for the host to start the game
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width="5">
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
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width="5">
            <Header>Lobby Settings</Header>
            <Checkbox
              toggle
              label="Public Lobby"
              onChange={() => {
                this.setState({ isLobbyPublic: !this.state.isLobbyPublic });
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width="1">
            <Button
              size="big"
              color="green"
              onClick={() => {
                this.props.history.push("/game");
              }}
            >
              Start
            </Button>
          </Grid.Column>
        </Grid.Row>
        <p>{String(this.state.isLobbyPublic)}</p>
      </Grid>
    );
  }
}

export default withRouter(Lobby);
