import React from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import Home from "../../home/Home";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class HomeRouter extends React.Component {
  render() {
    return (
      <Container>
        <Route exact path={`${this.props.base}`} render={() => <Home />} />

        <Route
          exact
          path={`${this.props.base}`}
          render={() => <Redirect to={`${this.props.base}`} />}
        />
      </Container>
    );
  }
}

export default HomeRouter;
