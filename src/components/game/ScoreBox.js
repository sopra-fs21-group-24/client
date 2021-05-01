import React from "react";
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Progress,
  Segment,
} from "semantic-ui-react";
import { MapElem } from "./MiniMap";

const ScoreBox = (props) => {
  const PlayerList = () => (
    <List divided verticalAlign="middle">
      {props.scores.map((user) => (
        <List.Item>
          <Image
            avatar
            floated="left"
            src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
          />
          <List.Content floated="left">
            <List.Header as="a">{user.userName}</List.Header>
            <List.Description>Total: {user.totalScore}</List.Description>
          </List.Content>
          <Button floated="right">
            <List.Description> {user.score}</List.Description>
          </Button>
        </List.Item>
      ))}
    </List>
  );

  const ProgressBar = () => {
    let color = props.playerScore.score > 250 ? "green" : "red";
    return (
      <Progress percent={(props.playerScore.score / 500) * 100} color={color}>
        <h3>{props.playerScore.score}/500</h3>
      </Progress>
    );
  };

  const NextRound = (props) => {
    console.log(props.everyOneGuessed, "EVERYONEGUESSED?")
    //TODO: get the lastRound flag from the gamecontroller
    let button = "Next round";
    return (
      <Button
        animated="fade"
        color="teal"
        fluid
        size="large"
        onClick={() => {
          props.nextRound();
        }}
      >
        {props.everyOneGuessed ? "NEXT ROUND":"WATING FOR GUESSES"}

      </Button>
    );
  };

  const ExitGame = () => {
    let button = "END GAME";
    return (
      <Button
        animated="fade"
        color="red"
        fluid
        size="large"
        onClick={() => {
          props.endGame();
        }}
      >
        <Button.Content visible>{button}</Button.Content>
        <Button.Content hidden>
          <Icon name="sign-out" />
        </Button.Content>
      </Button>
    );
  };

  const PlayAgain = () => {
    let button = "Play Again";
    return (
      <Button
        animated="fade"
        color="green"
        fluid
        size="large"
        onClick={() => {
          /*PlayAgain*/
        }}
      >
        <Button.Content visible>{button}</Button.Content>
        <Button.Content hidden>
          <Icon name="redo" />
        </Button.Content>
      </Button>
    );
  };

  const LowerPart = () => {
    if (props.lastRound) {
      return (
        <Grid columns={2} stackable textAlign="center">
          <Grid.Column style={{ maxWidth: 450 }}>
            <ExitGame />
          </Grid.Column>

          {/* <Grid.Column style={{ maxWidth: 450 }}>
            <PlayAgain />
          </Grid.Column> */}
        </Grid>
      );
    } else {
      return props.everyOneGuessed ? <NextRound nextRound={props.nextRound} everyOneGuessed={props.everyOneGuessed} />:<h4 style={{color:"black"}}>Please wait till everyone made their guess</h4> ;
    }
  };
  //SCORE = NULL
  return (
    <Segment placeholder raised>
      <Header as="h2" color="teal" textAlign="center">
        <text>Your Score</text>
        <ProgressBar />
        <Divider horizontal></Divider>
      </Header>

      <Grid columns={2} stackable textAlign="center">
        <Grid.Row verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size="large">
              <PlayerList />
            </Form>
          </Grid.Column>

          <Grid.Column style={{ maxWidth: 300 }}>
            <Form size="large">
              <MapElem
                containerElement={
                  <div style={{ height: `150px`, width: `100%` }} />
                }
                mapElement={<div style={{ height: `100%` }} />}
                center={{
                  lat: 20.907646,
                  lng: -0.848103,
                }}
                markers={props.state.pins}
                marker={null}
                result={props.state.answer}
                results={props.state.answers}
                showResults={true}
                zoom={0}
              />
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider horizontal> </Divider>
      <LowerPart />
    </Segment>
  );
};

export default ScoreBox;
