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
    /**
     * "this.props.base" is "/app" because as been passed as a prop in the parent of HomeRouter, i.e., App.js
     */
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
/*
 * Don't forget to export your component!
 */
export default HomeRouter;
