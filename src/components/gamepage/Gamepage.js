import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from './Header'

class Gamepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {
  }


  render() {
    return (
      <div>
        <Header/>
        <img src = 'https://miro.medium.com/max/3000/1*BzaxmZjEVpTFtKJeex_ayg.jpeg' alt = 'nan' />
      </div>
    );
  }
}

export default withRouter(Gamepage);
