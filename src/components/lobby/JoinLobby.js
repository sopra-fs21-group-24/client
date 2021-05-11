import React from "react";
import { api, handleError } from "../../helpers/api";
import { withRouter } from "react-router-dom";
import {
  ComponentTransition,
  AnimationTypes,
} from "react-component-transition";
import {
  Input,
  Grid,
  Button,
  Segment,
  Divider,
  Header,
  Icon,
  Table,
} from "semantic-ui-react";
import { getWindowDimensions } from "../shared/models/WindowSize";

class JoinLobby extends React.Component {
  constructor() {
    super();
    this.state = {
      roomKey: null,
      lobbies: [],
    };
  }

  async componentDidMount() {
    this.mounted = true;
    let init = true;

    while (true && this.mounted) {
      try {
        const response = await api.get(`/lobby`, {
          headers: {
            initial: init,
          },
        });
        this.setState({ lobbies: response.data });
        console.log(this.state.lobbies);
      } catch (error) {
        alert(
          `Something went wrong when fetching all public lobbies: \n${handleError(
            error
          )}`
        );
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
      init = false;
    }
  }

  componentWillUnmount() {
    console.log("unmounting");
    this.mounted = false;
  }

  joinLobbyWithKey = async () => {
    try {
      const response = await api.get(`/lobby/roomKey/${this.state.roomKey}`);
      await api.post(
        `/lobby/${this.state.roomKey}/roomkey`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      localStorage.setItem("lobbyId", response.data.id);

      this.props.history.push(`/lobby`);
    } catch (error) {
      alert(
        `Something went wrong when joining this lobby: \n${handleError(error)}`
      );
    }
  };

  // TODO: Implement clickable table that lets users join public lobbies
  joinPublicLobby = async (lobbyId) => {
    try {
      await api.post(
        `/lobby/${lobbyId}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      localStorage.setItem("lobbyId", lobbyId);

      this.props.history.push(`/lobby`);
    } catch (error) {
      alert(
        `Something went wrong when joining this lobby: \n${handleError(error)}`
      );
    }
  };

  handleInputChange(key, value) {
    this.setState({
      [key]: value,
    });
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
          overflow: "hidden",
        }}
      >
        <ComponentTransition
          animateOnMount={true}
          enterAnimation={AnimationTypes.slideDown.enter}
          exitAnimation={AnimationTypes.fade.exit}
        >
          <Segment
            placeholder
            raised
            padded="very"
            size="big"
            style={{
              marginLeft: "50px",
              marginRight: "50px",
              marginTop: "100px",
            }}
          >
            <Grid columns={2} stackable textAlign="center">
              <Divider vertical>Or</Divider>
              <Grid.Row verticalAlign="middle">
                <Grid.Column>
                  <Header icon>
                    <Icon name="search" />
                    Join a public lobby
                  </Header>
                  <Table selectable>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Lobby name</Table.HeaderCell>
                        <Table.HeaderCell>Host</Table.HeaderCell>
                        <Table.HeaderCell># Players</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {this.state.lobbies.length === 0
                        ? "No public lobby available"
                        : this.state.lobbies.map((lobby) => {
                            return (
                              <Table.Row
                                onClick={() => {
                                  this.joinPublicLobby(lobby.id);
                                }}
                              >
                                <Table.Cell>
                                  {lobby.username}'s Lobby
                                </Table.Cell>
                                <Table.Cell>{lobby.username}</Table.Cell>
                                <Table.Cell>{lobby.users}/3</Table.Cell>
                              </Table.Row>
                            );
                          })}
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
                        this.handleInputChange("roomKey", e.target.value);
                      }}
                    />
                    <Button
                      primary
                      size="big"
                      style={{ marginTop: "20px" }}
                      onClick={() => {
                        this.joinLobbyWithKey();
                      }}
                    >
                      Join
                    </Button>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>

          <center>
            <Button
              size="big"
              style={{ marginTop: "50px" }}
              color="teal"
              onClick={() => {
                this.props.history.push(`/home`);
              }}
            >
              Go back
            </Button>
          </center>
        </ComponentTransition>
      </div>
    );
  }
}

export default withRouter(JoinLobby);
