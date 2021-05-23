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
import ConfettiGenerator from "confetti-js";

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
    let confetti;
    let lastGameModeScore;
    if (props.gameMode == "Pixelation"){
      lastGameModeScore = localStorage.getItem("pixelationScore")
    } else if (props.gameMode == "Clouds"){
      lastGameModeScore = localStorage.getItem("cloudsScore")
    } else {
      lastGameModeScore = localStorage.getItem("timeScore")
    }

    if (props.everyOneGuessed && props.lastRound && props.playerScore.totalScore > lastGameModeScore) {
      const confettiSettings = {
        target: "my-canvas",
        max: "201",
        size: "1",
        animate: true,
        props: [
          "circle",
          "square",
          "triangle",
          "line",
          { type: "svg", src: "site/hat.svg", size: 25, weight: 0.2 },
        ],
        colors: [
          [165, 104, 246],
          [230, 61, 135],
          [0, 199, 228],
          [253, 214, 126],
        ],
        clock: "50",
        rotate: true,
        width: "1440",
        height: "793",
        start_from_edge: false,
        respawn: true,
      };
      confetti = new ConfettiGenerator(confettiSettings);
      confetti.render();
      return () => confetti.clear();
    }
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
      <canvas style={{zIndex: 3, position: "absolute", top:"0px", left: "0px", width: "100%", height: "100%", pointerEvents: "none"}} id="my-canvas"></canvas>
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
