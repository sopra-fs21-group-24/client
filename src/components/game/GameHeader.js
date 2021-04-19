import React from 'react';
import { Button, Menu, Modal,Icon } from 'semantic-ui-react'

function toHHMMSS(secondsInt) {
	var sec_num = parseInt(secondsInt, 10); // don't forget the second param
	var hours   = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	var seconds = sec_num - (hours * 3600) - (minutes * 60);

	// if (hours   < 10) {hours   = "0"+hours;}
	if (minutes < 10) {minutes = "0"+minutes;}
	if (seconds < 10) {seconds = "0"+seconds;}
	return minutes+':'+seconds;
}

class GameHeader extends React.Component{

	constructor(props){
		super(props);
		this.state = {};
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
			return toHHMMSS(this.props.timer)
		} else {
			return '00:00';
		}
	}
	



	displayRound = () =>{
		//this.state.game.round
		return `${this.props.currentRound}/5`;
	}

	exitGame = () =>{
		this.props.exitGame()
	}
	


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