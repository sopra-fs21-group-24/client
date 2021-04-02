import React from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import Gamepage from "../../gamepage/Gamepage";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class GamepageRouter extends React.Component {
  render() {

    return(
        <Container>
            <Route
            exact
            path={`${this.props.base}`}
            render={() => <Gamepage />}
            />
        </Container>
    )
  }
}

export default GamepageRouter;
