import React from "react";
import { api, handleError } from "../../helpers/api";
import { withRouter } from "react-router-dom";
import {
  Input,
  Grid,
  Button,
  Segment,
  Divider,
  Header,
  Icon,
  Table,
  Label,
} from "semantic-ui-react";
import HomeHeader from "../../views/Header";

class JoinLobby extends React.Component {
  constructor() {
    super();
    this.state = {
      lobbyId: null,
    };
  }

  // TODO: Fetch lobbies for the first time when page renders
  async componentDidMount() {}

  // TODO: Handles when the user wants to join a lobby/game
  sendJoinLobbyRequest = async () => {
    const lobbyId = 1;
    const userId = localStorage.getItem("currentUserId");

    try {
      const response = await api.get('/lobby/' + this.state.lobbyId, {
        headers: {
          Authorization: localStorage.getItem('token')
        },
      });
      
      console.log(response)

      this.props.history.push(`/lobby/${lobbyId}`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  // TODO: Add button to refresh the list of all lobbies
  reloadLobbyList = async () => {};

  handleInputChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  render() {
    return (
      <div>
        <HomeHeader />
        <Segment raised>
          <Grid columns={2} stackable textAlign="center">
            <Divider vertical>Or</Divider>

            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <Header icon>
                  <Icon name="search" />
                  Join a public lobby
                </Header>
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Lobby name</Table.HeaderCell>
                      <Table.HeaderCell>Host</Table.HeaderCell>
                      <Table.HeaderCell># Players</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        <Label>First</Label>
                      </Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Cell</Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Cell</Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                      <Table.Cell>Cell</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Grid.Column>

              <Grid.Column>
                <Header icon>
                  <Icon name="key" />
                  Join a lobby with invite key
                </Header>
                <div>
                  <Input
                    icon="key"
                    placeholder="Enter key"
                    onChange={(e) => {
                      this.handleInputChange("lobbyId", e.target.value);
                    }}
                  />
                  <Button
                    primary
                    onClick={() => {
                      this.sendJoinLobbyRequest();
                    }}
                  >
                    Join
                  </Button>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}

export default withRouter(JoinLobby);
