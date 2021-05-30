import React, { useEffect } from "react";
import {
  ComponentTransition,
  AnimationTypes,
} from "react-component-transition";
import { withRouter } from "react-router";
import { Modal, Transition } from "semantic-ui-react";
import styled from "styled-components";
import { api, getAuthConfig, handleError } from "../../helpers/api";
import ConfettiGenerator from "confetti-js";
import {
  getWindowDimensions,
  useWindowDimensions,
} from "../shared/models/WindowSize";
import GameHeader from "./header/GameHeader";
import MiniMap from "./miniMap/MiniMap";
import ScoreBox from "./score/ScoreBox";
import { useState } from "react";
import CloudCanvas from "./clouds/CloudCanvas";
import useSound from "use-sound";

class HashTable {
  constructor() {
    this.values = {};
    this.length = 0;
    this.size = 5;
  }

  calculateHash(key) {
    return key % this.size;
  }

  add(key, value) {
    const hash = this.calculateHash(key);
    if (!this.values.hasOwnProperty(hash)) {
      this.values[hash] = {};
    }
    if (!this.values[hash].hasOwnProperty(key)) {
      this.length++;
    }
    this.values[hash][key] = value;
  }

  search(key) {
    const hash = this.calculateHash(key);
    if (
      this.values.hasOwnProperty(hash) &&
      this.values[hash].hasOwnProperty(key)
    ) {
      return this.values[hash][key];
    } else {
      return null;
    }
  }
}

// Initialize hash table for hashing user IDs to an index for differentMarkers
export const hashTable = new HashTable();

class GameController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country :"",
      city:"",
      gameId: localStorage.getItem("gameId"),
      gameOngoing: true,
      showCloud: true,
      currentRound: -1,
      isPlaying: true,
      questions: null,
      currentQuestionId: null,
      currentQuestionImage: null,
      questionTime: null,
      gameMode: null,

      scores: null,
      playerScore: {
        score: 0,
        totalScore: 0,
        userId: null,
        name: null,
      },
      guessesOfAllPlayers: null,
      everyOneGuessed: false,
      solution: null,
      solutions: [],
      difficultyFactor: null,
      playerIds: null,

      pin: null,
      pins: [],

      showScoreModal: false, // Show the scorepage flag
      players: null,

      isLastRound: false,
    };

    this.child = React.createRef();

    let id = localStorage.getItem("gameId");
    this.setState({ gameId: id });
    // Mini Map Method Binding

    this.handleGuessSubmit = this.handleGuessSubmit.bind(this);
    this.handlePinPlacedOnMap = this.handlePinPlacedOnMap.bind(this);
    this.nextRound = this.nextRound.bind(this);
    this.exitGame = this.exitGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.handleDifficultyFactor = this.handleDifficultyFactor.bind(this);
  }
  componentDidMount() {
    this.mounted = true;
    this.init();
  }

  async init() {
    await this.getGame(this.state.gameId);
    await this.getQuestionsForGame(this.state.gameId);
    await this.startRound(this.state.currentRound);
  }
  async startPrefetch(currentRound) {
    let upcomingRound = currentRound + 1;
    let nextquestionIndex = upcomingRound - 1;
    let nextQuestionId = this.state.questions[nextquestionIndex];
    let preFetchedImageData = await this.getQuestion(nextQuestionId);
    this.setState({
      nextImageData: preFetchedImageData,
      nextQuestionId: nextQuestionId,
    });
  }
  async startRound(currentRound) {
    // console.log("Starting Game Round ", currentRound);


    this.setState({ isPlaying: true });
    // Setting our current Question Id
    let questionIndex = currentRound - 1;
    let currentQuestionId = this.state.questions[questionIndex];
    // console.log(questionIndex, currentQuestionId, "DATAAA");

    // Fetch Question Image

    // Start Timer
    this.setState({ currentQuestionId: currentQuestionId });
    this.startTimer();
    if (this.state.gameMode == "Clouds") {
      this.child.current.loadACloud();
    }
    let imagedata = await this.getQuestion(currentQuestionId);
    this.setState({
      currentQuestionImage: "data:;base64," + imagedata,
    });
  }

  // async prepNextRound(){
  //   await this.startRound(this.state.currentRound);
  // }

  async nextRound() {
    //end of game?

    // console.log("user pressed next round");

    // Hide inbetween rounds scoreboard
    this.setState({ showScoreModal: false, everyOneGuessed: false });
    

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
        gameMode: response.data.gameMode.name,
        playerIds: response.data.players,
      });

      // Adding all player IDs to the Hash Table so all players get different colored markers
      for (let i = 0; i < this.state.playerIds.length; i++) {
      hashTable.add(this.state.playerIds[i], i);
    }
      // console.log("Fetched this game round from BE: ", response.data.round);
    } catch (error) {
      this.askWhetherToGoBackToHome(
        `Something went wrong while fetching the game with gameId: ${gameId}.`,
        error
      );
    }
  }

  askWhetherToGoBackToHome(errorMessage, err) {
    if (
      window.confirm(errorMessage) +
      " Would you like to go back to the HomeScreen?"
    ) {
      //this.exitGame();
    } else {
      alert(`More Information regarding your error: ${handleError(err)}`);
    }
  }

  async getQuestionsForGame(gameId) {
    try {
      const response = await api.get(
        "/games/" + gameId + "/questions",
        getAuthConfig()
      );
      // console.log(response.data, "QUESTONS!");
      this.setState({
        questions: response.data,
      });
    } catch (error) {
      this.askWhetherToGoBackToHome(
        `Something went wrong while fetching the questions for game with gameId: ${gameId}.`,
        error
      );
    }
  }
  async getQuestion(questionId) {
    if (this.state.nextQuestionId == questionId) {
      // console.log("using prefetched image", this.state.nextImageData)
      return this.state.nextImageData;
    }
    const { height, width } = getWindowDimensions();

    let scaleFactor = width / 640;
    let actualWidth = width / scaleFactor;
    let actualHeight = height / scaleFactor - 20;
    // console.log("new scalefactor", actualWidth, actualHeight);

    try {
      const response = await api.post(
        `games/${this.state.gameId}/questions/${questionId}`,
        {
          width: actualWidth,
          height: actualHeight,
        },
        getAuthConfig()
      );
      return response.data;
    } catch (error) {
      alert(`Couldn't fetch image: \n${handleError(error)}`);
    }
  }

  handleDifficultyFactor = (difficulty) => {
    this.setState({ difficultyFactor: difficulty });
  };
  async sendGuess(guess, questionId) {
    try {
      let guessData = {
        questionId: questionId,
        coordGuess: {
          lon: guess.lng,
          lat: guess.lat,
        },
        difficultyFactor:
          this.state.gameMode == "Clouds" ? this.state.difficultyFactor : 1,
      };

      this.setState({ isPlaying: false });

      

      let response;
      try {
        response = await api.post(
          `/games/${this.state.gameId}/guess/`,
          guessData,
          getAuthConfig()
        );
      } catch (error) {
        // this.props.history.push("/home");
        console.log("Could not send guess")
      }

      
      let responseData = response.data;
      // let responseData = {
      //   playerScore: {
      //     name: "Player1",
      //     score: 3000,
      //     totalScore: 5000,
      //   },
      //   lat: 1,
      //   lng: 2,
      // };
      let city = responseData.city ? responseData.city : this.state.answer.city
      let country = responseData.country? responseData.country : this.state.answer.country
      console.log("GEO DATA", city, country)
      this.setState({city:city, country:country})
      let solution = {
        lat: responseData.solutionCoordinate.lat,
        lng: responseData.solutionCoordinate.lon,
        // city:responseData.city,
        // country:responseData.country,
      };
      if (city != null){
        solution.city = city
        solution.country = country
      }
      
      let solutions = this.state.solutions;
      solutions.push(solution);

      this.setState({
        playerScore: {
          score: responseData.tempScore,
          totalScore: responseData.totalScore,
          userId: response.data.userId,
          name: "this shouldn't display",
        },
        solution: solution,
        solutions: solutions,
      });

      console.log(this.state.playerScore);
      await this.fetchScore();
    } catch (error) {
      this.askWhetherToGoBackToHome(
        "Something went wrong while preparing your guess.",
        error
      );
    }
  }

  async fetchScore() {
    try {
      const response = await api.get(
        "games/" + this.state.gameId + "/scores/",
        getAuthConfig()
      );
      //console.log(response.data);
      let responseData = response.data;
      this.setState({ guessesOfAllPlayers: response.data });

      let filtered = response.data.filter((value, index, array) => {
        return value.lastCoordinate != null;
      });
      let different = filtered.map((value, index, array) => {
        return {
          name: value.userId,
          score: value.tempScore,
          totalScore: value.totalScore,
          username: value.username,
          guess: {
            lat: value.lastCoordinate ? value.lastCoordinate.lat : null,
            lng: value.lastCoordinate.lon ? value.lastCoordinate.lon : null,
          },
        };
      });

      // console.log(different, responseData);
      this.setState({
        scores: different,
      });
    } catch (error) {
      this.askWhetherToGoBackToHome(
        "Something went wrong while the game score of all players.",
        error
      );
    }
  }
  //#endregion API Calls

  //#region MiniMap
  handlePinPlacedOnMap(mapState) {
    // console.log("Received this pin from the MiniMap", mapState);
    this.setState({ pin: mapState });
  }
  async handleGuessSubmit() {
    if (this.state.pin == null) {
      alert("Please drop a pin on the map before you submit!");
      return;
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
    if (this.state.currentRound != 3) {
      // console.log("CURRENTROUND",this.state.currentRound)
      this.startPrefetch(this.state.currentRound);
    }
    await this.fetchScore();
    this.setState({ showScoreModal: true });
    // this.prepNextRound()

    // Fetching incoming scores every second
    // console.log(
    //   "START FETCHING SCORES",
    //   this.state.showScoreModal,
    //   this.state.gameOngoing,
    //   this.mounted,
    //   !this.state.everyOneGuessed
    // );
    while (
      this.state.showScoreModal &&
      this.state.gameOngoing &&
      this.mounted &&
      !this.state.everyOneGuessed
    ) {
      await this.fetchScore();
      await this.checkIfEveryoneGuessed();

      // wait for 1 s and fetch scores again
      console.log(
        "still fetching scores here",
        this.state.showScoreModal,
        this.state.gameOngoing
      );
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (!this.state.gameOngoing) return;
    }
  }

  async checkIfEveryoneGuessed() {
    let oldRound = this.state.currentRound;

    await this.getGame(this.state.gameId);

    console.log(
      "old Round ",
      oldRound,
      " new Round: ",
      this.state.currentRound
    );

    if (oldRound < this.state.currentRound) {
      this.setState({ everyOneGuessed: true });
      // console.log("EVERYONE GUESSED");
      return;
    } else {
      this.setState({ everyOneGuessed: false });
      // console.log("NOT EVERYONE GUESSED");
    }
  }

  //#endregion MiniMap

  //#region Timer
  async startTimer() {
    this.setState({ questionTime: new Date().getTime() + 30000 });
    this.setState({ timerRunning: true });
    while (this.state.timerRunning) {
      if (this.state.timer > 0 && this.state.timer < 1) {
        console.log("WE PASSED 30 S - send backup request");
        this.setState({ pin: { lat: null, lng: null } });
        this.handleGuessSubmit();
      }
      this.updateSeconds();
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    localStorage.removeItem("gameId");
    this.setState({ showScoreModal: false, gameOngoing: false });
  }
  updateSeconds() {
    if (this.state.questionTime) var now = new Date().getTime();
    var difference = (this.state.questionTime - now) / 1000;
    this.setState({ timer: difference });
  }
  stopTimer() {
    this.setState({ timerRunning: false });
    this.setState({ questionTime: null });
  }

  async exitGame() {
    // Send null, null guess when exiting so other players who have already guessed
    // are not stuck in an infinite loop
    // this.setState({ pin: { lat: null, lng: null } });
    // this.handleGuessSubmit();
    try {
      await api.get("/games/" + this.state.gameId + "/exit", getAuthConfig());
    } catch (error) {
      this.props.history.push("/home");
    }

    console.log("ending game");
    this.setState({ showScoreModal: false, gameOngoing: false });
    localStorage.removeItem("gameId");
    this.props.history.push("/home");
  }

  async endGame() {
    await this.exitGame();
  }

  render() {
    const { height, width } = getWindowDimensions();
    let filter =
      this.state.gameMode == "Pixelation" ? 10 - (30-this.state.timer) * 0.4 : 0;

    return (
      <div>
        <ComponentTransition
          animateOnMount={true}
          enterAnimation={AnimationTypes.slideUp.enter}
          exitAnimation={AnimationTypes.slideUp.exit}
        >
          <GameHeader
            fixed="top"
            timer={this.state.timer}
            playerScore={this.state.playerScore}
            currentRound={this.state.currentRound}
            exitGame={this.exitGame}
          />
        </ComponentTransition>

        <div
          style={{
            width: width,
            height: height - 50,
            filter: `blur(${filter}px)`,
            backgroundImage: `url(${this.state.currentQuestionImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            overflow: "hidden",
          }}
        >
          {this.state.gameMode == "Clouds" &&
          this.state.currentRound != -1 &&
          this.state.currentQuestionId != null ? (
            <div>
              <CloudCanvas
                ref={this.child}
                // key={props.questionId}
                questionId={this.state.currentQuestionId}
                round={this.state.currentRound}
                height={height}
                width={width}
                isPlaying={this.state.isPlaying}
                onHandleDifficulty={this.handleDifficultyFactor}
              ></CloudCanvas>
            </div>
          ) : null}

          {/* <canvas style={{zIndex:100}} id="my-canvas"></canvas> */}
        </div>
        {/* <Component
          isPlaying={this.state.isPlaying}
          onHandleDifficulty={this.handleDifficultyFactor}
          questionId={this.state.currentQuestionId}
          round={this.state.currentRound}
          url={this.state.currentQuestionImage}
          gameMode={this.state.gameMode}
          timer={this.state.timer}
          lastRound={this.state.isLastRound}
          everyOneGuessed={this.state.everyOneGuessed}
        /> */}

        {this.state.showScoreModal ? (
          <Modal inverted basic open={true} size="large" trigger={null}>
            <ScoreBox
              city={this.state.city}
              country={this.state.country}
              color="black"
              gameMode={this.state.gameMode}
              everyOneGuessed={this.state.everyOneGuessed}
              playerScore={this.state.playerScore}
              guessesOfAllPlayers={this.state.guessesOfAllPlayers}
              currentRound={this.state.currentRound}
              scores={this.state.scores}
              nextRound={this.nextRound}
              lastRound={this.state.isLastRound}
              endGame={this.endGame}
              answer={this.state.solution}
              answer={this.state.solutions}
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
            playerIds: this.state.playerIds,
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
  let filter = props.gameMode == "Pixelation" ? props.timer -15 : 0;

  return (
    <div
      style={{
        width: width,
        height: height - 50,
        filter: `blur(${filter}px)`,
        backgroundImage: `url(${props.url})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        overflow: "hidden",
      }}
    >
      {props.gameMode == "Clouds" &&
      props.round != -1 &&
      props.questionId != null ? (
        <div>
          <CloudCanvas
            // key={props.questionId}
            questionId={props.questionId}
            round={props.round}
            height={height}
            width={width}
            isPlaying={props.isPlaying}
            onHandleDifficulty={props.onHandleDifficulty}
          ></CloudCanvas>
        </div>
      ) : null}

      {/* <canvas style={{zIndex:100}} id="my-canvas"></canvas> */}
    </div>
  );
};

export default withRouter(GameController);
