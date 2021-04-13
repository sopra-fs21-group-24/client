import React from 'react';
import { Button, Menu, Modal,Icon } from 'semantic-ui-react'

class GameHeader extends React.Component{

	constructor(props){
		super(props);
		this.state = {};
		// var t=setInterval(this.clock,1000);
	}

	componentDidMount(){
	
	}


	displayScore = () =>{
		if (this.props.playerScore){
			return this.props.playerScore.totalScore;
		} else {
			return 0
		}
	}

	clock = () =>{
		if (this.props.timer){

			return this.props.timer
		} else {
			return '00:00';
		}
	}



	displayRound = () =>{
		//this.state.game.round
		return `${this.props.currentRound}/5`;
	}

	exitGame = () =>(
		//send exit to backend
		alert("are you sure you want to leave the game?")
	)


	render() {

		return (
			<Menu inverted borderless size = 'small' attached>
				<Menu.Item>
						<h2>MAPGUESSЯ</h2>
				</Menu.Item>                
				<Menu.Item position = 'right'>
					<h4>Score: {this.displayScore()}</h4>
				</Menu.Item>

				<Menu.Item position = 'right'>
					<h4>Time: {this.clock()}</h4>
				</Menu.Item>
				
				<Menu.Item position = 'right'>
					<h4>Round: {this.displayRound()}</h4>
				</Menu.Item>

				<Menu.Item position ='right'>
					<Button color='red' onClick = {()=>{this.exitGame()}}>EXIT</Button>
				</Menu.Item>
			</Menu>
		)
	}

}


export default GameHeader;