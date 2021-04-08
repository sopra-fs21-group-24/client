import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from './Header'
import { api } from '../../helpers/api';

class Gamepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1:{name:"player1", score:0, totalScore:0},
      player2:{name:"player2", score:0, totalScore:0},
      player3:{name:"player3", score:0, totalScore:0}
    };
  }

  async componentDidMount() {
    try{
        const response = await api.get('/score');

        this.setState(response.data);

      
    }catch(error){
        alert('Something went wrong while fetching the scores');
    }
}

//Img has to be replaced with Satelite and Minimap has to be added
  render() {
    return (
      <div>
        <Header players = {this.state}/>
        
        <img src = 'https://miro.medium.com/max/3000/1*BzaxmZjEVpTFtKJeex_ayg.jpeg' alt = 'nan' />
      </div>
    );
  }
}

export default withRouter(Gamepage);
