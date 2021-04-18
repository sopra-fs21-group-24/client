import React from "react";
import { api, handleError } from "../../helpers/api";
import { withRouter } from "react-router-dom";
import { Input, Grid, Button } from "semantic-ui-react";

class JoinLobby extends React.Component {
  constructor() {
    super();
    this.state = {
      lobbyId: null,
    };
  }

  async componentDidMount() {}

  sendJoinLobbyRequest = async () => {
    try {
      const response = await api.get('/lobby', {
        headers: {
          Authorization: localStorage.getItem('token'),
          lobbyId: this.state.lobbyId,
        },
      });

      this.props.history.push('/lobby');
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  handleInputChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  render() {
    return (
      <Grid centered>
        <Grid.Row>
          <h1> Join lobby with a key</h1>
        </Grid.Row>
        <Grid.Row>
          <Input
            icon="key"
            placeholder="Enter key"
            onChange={(e) => {
              this.handleInputChange("lobbyId", e.target.value);
            }}
          />
        </Grid.Row>
        <Grid.Row>
          <Button
            onClick={() => {
              this.sendJoinLobbyRequest();
            }}
          >
            Join
          </Button>
        </Grid.Row>
      </Grid>
    );
  }
}

export default withRouter(JoinLobby);
