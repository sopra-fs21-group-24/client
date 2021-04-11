import React from 'react';
import { withRouter } from 'react-router-dom';
import { api } from '../../helpers/api';
import ScoreBox from './ScoreBox'

class Endpage extends React.Component {
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

  render() {
    return (    
      <div>
        <ScoreBox players = {this.state} nextRound={this.nextRound}/>
      </div>
    );
  } 
}


export default withRouter(Endpage);
