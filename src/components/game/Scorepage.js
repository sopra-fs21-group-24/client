import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Menu } from 'semantic-ui-react'
import { api } from '../../helpers/api';
import ScoreBox from './ScoreBox';

class Scorepage extends React.Component {
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


  exit = ()=>{
      this.props.history.push("/home");
  }

  render() {

    return (
        
      <div>
        <Menu borderless secondary>
          <Menu.Item position ='right'>
            <Button color='red' onClick = {()=>{this.exit()}}>EXIT</Button>
          </Menu.Item>
        </Menu>
        <ScoreBox players = {this.state} nextRound={this.props.nextQuestion}/>

      </div>
    );
  }
  
}






export default withRouter(Scorepage);
