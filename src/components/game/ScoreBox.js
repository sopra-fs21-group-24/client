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
import Countdown from "./Countdown";
import { useState, useEffect } from "react";
import { differentMarkers, hashTable } from "./MiniMap";

const ScoreBox = (props) => {
  const [users, setUsers] = useState(
    props.scores.sort((a, b) => (a.totalScore > b.totalScore ? -1 : 1))
  );
  const avatars = [
    "lena.png",
    "stevie.jpg",
    "mark.png",
    "helen.jpg",
    "christian.jpg",
    "daniel.jpg",
    "elliot.jpg",
    "matthew.png",
  ];

  useEffect(() => {
    setUsers(props.scores.sort((a, b) => (a.score > b.score ? -1 : 1)));

    return () => {
      setUsers([]);
      // confetti.clear();
    };
  });

  const PlayerList = () => {
    return (
      <List divided verticalAlign="middle" style={{ textAlign: "left" }}>
        {users.map((user) => {
          return (
            <List.Item>
              <Image
                avatar
                floated="left"
                src={
                  "https://react.semantic-ui.com/images/avatar/small/" +
                  avatars[user.name % 7]
                }
              />
              <List.Content floated="left">
                <List.Header as="h2">{user.username}</List.Header>
                <List.Description>
                  <Header as="h4">Round: {user.score}</Header>
                </List.Description>
              </List.Content>

              <List.Content floated="right">
                <Image
                  floated="left"
                  src={differentMarkers[hashTable.search(user.name)]}
                />
                <Button floated="right" style={{ width: "140px" }}>
                  <List.Description>
                    {" "}
                    <Header as="h3">Total: {user.totalScore}</Header>
                  </List.Description>
                </Button>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    );
  };

  const ProgressBar = () => {
    let color = props.playerScore.score > 250 ? "green" : "red";
    return (
      <div>
        <Header disabled as="h2">
          Your Score This Round
        </Header>
        <Progress
          inverted
          active
          value={props.playerScore.score}
          total={500}
          progress="ratio"
          size="large"
          color={color}
        />
      </div>
    );
  };

  const EndProgressBar = () => {
    let color = props.playerScore.totalScore > 750 ? "blue" : "black";
    return (
      <div>
        <Header disabled textAlign="center" as="h2">
          Your Final Score
        </Header>
        <Progress
          active
          value={props.playerScore.totalScore}
          total={1500}
          progress="ratio"
          size="large"
          color={color}
        />
      </div>
    );
  };

  const ExitGame = () => {
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
        <Button.Content visible>EXIT GAME</Button.Content>
        <Button.Content hidden>
          <Icon name="sign-out" />
        </Button.Content>
      </Button>
    );
  };

  const LowerPart = () => {
    if (props.lastRound) {
      return props.everyOneGuessed ? (
        <div>
          <Divider horizontal></Divider>
          <EndProgressBar />
          <ExitGame />
        </div>
      ) : (
        <h4 style={{ color: "black" }}>
          Please wait till everyone took their guess
        </h4>
      );
    } else {
      return props.everyOneGuessed ? (
        <Countdown
          nextRound={props.nextRound}
          score={props.playerScore.score}
        />
      ) : (
        <h4 style={{ color: "black" }}>
          Please wait till everyone took their guess
        </h4>
      );
      //return props.everyOneGuessed ? <NextRound nextRound={props.nextRound} everyOneGuessed={props.everyOneGuessed} />:<h4 style={{color:"black"}}>Please wait till everyone made their guess</h4> ;
    }
  };
  //SCORE = NULL
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Segment placeholder raised>
        <Header as="h2" color="teal" textAlign="center">
          <Divider horizontal></Divider>
          <ProgressBar />
        </Header>

        <Grid columns={2} stackable textAlign="center">
          <Grid.Row verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 600 }}>
              <Form size="large">
                <PlayerList />
              </Form>
            </Grid.Column>

            <Grid.Column style={{ maxWidth: 450, marginLeft: "20px" }}>
              <Form size="large">
                <MapElem
                  containerElement={
                    <div style={{ height: `200px`, width: `100%` }} />
                  }
                  mapElement={<div style={{ height: `100%` }} />}
                  center={{
                    lat: 20.907646,
                    lng: -0.848103,
                  }}
                  markers={props.state.pins}
                  marker={null}
                  playerMarkers={props.guessesOfAllPlayers}
                  result={props.state.answer}
                  results={props.state.answers}
                  currentRound={props.currentRound}
                  everyOneGuessed={props.everyOneGuessed}
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
    </div>
  );
};

export default ScoreBox;
