import React from 'react';
import { Button, List, Grid, Progress, Form, Segment, Header } from 'semantic-ui-react';



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
        let lastRound = false;
        let button = 'Next round starts in : 00:00'
        if(lastRound){
            button = 'EXIT';
        }
        return(
            <Button animated='fade' color='teal' fluid size='large' onClick={()=>{props.nextRound()}}>
              <Button.Content visible>{button}</Button.Content>
              <Button.Content hidden>Go</Button.Content>
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

export default ScoreBox;