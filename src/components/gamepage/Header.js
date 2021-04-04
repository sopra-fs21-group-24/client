import React from 'react';
import { Button, Menu } from 'semantic-ui-react'

class Header extends React.Component{

	constructor(props){
		super(props);
		this.state = {}
	}

	componentDidMount(){

	}


	displayScore = () =>{
		return 13000;
	}

	clock = () =>{
		return '00:00';
	}



	displayRound = () =>{
		return '1/5';
	}

	exitGame = () =>{
		alert("Are you sure you want to quit the game?");
	}

	render() {
		
	

		return (
			<Menu size='small' inverted borderless size = 'mini' attached>
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

export default Header;