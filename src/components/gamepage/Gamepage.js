import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { withRouter } from 'react-router-dom';

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  async componentDidMount() {
  }


  render() {
    return (
      <Container>
        <h1>GAME IS RUNNING</h1>
      </Container>
    );
  }
}

export default withRouter(Gamepage);
