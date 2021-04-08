import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Menu, Segment, Progress, Icon } from 'semantic-ui-react'
import { api } from '../../helpers/api';
import { List } from 'semantic-ui-react';

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

  nextRound = ()=>{
    // this.props.history.push("/gamepage");
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
        <ScoreBox players = {this.state} nextRound={this.nextRound}/>

      </div>
    );
  }
  
}

const ScoreBox = (props) => {
    
    const ListExampleDivided = () => (
        <List divided verticalAlign='middle'>
          <List.Item>
            <List.Content floated='left'>
              <List.Header as='a'>{props.players.player1.name}</List.Header>
            </List.Content>
            <List.Content floated='right'>
                <Button>{props.players.player1.totalScore}</Button>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content floated='left'>
              <List.Header as='a'>{props.players.player2.name}</List.Header>
            </List.Content>
            <List.Content floated='right'>
                <Button>{props.players.player2.totalScore}</Button>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content floated='left'>
              <List.Header as='a'>{props.players.player3.name}</List.Header>
            </List.Content>
            <List.Content floated='right'>
                <Button>{props.players.player3.totalScore}</Button>
            </List.Content>
          </List.Item>
        </List>
      )

    const ProgressBar = () => {
        let color = props.players.player1.score > 2500?"green" : "red";
        return(
        <Progress percent={props.players.player1.score/5000*100} color={color}>
            <h3>{props.players.player1.score}/5000</h3>
        </Progress>
        )}
    
    const NextRound= () =>{
        return(
            <Button animated='fade' color='teal' fluid size='large' onClick={()=>{props.nextRound()}}>
              <Button.Content visible>Next round starts in : 00:00</Button.Content>
              <Button.Content hidden>Next round</Button.Content>
            </Button>
        )
    }

    return ( 
    
    <Grid textAlign='center' style={{ height: '90vh' }} verticalAlign='middle'>
        
        <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
            <text>Your Score {props.players.player1.name}</text>
        </Header>
        <Segment raised>
        <Form size='large'>
            <ProgressBar/>
            <ListExampleDivided/>
            <NextRound/>
        </Form>
        </Segment>
        </Grid.Column>
    </Grid>
    )
}




export default withRouter(Scorepage);
