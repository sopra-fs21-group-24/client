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
  Modal,
} from "semantic-ui-react";
import { getWindowDimensions } from "../shared/models/WindowSize";
import "../../views/design/joinlobby.css";
import { motion } from "framer-motion";
import swal from 'sweetalert';


class JoinLobby extends React.Component {
  constructor() {
    super();
    this.state = {
      roomKey: null,
      lobbies: [],
      init: true,
    };
  }

  async componentDidMount() {
    this.mounted = true;

    while (true && this.mounted) {
      try {
        const response = await api.get(`/lobby`, {
          headers: {
            initial: this.state.init,
          },
        });
        this.setState({ lobbies: response.data });
      } catch (error) {        
          console.log("Cannot fetch lobbies")
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
      this.setState({ init: false });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  joinLobbyWithKey = async () => {
    try {
      const response = await api.post(
        `/lobby/${this.state.roomKey}/roomkey`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      localStorage.setItem("lobbyId", response.data.lobbyId);
      this.props.history.push(`/lobby`);
    } catch (error) {
      swal("Something went wrong when joining this lobby with your roomkey","","error");
    }
  };

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
        swal("there was an error joining the lobby","","error");
      }
    }

  handleInputChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  displayGamemode = (lobby) => {
    switch (lobby.gameMode) {
      case "Time":
        return <Icon name="clock outline"></Icon>;
        break;
      case "Pixelation":
        return <Icon name="chess board"></Icon>;
        break;
      case "Clouds":
        return <Icon name="cloud"></Icon>;
        break;
    }
  };

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
          //soverflow: "hidden",
        }}
      >
        <Modal
          className="ui fullscreen modal"
          basic
          open={true}
        >
          <Modal.Content>
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
                  marginLeft: "70px",
                  marginRight: "70px",
                }}
              >
                <Grid columns={2} stackable textAlign="center">
                  <Divider vertical>Or</Divider>
                  <Grid.Row verticalAlign="top">
                    <Grid.Column centered>
                      <Header icon>
                        <Icon name="search" />
                        Join a public lobby
                      </Header>
                      <Table selectable>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>Host</Table.HeaderCell>
                            <Table.HeaderCell>Gamemode</Table.HeaderCell>
                            <Table.HeaderCell># Players</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {this.state.lobbies.length === 0
                            ? "There are currently no public lobbies available"
                            : this.state.lobbies.map((lobby) => {
                                return (
                                  <Table.Row
                                    onClick={() => {
                                      this.joinPublicLobby(lobby.id);
                                    }}
                                  >
                                    <Table.Cell>{lobby.username}</Table.Cell>
                                    <Table.Cell>
                                      {this.displayGamemode(lobby)}
                                      {lobby.gameMode}
                                    </Table.Cell>
                                    <Table.Cell>{lobby.users}/3</Table.Cell>
                                  </Table.Row>
                                );
                              })}
                        </Table.Body>
                      </Table>
                    </Grid.Column>
                    <Grid.Column centered>
                      <Grid.Row>
                        <Header icon>
                          <Icon name="key" />
                          Join a lobby with invite key
                        </Header>
                      </Grid.Row>
                      <Grid.Row>
                        <Input
                          icon="key"
                          placeholder="Enter key"
                          onChange={(e) => {
                            this.handleInputChange("roomKey", e.target.value);
                          }}
                        />
                        <motion.button
                          initial={{
                            fontSize: "18px",
                            color: "white",
                            width: "100px",
                            height: "50px",
                            opacity: 1,
                            backgroundColor: "#323232",
                            scale: 1,
                            borderRadius: "8px",
                          }}
                          whileHover={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            this.joinLobbyWithKey();
                          }}
                        >
                          Join
                        </motion.button>
                      </Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
              <center>
                <motion.button
                  initial={{
                    fontSize: "18px",
                    color: "white",
                    width: "150px",
                    height: "50px",
                    opacity: 1,
                    backgroundColor: "#323232",
                    scale: 1,
                    borderRadius: "8px",
                  }}
                  whileHover={{
                    scale: 1.1,
                    textShadow: "0px 0px 8px rgb(255, 255, 255)",
                    boxShadow: "0px 0px 8px rgb(255, 255, 255)",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    this.props.history.push(`/home`);
                  }}
                >
                  Go Back
                </motion.button>
              </center>
            </ComponentTransition>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default withRouter(JoinLobby);
