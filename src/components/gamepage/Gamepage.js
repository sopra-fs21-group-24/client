import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from './Header'

class Gamepage extends React.Component {
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
        {Header}
        <h1>GAME IS RUNNING</h1>
      </Container>
    );
  }
}

export default withRouter(Gamepage);
