import React from "react";
import { withRouter } from "react-router";
import { Modal } from "semantic-ui-react";
import styled from "styled-components";
import { api, getAuthConfig, handleError } from "../../helpers/api";
import useWindowDimensions from "../shared/models/WindowSize";
import GameHeader from "./GameHeader";
// import { key } from "./key";
import MiniMap from "./MiniMap";
import ScoreBox from "./ScoreBox";
import { useState } from "react";
// import {useWindowDimensions} from '../shared/models/GeoMath';

class GameController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: localStorage.getItem("gameId"),
      gameOngoing:true,
      currentRound: null,
      questions: null,
      currentQuestionId: null,
      currentQuestionImage: null,
      questionTime: null,
      gameMode: null,

      scores: null,
      playerScore: null,
      solution: null,
      solutions: [],

      pin: null,
      pins: [],

      showScoreModal: false, // Show the scorepage flag
      players: null,

      isLastRound: false,
    };
    let id = localStorage.getItem("gameId")
    this.setState({gameId:id})

    console.log("Starting up Game with GameId", id);
    console.log(this.state.gameId)

    // Mini Map Method Binding
    this.handleGuessSubmit = this.handleGuessSubmit.bind(this);
    this.handlePinPlacedOnMap = this.handlePinPlacedOnMap.bind(this);
    this.nextRound = this.nextRound.bind(this);
    this.exitGame = this.exitGame.bind(this);
    this.endGame = this.endGame.bind(this);
  }
  componentDidMount() {
    this.mounted = true;
    this.init();
  }

  async init() {
    
    await this.getGame(this.state.gameId);
    await this.getQuestionsForGame(this.state.gameId)
    await this.startRound(this.state.currentRound);
  }

  async startRound(currentRound) {
    console.log("Starting Game Round ", currentRound);

    // Setting our current Question Id
    let questionIndex = currentRound -1;
    let currentQuestionId = this.state.questions[questionIndex];
    console.log(questionIndex, currentQuestionId, "DATAAA")
    this.setState({ currentQuestionId: currentQuestionId });

    // Start Timer
    this.startTimer();

    // Fetch Question Image
    await this.getQuestion(currentQuestionId);
  }

  async nextRound() {
    //end of game?
    console.log("user pressed next round")

      // Hide inbetween rounds scoreboard
      this.setState({ showScoreModal: false });

      // Fetch changes to the game
      console.log("right now this round", this.state.currentRound);
      let oldRound = this.state.currentRound
      await this.getGame(this.state.gameId);
     
      // this.setState({ currentRound: oldRound + 1 });  //TODO: Just an override to increase the round Counter once BE works remove this
      console.log("after increase this round", this.state.currentRound);
      // Start playing the next Round
      await this.startRound(this.state.currentRound);
    

    if (this.state.currentRound === 3) {
      this.setState({ isLastRound: true });
    }
  }

  //#region API Calls
  async getGame(gameId) {

    try {
      const response = await api.get("/games/" + gameId, getAuthConfig());
      this.setState({
        currentRound: response.data.round,
        gameMode : response.data.gameMode.name 
      });
      console.log("Fetched this game round from BE: ", response.data.round)
    } catch (error) {
      alert(
        `Something went wrong while fetching the game with gameId: ${gameId}: \n${handleError(
          error
        )}`
      );
    }

    
  }

  async getQuestionsForGame(gameId){
  
    try {
      const response = await api.get("/games/" + gameId + "/questions", getAuthConfig());
      console.log(response.data,"QUESTONS!")
      this.setState({
        questions: response.data,
      });
    } catch (error) {
      alert(
        `Something went wrong while fetching the questions for game with gameId: ${gameId}: \n${handleError(
          error
        )}`
      );
    }

  }
  async getQuestion(questionId) {
    //TODO: get the correct sizes of the user's screen
    const height = 1316;
    const width = 1057;

    try {
      const response = await api
        .post(`games/${this.state.gameId}/questions/${questionId}`, {
          width: width,
          height: height,
        },getAuthConfig())
        .then((response) => {
          this.setState({
            currentQuestionImage: "data:;base64," + response.data,
          });
        });
    } catch (error) {
      alert(`Couldn't fetch image: \n${handleError(error)}`);
    }
  }
  async sendGuess(guess, questionId) {
    try {
      let guessData = {
        questionId: questionId,
        coordGuess:{
          lon: guess.lng,
          lat: guess.lat,

        },
        difficultyFactor: 1
      };

      const response = await api.post(
        `/games/${this.state.gameId}/guess/`,
        guessData,
        getAuthConfig()
      );
      let responseData = response.data
      // let responseData = {
      //   playerScore: {
      //     name: "Player1",
      //     score: 3000,
      //     totalScore: 5000,
      //   },
      //   lat: 1,
      //   lng: 2,
      // };

      let solution = {
        lat: responseData.solutionCoordinate.lat,
        lng: responseData.solutionCoordinate.lon,
      };

      let solutions = this.state.solutions;
      solutions.push(solution);

      this.setState({
        playerScore: {
          score:responseData.tempScore,
          totalScore:responseData.totalScore,
          userId:response.data.userId,
          name:"this shouldn't display"
        },
        solution: solution,
        solutions: solutions,
      });

      await this.fetchScore();
    } catch (error) {
      alert(
        `Something went wrong while submitting your guess: \n${handleError(
          error
        )}`
      );
    }
  }

  async fetchScore() {
    try {
      const response = await api.get("games/" + this.state.gameId + "/scores/", getAuthConfig());
      // console.log(response.data);
      let responseData = response.data
      // TODO: Comment this once BE works
      
    
    let different = response.data.map((value, index, array) => {
      return {
        name: value.userId,
        score: value.tempScore,
        totalScore : value.totalScore,
        guess:{
          lat:value.lastCoordinate.lat,
          lng: value.lastCoordinate.lon
        }
      }
    })
    console.log(different, responseData)
      this.setState({
        scores: different
      });
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

    let oldGuesses = this.state.pins;
    oldGuesses.push(this.state.pin);
    this.setState({ pins: oldGuesses });

    // Stop Timer
    this.stopTimer();

    // Send Guess
    await this.sendGuess({ lat: lat, lng: lng }, this.state.currentQuestionId);

    // Continously fetch the score
    this.setState({ pin: null, solution: null });

    // Display the inbetween rounds scoreboard
    await this.fetchScore();
    this.setState({ showScoreModal: true });

    // Fetching incoming scores every second
    while (this.state.showScoreModal && this.state.gameOngoing && this.state.mounted) {
      await this.fetchScore();
      // wait for 1 s and fetch scores again
      console.log("still fetching scores here", this.state.showScoreModal, this.state.gameOngoing)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (!this.state.gameOngoing) return
    }
  }
  //#endregion MiniMap

  //#region Timer
  async startTimer() {
    this.setState({ questionTime: new Date().getTime() });
    this.setState({ timerRunning: true });
    while (this.state.timerRunning) {

      // if we passed 30 s
      if(this.state.timer > 25 && this.state.timer < 26) {
        console.log("WE PASSED 30 S - send backup request")
        this.setState({pin:{lat:1,lng:1}})
        this.handleGuessSubmit()
      }
      this.updateSeconds();
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  componentWillUnmount(){
    console.log("unmounting")
    this.mounted = false
    this.setState({showScoreModal:false, gameOngoing:false})
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

  async exitGame() {
    //TODO: some cool animation?
    console.log("ending game")
    this.setState({showScoreModal:false, gameOngoing:false})
    localStorage.removeItem("gameId")

    // try {
    //   const response = await api.get("/games/" + this.state.gameId + "/exit", getAuthConfig());
    //   this.setState({
    //     currentRound: response.data.round
    //   });
    // } catch (error) {
    //   alert(
    //     `Something went wrong while fetching the game with gameId: ${gameId}: \n${handleError(
    //       error
    //     )}`
    //   );
    // }
    
    //TODO: send to BE request and depending if user was creator some logic takes place
    this.props.history.push("/home");
  }

  async endGame() {
    await this.exitGame()
  }

  render() {
    return (
      <div>
        <GameHeader
          fixed="top"
          timer={this.state.timer}
          playerScore={this.state.playerScore}
          currentRound={this.state.currentRound}
          exitGame={this.exitGame}
        />
        <Component
          url={this.state.currentQuestionImage}
          gameMode={this.state.gameMode}
          timer={this.state.timer}
        />

        {this.state.showScoreModal ? (
          <Modal basic open={true} size="small" trigger={null}>
            <ScoreBox
              playerScore={this.state.playerScore}
              scores={this.state.scores ? this.state.scores : []}
              nextRound={this.nextRound}
              lastRound={this.state.isLastRound}
              endGame={this.endGame}
              state={{
                answer: this.state.solution,
                pin: this.state.pin,
                answers: this.state.solutions,
                pins: this.state.pins,
              }}
            />
          </Modal>
        ) : null}
        <MiniMap
          state={{
            center: {
              lat: 20.907646,
              lng: -0.848103,
            },
            answer: this.state.solution,
            pin: this.state.pin,
            answers: this.state.solutions,
            pins: this.state.pins,
            zoom: 2,
          }}
          handleGuessSubmit={this.handleGuessSubmit}
          pinMarkerOnClick={this.handlePinPlacedOnMap}
        />
      </div>
    );
  }
}

const Component = (props) => {
  const { height, width } = useWindowDimensions();
  let filter = props.gameMode !== "Time" ? 10 - props.timer * 0.4 : 0;

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
