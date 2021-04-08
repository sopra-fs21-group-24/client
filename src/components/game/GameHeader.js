import React from 'react';
import { Button, Menu, Modal,Icon } from 'semantic-ui-react'

class GameHeader extends React.Component{

	constructor(props){
		super(props);
		this.state = {};
	}

	componentDidMount(){
		//start clock
	}


	displayScore = () =>{
		return this.props.players.player1.totalScore;
	}

	clock = () =>{
		return '00:00';
	}



	displayRound = () =>{
		//this.state.game.round
		return '1/5';
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