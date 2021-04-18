import React from "react";
import { withRouter } from "react-router";
import { api, handleError } from "../../helpers/api";
import styled from "styled-components";
import MiniMap from "./MiniMap";
import { Button, Grid, Modal, Header, Label } from "semantic-ui-react";
import { calculateDistance } from "../shared/models/GeoMath";
import GameHeader from "./GameHeader";
import Scorepage from "./Scorepage";
import { key } from "./key";
// import {useWindowDimensions} from '../shared/models/GeoMath';

// This Check will happen in BE
const solution = {};
const playTimeS = 5;
const staticPlayer = {
  player1: { name: "player1", score: 0, totalScore: 0 },
  player2: { name: "player2", score: 0, totalScore: 0 },
  player3: { name: "player3", score: 0, totalScore: 0 },
};
const waitTimeS = 5;

const MiniMapContainer = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 450px;
`;
const BaseContainer = styled.div`
  /* The image used */
  /* Full height */
  height: 100%;
  min-height: 800px;
  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
const gameDummy = {
  questions: ["1", "2", "3", "4", "5"],
};
// let key = process.env.REACT_APP_GOOGLE_API_KEY

class GameController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: props.gameId,
      game: null,
      pin: null,
      question: null,
      showScoreModal: false,
      mapImageSrc: "",
      currentQuestionId: null,
      players: staticPlayer,
    };
    console.log("KKKKKEEEY", key);
    console.log(props.gameId);

    this.handleGuessSubmit = this.handleGuessSubmit.bind(this);
    this.handlePinPlacedOnMap = this.handlePinPlacedOnMap.bind(this);

    this.init();
  }

  async init() {
    await this.getGame(this.state.gameId);
    await this.startGame();
  }

  async startGame() {
    console.log("Starting game");
    let questionStaple = this.state.game.questions.reverse();

    while (questionStaple.length) {
      // Start timer
      //  show screen
      // continue with next question

      let currentQuestionId = questionStaple.pop();
      let oldState = this.state;
      oldState.currentQuestionId = currentQuestionId;
      this.setState(oldState);

      await this.getQuestion(currentQuestionId);
      console.log("Playing on question: ", this.state.question);
      await this.fetchSatelliteImage(this.state.question);
      // wait 30 s
      let guessTime = 1000 * playTimeS;
      this.setState({ questionId: currentQuestionId });
      await new Promise((resolve) => setTimeout(resolve, guessTime));
      console.log("score screen on question: ", this.state.question);
      this.setState({ showScoreModal: true });

      let waitTime = 1000 * waitTimeS;
      await new Promise((resolve) => setTimeout(resolve, waitTime));

      this.setState({ showScoreModal: false });
      // continue to next question
    }
  }

  //#region API Calls
  async getGame(gameId) {
    try {
      const response = await api.get("/games/" + gameId);
      console.log(response.data);
      this.setState({ game: response.data });
      console.log(this.state);
    } catch (error) {
      alert(
        `Something went wrong while fetching the users: \n${handleError(error)}`
      );
    }
  }
  async getQuestion(questionId) {
    try {
      const response = await api.get("/questions/" + questionId);
      console.log(response.data);
      this.setState({ question: response.data });
    } catch (error) {
      alert(
        `Something went wrong while fetching the users: \n${handleError(error)}`
      );
    }
  }

  async fetchSatelliteImage(question) {
    try {
      const height = 1280;
      const width = 1280;
      // const response = await api.get(`https://maps.googleapis.com/maps/api/staticmap?zoom=${question.zoom}&size=600x300&maptype=satellite&key=AIzaSyAimOiAOXNImxCmJeFaaPMsmSSmZWoMaAk&center=${question.lat},${question.lng}`)
      // console.log(response.data)
      // this.setState({question:response.data})
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
          this.setState({ mapImageSrc: "data:;base64," + base64 });
        });
    } catch (error) {
      alert(
        `Something went wrong while fetching the users: \n${handleError(error)}`
      );
    }
  }
  async sendAnswer(answer, questionId) {
    let data = {
      questionId: questionId,
      location: answer,
    };

    try {
      // let token = localStorage.getItem('token')

      // let config = {
      //     headers: {
      //     'Authorization': `Basic ${token}`
      //     }
      // }

      // const response = await api.put('/users/', data, config);

      // console.log(response)
      let c = calculateDistance(
        answer.lat,
        answer.lng,
        this.state.question.lat,
        this.state.question.lng
      );
      console.log(
        answer.lat,
        answer.lng,
        this.state.question.lat,
        this.state.question.lng
      );
      console.log(c);
      alert("Distance from solution: " + c.toString() + " km!");
    } catch (error) {
      alert(
        `Something went wrong while fetching the users: \n${handleError(error)}`
      );
    }
  }
  //#endregion API Calls

  //#region MiniMap
  handlePinPlacedOnMap(mapState) {
    console.log("Received this state from the MiniMap", mapState);
    const oldState = this.state;
    oldState.pin = mapState;
    this.setState(oldState);
    console.log("saved pin state", this.state);
  }
  async handleGuessSubmit() {
    if (this.state.pin == null) {
      throw Error("No pin detected");
    }
    const lat = this.state.pin.lat;
    const lng = this.state.pin.lng;
    console.log(lat, lng);

    await this.sendAnswer({ lat: lat, lng: lng }, this.state.currentQuestionId);
  }

  //#endregion MiniMap

  render() {
    return (
      <BaseContainer
        style={{
          backgroundImage: `url(${this.state.mapImageSrc})`,
        }}
      >
        <GameHeader players={this.state.players} />
        <DebugView info={this.state}></DebugView>

        <p>
          {this.state.showScoreModal ? (
            <Modal
              basic
              open={true}
              size="small"
              trigger={<Button>Basic Modal</Button>}
            >
              <Scorepage />
            </Modal>
          ) : (
            <div>
              <MiniMapContainer>
                <MiniMap
                  state={{
                    center: {
                      lat: 20.907646,
                      lng: -0.848103,
                    },

                    zoom: 2,
                    pin: this.state.pin,
                  }}
                  handleGuessSubmit={this.handleGuessSubmit}
                  pinMarkerOnClick={this.handlePinPlacedOnMap}
                />
              </MiniMapContainer>{" "}
            </div>
          )}
        </p>
      </BaseContainer>
    );
  }
}

const DebugView = (props) => {
  return (
    <div>
      <Header as="h1" inverted>
        Debug Specs
      </Header>
      <Label>Current question Id: {props.info.questionId}</Label>

      <Label>
        LNG{" "}
        {props.info.question ? <p>{props.info.question.lng}</p> : "no question"}
      </Label>
      <Label>
        LAT{" "}
        {props.info.question ? <p>{props.info.question.lat}</p> : "no question"}
      </Label>
      <Label>
        ZOOM{" "}
        {props.info.question ? (
          <p>{props.info.question.zoom}</p>
        ) : (
          "no question"
        )}
      </Label>
    </div>
  );
};
export default withRouter(GameController);
