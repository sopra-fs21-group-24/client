import React from "react";
import { api, handleError } from "../../helpers/api";
import { withRouter } from "react-router-dom";
import UserModeSelection from "./UserModeSelection";
import GameModeSelection from "./GameModeSelection";
import LobbySelection from "./LobbySelection";
import RoomSelection from "./RoomSelection";
import { Button, Grid, Segment, Image, Advertisement } from "semantic-ui-react";
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { Label } from 'semantic-ui-react';
import HomeHeader from '../../views/Header';

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;
const adsEnabled = false;
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      isUsermodeDisplayed: true,
      isGamemodeDisplayed: false,
      isCreateJoinLobbyDisplayed: false,
      selectedUsermode: null,
      selectedGamemode: null,
      user: {
        username:""
      }
    };
  

  this.getUser()

  this.updateUser = this.updateUser.bind(this);
  this.logout = this.logout.bind(this);
}
  

  toggleUsermodeDisplay = () => {
    this.setState({ isUsermodeDisplayed: !this.state.isUsermodeDisplayed });
  };

  toggleGamemodeDisplay = () => {
    this.setState({ isGamemodeDisplayed: !this.state.isGamemodeDisplayed });
  };

  toggleCreateJoinLobbyDisplay = () => {
    this.setState({
      isCreateJoinLobbyDisplayed: !this.state.isCreateJoinLobbyDisplayed,
    });
  };

  setUsermode = (usermode) => {
    this.setState({ selectedUsermode: usermode });
  };

  setGamemode = (gamemode) => {
    this.setState({ selectedGamemode: gamemode });
  };

  async componentDidMount() {
    try {
    } catch (error) {
      alert(
        `Something went wrong while fetching the users: \n${handleError(error)}`
      );
    }
  }

  render() {
    return (
      <div>

          <HomeHeader logout={this.logout} updateUser={this.updateUser} user={this.state.user} height = {"50"}/> 
        
        <Grid columns={3} divided centered>
          <Grid.Row>
        
          </Grid.Row>
          {adsEnabled ?  <Grid.Column>
            
            <Advertisement centered unit='half page' test='Half Page' />
          </Grid.Column>:null}
         
          <Grid.Column>
            {this.state.isUsermodeDisplayed == true ? (
              <UserModeSelection
              toggleUsermodeDisplay={this.toggleUsermodeDisplay}
              toggleGamemodeDisplay={this.toggleGamemodeDisplay}
              toggleCreateJoinLobbyDisplay={this.toggleCreateJoinLobbyDisplay}
              setUsermode={this.setUsermode}
              />
              ) : null}
            {this.state.isGamemodeDisplayed == true ? (
              <GameModeSelection
              toggleUsermodeDisplay={this.toggleUsermodeDisplay}
              toggleGamemodeDisplay={this.toggleGamemodeDisplay}
              toggleCreateJoinLobbyDisplay={this.toggleCreateJoinLobbyDisplay}
              usermode={this.state.selectedUsermode}
              setGamemode={this.setGamemode}
            />
          ) : null}
          {this.state.isCreateJoinLobbyDisplayed == true ? (
            <LobbySelection
              toggleUsermodeDisplay={this.toggleUsermodeDisplay}
              toggleCreateJoinLobbyDisplay={this.toggleCreateJoinLobbyDisplay}
              toggleGamemodeDisplay={this.toggleGamemodeDisplay}
            />
          ) : null}
        </Grid.Column>
        <Grid.Column>
          <p>Leaderboard will be displayed in this column!</p>
        </Grid.Column>
      </Grid>
      </div>
    );
  }

  async updateUser(username, password){
    console.log(username,password)
    try {
      let userId = localStorage.getItem('currentUserId')
      let token = localStorage.getItem('token')
      let data = {
        username:username,
        password:password,
        // id:userId
      }
      let config = {
        headers: {
          'Authorization': `Basic ${token}` 
        }
      }
      const response = await api.put('/users/'+userId, data, config);
      console.log(response)
      // this.setState({user:response})
      // delays continuous execution of an async operation for 1 second.
      // This is just a fake async call, so that the spinner can be displayed
      // feel free to remove it :)
      // await new Promise(resolve => setTimeout(resolve, 500));

     this.getUser()

    } catch (error) {
      alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }
  }

  
  // async componentDidMount() {
     
  // }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUserId');
    this.props.history.push('/login');
  }

 

  // render() {
  //   return (
  //     <Container>
  //      <HomeHeader logout={this.logout} updateUser={this.updateUser} user={this.state.user} height = {"50"}/> 
  //       <Label>Let's guess them coordinates:</Label>
  //     </Container>
  //   );
  // }
}

export default withRouter(Home);
