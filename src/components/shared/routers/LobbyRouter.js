import React from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import Home from "../../home/Home";
import Lobby from "../../lobby/Lobby";
import CreateLobby from "../../lobby/CreateLobby";
import JoinLobby from "../../lobby/JoinLobby";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class LobbyRouter extends React.Component {
  render() {
    return (
      <Container>
        <Route exact path={`${this.props.base}`} render={() => <Lobby />} />
        <Route exact path={`/lobby/create`} render={() => <CreateLobby />} />
        <Route exact path={`/lobby/join`} render={() => <JoinLobby />} />
      </Container>
    );
  }
}

export default LobbyRouter;
