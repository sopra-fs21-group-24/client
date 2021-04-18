import React from "react";
import { withRouter } from "react-router";
import { Modal } from "semantic-ui-react";
import styled from "styled-components";
import { api, handleError } from "../../helpers/api";
import { GameDebugView } from "../../views/GameDebugView";
import useWindowDimensions from "../shared/models/WindowSize";
import GameHeader from "./GameHeader";
import { key } from "./key";
import MiniMap from './MiniMap';
import ScoreBox from "./ScoreBox";
// import {useWindowDimensions} from '../shared/models/GeoMath';

// This Check will happen in BE
const solution = {}
const playTimeS=1000
const waitTimeS=5

const MiniMapContainer = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 450px;
`;
const BaseContainer = styled.div`

height: 100%;
  min-height: 800px;


`;

class GameController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: props.gameId,
      currentRound: null,
      questions: null,
      currentQuestionId: null,
      currentQuestionImage: null,
      questionTime: null,

      scores: null,
      playerScore: null,
      answer: null,

      pin: null,

      showScoreModal: false, // Show the scorepage flag
      players: staticPlayer,
    };

    console.log("Starting up Game with GameId", props.gameId);

    // Mini Map Method Binding
    this.handleGuessSubmit = this.handleGuessSubmit.bind(this);
    this.handlePinPlacedOnMap = this.handlePinPlacedOnMap.bind(this);
    this.nextRound = this.nextRound.bind(this);
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
    if (this.state.currentRound == 5) {
      //TODO: set lastround flag on scorebox for final score page
      alert("Finished the game - show the final score page");
    } else {
      // Hide inbetween rounds scoreboard  
      this.setState({ showScoreModal: false });
      
      // Fetch changes to the game
      await this.getGame(this.state.gameId);

      // Start playing the next Round
      await this.startRound(this.state.currentRound);
    }
  }

  //#region API Calls
  async getGame(gameId) {
    try {
      const response = await api.get("/games/" + gameId);
      this.setState({
        currentRound: response.data.currentRound,
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
    let data = {
      questionId: questionId,
      location: answer,
    };

    try {
      let token = localStorage.getItem("token");

      let config = {
        headers: {
          Authorization: `Basic ${token}`,
        },
      };

      // const response = await api.post(`/game/${gameId}/submit`, data, config);
      const response = await api.get("/playerScore/", config);
      this.setState({
        playerScore: response.data.score,
        answer: response.data.answer,
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
    this.setState({pin:mapState});
  }
  async handleGuessSubmit() {
    if (this.state.pin == null) {
      throw Error("Please drop a pin on the map before you submit!");
    }
    const lat = this.state.pin.lat;
    const lng = this.state.pin.lng;

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
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
    }}

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


    render(){
        return (
        <div>
            
                <GameHeader
                fixed='top'
                timer={this.state.timer}
                playerScore={this.state.playerScore}
                currentRound={this.state.currentRound}
                />
                <Component url={this.state.currentQuestionImage}  />

            {this.state.showScoreModal ?   <Modal
                                            basic
                                            open={true}
                                            size='small'
                                            trigger={null}
                                            >
        <ScoreBox scores = {this.state.scores} nextQuestion = {this.nextQuestion} lastRound = {true}/>
        </Modal>:(null)}
                <MiniMapContainer>
                <MiniMap state={{
                        center: {
                            lat: 20.907646,
                            lng: -0.848103
                        },
                        answer:this.state.answer,
                        zoom:2,
                        pin:this.state.pin

                    }} handleGuessSubmit={this.handleGuessSubmit} pinMarkerOnClick={this.handlePinPlacedOnMap}/>
                </MiniMapContainer>
        </div>
    );
  }

const Component = (props) => {
    const { height, width } = useWindowDimensions();
  
    return (
      <div style={{
        minWidth:width,
        minHeight:height,
        backgroundImage: `url(${props.url})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'}}>
      </div>
    );
  }

export default withRouter(GameController);
