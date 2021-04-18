import React from "react";
import { withRouter } from "react-router";
import { Header, Label, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import { api, handleError } from "../../helpers/api";
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
  width:450px;
`;
const BaseContainer = styled.div`
/* The image used */
    /* Full height */
    height: 100%; 
    min-height:800px;
    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;
const gameDummy = {
    questions:['1','2','3','4','5']
}
// let key = process.env.REACT_APP_GOOGLE_API_KEY

class GameController extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            gameId: props.gameId,
            currentRound: null,
            questions:null,
            currentQuestionId:null,
            currentQuestionImage:null,
            questionTime:null,
            
            scores:null,
            playerScore:null,
            answer:null,
            
            pin:null,

            showScoreModal:false, // Show the scorepage flag
            players:null
            
        }
        
        console.log(props.gameId)

       
        // Mini Map Method Binding
        this.handleGuessSubmit = this.handleGuessSubmit.bind(this);
        this.handlePinPlacedOnMap = this.handlePinPlacedOnMap.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);


    }
    componentDidMount(){
        this.init()
    }

    async init(){
        await this.getGame(this.state.gameId)
        await this.startRound(this.state.currentRound)
    }

    async startRound(currentRound){
        console.log("Starting game")

        // Setting our current Question Id
        let questionIndex = currentRound - 1; // cuz rounds start at 1 and question at 0
        let currentQuestionId = this.state.questions[questionIndex];
        this.setState({currentQuestionId: currentQuestionId});
        
        //TODO: Start Timer
        this.startTimer()
        // Fetch Question Image
        await this.getQuestion(currentQuestionId)

    }

    //#region API Calls
    async getGame(gameId){
        try{
            const response = await api.get('/games/' + gameId)
            console.log(response.data)
            this.setState({
                currentRound:response.data.currentRound,
                questions: response.data.questions
            })
            this.fetchScore()
            console.log(this.state)
        } catch (error){
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }
    async getQuestion(questionId){
        // TODO: once BE returns an image
        let question = null;
        try{
            const response = await api.get('/questions/' + questionId)
            console.log(response.data)
            question = response.data
            // this.setState({question:response.data})
        } catch (error){
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
        

        await this.fetchcurrentQuestionImage(question);
    }

    async fetchcurrentQuestionImage(question){
        try{
            const height =1280
            const width = 1280

            await api.get(
                        `https://maps.googleapis.com/maps/api/staticmap?zoom=${question.zoom}&size=${height}x${width}&scale=2&maptype=satellite&key=${key}&center=${question.lat},${question.lng}`,
                { responseType: 'arraybuffer' },
            )
            .then(response => {
                const base64 = btoa(
                new Uint8Array(response.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    '',
                ),
                );
                this.setState({ currentQuestionImage: "data:;base64," + base64 });
            });
        } catch (error){
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }
    async sendAnswer(answer, questionId){
        let data = {
            questionId: questionId,
            location: answer
        }

        try {
            let token = localStorage.getItem('token')
          
            let config = {
                headers: {
                'Authorization': `Basic ${token}` 
                }
            }

            // const response = await api.post(`/game/${gameId}/submit`, data, config);
            const response = await api.get('/playerScore/', config);
            this.setState({playerScore: response.data.score,
            answer:response.data.answer})
            console.log("PLAYERSCORE", this.state)

        } catch (error){
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }

    }

   
    //#endregion API Calls


    //#region MiniMap
    handlePinPlacedOnMap(mapState){
        console.log("Received this state from the MiniMap", mapState)
        const oldState = this.state
        oldState.pin  = mapState
        this.setState(oldState)
        console.log("saved pin state", this.state)
    }
    async handleGuessSubmit(){
        
        if (this.state.pin == null){
            throw Error("No pin detected")
        }
        console.log(this.state.pin)
        const lat = this.state.pin.lat
        const lng = this.state.pin.lng
        console.log(lat, lng)
        //TODO: Stop Timer and send time
        this.stopTimer()

        await this.sendAnswer({lat:lat,lng:lng}, this.state.currentQuestionId)

        // Wait 5 s and show result on map
        await new Promise(resolve => setTimeout(resolve, 5000));


        // continously fetch the score
        this.setState({pin:null, answer:null})
        this.setState({showScoreModal:true})
        while(this.state.showScoreModal){
            await this.fetchScore()
            // wait for 5 s and fetch scores again
            await new Promise(resolve => setTimeout(resolve, 5000));
        }

    }


    //#region Timer
    async startTimer(){
        this.setState({questionTime:new Date().getTime()})
        this.setState({timerRunning:true})
        while(this.state.timerRunning){
            this.updateSeconds()
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    updateSeconds(){
        if (this.state.questionTime)
            var now = new Date().getTime();
            var difference = (now - this.state.questionTime) / 1000;
            // console.log(difference)
            this.setState({timer:difference})
       
    }
    stopTimer(){
        this.setState({timerRunning:false})
        this.setState({questionTime:null})
    }
   
    //#endregion Timer
    async nextQuestion(){
        //end of game?
        if(this.state.currentRound == 5){
            //TODO: set lastround flag on scorebox for final score page
            alert("Finished the game - show the final score page")
        } else {
            this.setState({showScoreModal:false})
            await this.getGame(this.state.gameId)
            await this.startRound(this.state.currentRound)

        }
    }
    getCurrentRound(){
        return this.state.currentRound
    }
    //#endregion MiniMap

    async fetchScore(){
        try{
            // const response = await api.get('/games/' + this.state.gameId + '/score')
            const response = await api.get('/scores')
            console.log(response.data)
            this.setState({
                scores:response.data
            })
            console.log("SCOOOOOOREE", response.data)
        } catch (error){
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }
    
    render(){
        return (
            <BaseContainer style={{ 
                backgroundImage: `url(${this.state.currentQuestionImage})` 
              }} >
                <GameHeader timer = {this.state.timer} playerScore = {this.state.playerScore} currentRound={this.state.currentRound}/>
                <DebugView  info={this.state}></DebugView>

    
            <p>

            {this.state.showScoreModal ?   <Modal
                                            basic
                                            open={true}
                                            size='small'
                                            trigger={null}
                                            >
        <ScoreBox scores = {this.state.scores} nextQuestion = {this.nextQuestion} lastRound = {true}/>
        </Modal>:
            <div>

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
            </div>}
            
            </p>
            </BaseContainer>
        )
    }


}


const DebugView = (props)=> {
   return ( <div>
       <Header as="h1" inverted>Debug Specs</Header>
            <Label>
              Current question Id: {props.info.currentQuestionId}
            </Label>
         
        

       </div>)
}
export default withRouter(GameController)