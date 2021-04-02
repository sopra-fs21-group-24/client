import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from './Header'
import { Button, Form } from 'semantic-ui-react'

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
      <div>
        {Header}
        <h1>GAME IS RUNNING</h1>
      </div>
    );
  }
}

export default withRouter(Gamepage);
