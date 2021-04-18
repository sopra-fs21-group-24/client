import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import JoinLobby from "../../lobby/JoinLobby";
import Lobby from "../../lobby/Lobby";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class LobbyRouter extends React.Component {
  render() {
    return (
      <Container>
        <Route exact path={`${this.props.base}`} render={() => <Lobby />} />
        <Route exact path={`/lobby/join`} render={() => <JoinLobby />} />
      </Container>
    );
  }
}

export default LobbyRouter;
