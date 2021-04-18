import React from 'react';
import { Button, List, Grid, Progress, Form, Segment, Header, Divider,Image,Icon } from 'semantic-ui-react';



const ScoreBox = (props) => {

    const PlayerList = () => (
        <List divided verticalAlign='middle'>
            {props.scores.map((user) =>(
              <List.Item>
                <Image avatar floated='left' src='https://react.semantic-ui.com/images/avatar/small/matthew.png'/>
                <List.Content floated='left'>
                  <List.Header as='a'>{user.name}</List.Header>
                  <List.Description>Total: {user.totalScore}</List.Description>
                </List.Content>
              <Button floated='right'>
                <List.Description> {user.score}</List.Description>
              </Button>
              </List.Item>
              
            ))}
        </List>
      );

    const ProgressBar = () => {
        let color = props.scores[0].score > 2500?"green" : "red";
        return(
        <Progress percent={props.scores[0].score/5000*100} color={color}>
            <h3>{props.scores[0].score}/5000</h3>
        </Progress>
        )}
    
    const NextRound= () =>{
      //TODO: get the lastRound flag from the gamecontroller
        let button = 'Next round: 00:00'
        return(
            <Button animated='fade' color='teal' fluid size='large' onClick={()=>{props.nextQuestion()}}>
              <Button.Content visible>{button}</Button.Content>
              <Button.Content hidden>Go</Button.Content>
            </Button>
        )
    }

    const ExitGame= () =>{
      let button = 'END GAME'
      return(
          <Button animated='fade' color='red' fluid size='large' onClick={()=>{/*GO TO HOMEPAGE*/}}>
            <Button.Content visible>{button}</Button.Content>
            <Button.Content hidden><Icon name='sign-out'/></Button.Content>
          </Button>
      )
  }

  const PlayAgain = () =>{
    let button = 'Play Again'
    return(
      <Button animated='fade' color='green' fluid size='large' onClick={()=>{/*PlayAgain*/}}>
        <Button.Content visible>{button}</Button.Content>
        <Button.Content hidden><Icon name='redo'/></Button.Content>
      </Button>
    )
  }

  const LowerPart = () =>{
    if(props.lastRound){
      return(
        <Grid columns={2} stackable textAlign='center'>

          <Grid.Column style={{ maxWidth: 450 }}>
            <ExitGame/>
          </Grid.Column>
    
          <Grid.Column style={{ maxWidth: 450 }}>
            <PlayAgain/>
          </Grid.Column>
  
        </Grid>
      )
    }
    else{
      return(<NextRound/>)
    }
  }
 //SCORE = NULL
    return (
  <Segment placeholder raised>

    <Header as='h2' color='teal' textAlign='center'>
      <text>Your Score {props.scores[0].name}</text>
      <ProgressBar/>
      <Divider horizontal></Divider>
    </Header>

    <Grid columns={2} stackable textAlign='center'>

      <Grid.Row verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form size='large'>
            <PlayerList/>
          </Form>
        </Grid.Column>

        <Grid.Column style={{ maxWidth: 450 }}>
          <Form size='large'>
            <h1 style={{color:'black'}}>MINIMAP WITH DISTANCE</h1>
          </Form>
        </Grid.Column>
      </Grid.Row>
      
    </Grid>
    <Divider horizontal> </Divider>
    <LowerPart/>
  </Segment>
)
}

export default ScoreBox;