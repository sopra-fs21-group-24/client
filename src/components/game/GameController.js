import React from "react";
import { withRouter } from "react-router";
import { Modal } from "semantic-ui-react";
import styled from "styled-components";
import { api, handleError } from "../../helpers/api";
import useWindowDimensions from "../shared/models/WindowSize";
import GameHeader from "./GameHeader";
import { key } from "./key";
import MiniMap from "./MiniMap";
import ScoreBox from "./ScoreBox";
import { useState } from 'react';
// import {useWindowDimensions} from '../shared/models/GeoMath';

const MiniMapContainer = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 450px;
`;


class GameController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: props.gameId,
      currentRound: 1,
      questions: null,
      currentQuestionId: null,
      currentQuestionImage: null,
      questionTime: null,
      gameMode: null,

      scores: null,
      playerScore: null,
      answer: null,
      answers:[],

      pin: null,
      pins:[],

      showScoreModal: false, // Show the scorepage flag
      players: null,

      isLastRound: false
    };

    console.log("Starting up Game with GameId", props.gameId);

    // Mini Map Method Binding
    this.handleGuessSubmit = this.handleGuessSubmit.bind(this);
    this.handlePinPlacedOnMap = this.handlePinPlacedOnMap.bind(this);
    this.nextRound = this.nextRound.bind(this);
    this.exitGame = this.exitGame.bind(this);
    this.endGame = this.endGame.bind(this);
  }
  componentDidMount() {
    this.init();
  }

  async init() {
    await this.getGame(this.state.gameId);
    await this.startRound(this.state.currentRound);
  }

  async startRound(currentRound) {
    console.log("Starting Game Round ", currentRound);

    // Setting our current Question Id
    let questionIndex = currentRound - 1; // cuz rounds start at 1 and question at 0
    let currentQuestionId = this.state.questions[questionIndex];
    this.setState({ currentQuestionId: currentQuestionId });

    // Start Timer
    this.startTimer();
    
    // Fetch Question Image
    await this.getQuestion(currentQuestionId);
  }

  async nextRound() {
    //end of game?
    if (this.state.currentRound === 5) {
      //TODO: set lastround flag on scorebox for final score page
      alert("Finished the game - show the final score page");
    } else {
      // Hide inbetween rounds scoreboard
      this.setState({ showScoreModal: false });

      // Fetch changes to the game
      await this.getGame(this.state.gameId);
      //TODO: Just an override to increase the round Counter
      this.setState({currentRound: this.state.currentRound +1})
      console.log(this.state.currentRound)
      // Start playing the next Round
      await this.startRound(this.state.currentRound);
    }

    if (this.state.currentRound  === 5){
      this.setState({isLastRound:true})
    }
  }

  //#region API Calls
  async getGame(gameId) {
    try {
      const response = await api.get("/games/" + gameId);
      this.setState({
        // currentRound: response.data.currentRound,
        questions: response.data.questions,
      });
    } catch (error) {
      alert(
        `Something went wrong while fetching the game with gameId: ${gameId}: \n${handleError(
          error
        )}`
      );
    }
  }
  async getQuestion(questionId) {
    // TODO: once BE returns an image
    let question = null;
    try {
      const response = await api.get("/questions/" + questionId);
      console.log(response.data);
      question = response.data;
      this.fetchScore();
      // this.setState({question:response.data})
    } catch (error) {
      alert(
        `Something went wrong while fetching the users: \n${handleError(error)}`
      );
    }

    await this.fetchcurrentQuestionImage(question);
  }

  async fetchcurrentQuestionImage(question) {
    try {
      //TODO: get the correct sizes of the user's screen
      const height = 1316;
      const width = 1057;

      await api
        .get(
          `https://maps.googleapis.com/maps/api/staticmap?zoom=${question.zoom}&size=${height}x${width}&scale=2&maptype=satellite&key=${key}&center=${question.lat},${question.lng}`,
          { responseType: "arraybuffer" }
        )
        .then((response) => {
          const base64 = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          this.setState({ currentQuestionImage: "data:;base64," + base64 });
        });
    } catch (error) {
      alert(
        `Something went wrong while fetching the users: \n${handleError(error)}`
      );
    }
  }
  async sendGuess(answer, questionId) {
    // let data = {
    //   questionId: questionId,
    //   location: answer,
    // };

    try {
      let token = localStorage.getItem("token");

      let config = {
        headers: {
          Authorization: `Basic ${token}`,
        },
      };

      // const response = await api.post(`/game/${gameId}/submit`, data, config);
      const response = await api.get("/playerScore/", config);
      let oldAnswers = this.state.answers
      oldAnswers.push(response.data.answer)
      this.setState({
        playerScore: response.data.score,
        answer: response.data.answer,
        answers:oldAnswers
      });
      console.log("PLAYERSCORE", this.state);
    } catch (error) {
      alert(
        `Something went wrong while fetching the users: \n${handleError(error)}`
      );
    }
  }

  async fetchScore() {
    try {
      // const response = await api.get('/games/' + this.state.gameId + '/score')
      const response = await api.get("/scores");
      console.log(response.data);
      this.setState({
        scores: response.data,
      });
      console.log("SCOOOOOOREE", response.data);
    } catch (error) {
      alert(
        `Something went wrong while fetching the users: \n${handleError(error)}`
      );
    }
  }
  //#endregion API Calls

  //#region MiniMap
  handlePinPlacedOnMap(mapState) {
    console.log("Received this pin from the MiniMap", mapState);
    this.setState({ pin: mapState });
  }
  async handleGuessSubmit() {

    if (this.state.pin == null) {
      throw Error("Please drop a pin on the map before you submit!");
    }
    const lat = this.state.pin.lat;
    const lng = this.state.pin.lng;

    let oldGuesses = this.state.pins
    oldGuesses.push(this.state.pin)
    this.setState({pins:oldGuesses})

    // Stop Timer
    this.stopTimer();

    // Send Guess
    await this.sendGuess({ lat: lat, lng: lng }, this.state.currentQuestionId);

    // Continously fetch the score
    this.setState({ pin: null, answer: null });

    // Display the inbetween rounds scoreboard
    this.setState({ showScoreModal: true });

    // Fetching incoming scores every second
    while (this.state.showScoreModal) {
      await this.fetchScore();
      // wait for 1 s and fetch scores again
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
  }
  //#endregion MiniMap

  //#region Timer
  async startTimer() {
    this.setState({ questionTime: new Date().getTime() });
    this.setState({ timerRunning: true });
    while (this.state.timerRunning) {
      this.updateSeconds();
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  updateSeconds() {
    if (this.state.questionTime) var now = new Date().getTime();
    var difference = (now - this.state.questionTime) / 1000;
    // console.log(difference)
    this.setState({ timer: difference });
  }
  stopTimer() {
    this.setState({ timerRunning: false });
    this.setState({ questionTime: null });
  }

  async exitGame(){
    //TODO: some cool animation?
    alert("are you sure you want to leave the game?");
    //TODO: send to BE request and depending if user was creator some logic takes place
    this.props.history.push('/home')
  }

  async endGame(){
    //TODO: some cool animation?
    this.props.history.push('/home')
  }

  render() {
    return (
      <div>
        <GameHeader
          fixed="top"
          timer={this.state.timer}
          playerScore={this.state.playerScore}
          currentRound={this.state.currentRound}
          exitGame = {this.exitGame}
        />
        <Component url={this.state.currentQuestionImage} gameMode = {this.state.gameMode} timer={this.state.timer}/>

        {this.state.showScoreModal ? (
          <Modal basic open={true} size="small" trigger={null}>
            <ScoreBox
              scores={this.state.scores}
              nextRound={this.nextRound}
              lastRound={this.state.isLastRound}
              endGame={this.endGame}
              state={{
   
                answer: this.state.answer,
                pin: this.state.pin,
                answers:this.state.answers,
                pins:this.state.pins,
              }}
            />
          </Modal>
        ) : null}
        <MiniMapContainer>
          <MiniMap
            state={{
              center: {
                lat: 20.907646,
                lng: -0.848103,
              },
              answer: this.state.answer,
              pin: this.state.pin,
              answers:this.state.answers,
              pins:this.state.pins,
              zoom: 2,
            }}
            handleGuessSubmit={this.handleGuessSubmit}
            pinMarkerOnClick={this.handlePinPlacedOnMap}
          />
        </MiniMapContainer>
      </div>
    );
  }
}

const Component = (props) => {
  const { height, width } = useWindowDimensions();
  let filter = props.gameMode==1? 10-props.timer*0.30:0;

  return (
    <div
      style={{
        filter: `blur(${filter}px)`,
        minWidth: width,
        minHeight: height,
        backgroundImage: `url(${props.url})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    ></div>
  );
};

export default withRouter(GameController);
