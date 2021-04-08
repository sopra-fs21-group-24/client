import React from "react";
import { api, handleError } from "../../helpers/api";
import { withRouter } from "react-router-dom";
import UserModeSelection from "./UserModeSelection";
import GameModeSelection from "./GameModeSelection";
import RoomSelection from "./RoomSelection";
<<<<<<< Updated upstream
import { Button, Grid, Segment, Image } from "semantic-ui-react";

=======
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
>>>>>>> Stashed changes
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      isUsermodeDisplayed: true,
      isGamemodeDisplayed: false,
      isCreateJoinRoomDisplayed: false,
      selectedUsermode: null,
      selectedGamemode: null,
<<<<<<< Updated upstream
=======
      user: {
        username:""
      }
>>>>>>> Stashed changes
    };
  }

  toggleUsermodeDisplay = () => {
    this.setState({ isUsermodeDisplayed: !this.state.isUsermodeDisplayed });
  };

  toggleGamemodeDisplay = () => {
    this.setState({ isGamemodeDisplayed: !this.state.isGamemodeDisplayed });
  };

  toggleCreateJoinRoomDisplay = () => {
    this.setState({
      isCreateJoinRoomDisplayed: !this.state.isCreateJoinRoomDisplayed,
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
<<<<<<< Updated upstream
      <Grid columns={2} divided centered>
        <Grid.Row>
          <h1>Welcome to MAPGUESSЯ</h1>
        </Grid.Row>
        <Grid.Column>
          {this.state.isUsermodeDisplayed == true ? (
            <UserModeSelection
=======
      <div>

          <HomeHeader logout={this.logout} updateUser={this.updateUser} user={this.state.user} height = {"50"}/> 
        
        <Grid columns={adsEnabled  ? 3:2} divided centered>
          <Grid.Row>
        
          </Grid.Row>
          {adsEnabled ?  <Grid.Column>
            
            <Advertisement centered unit='half page' test='Half Page' />
          </Grid.Column>:null}
         
          <Grid.Column>
            {this.state.isUsermodeDisplayed == true ? (
              <UserModeSelection
>>>>>>> Stashed changes
              toggleUsermodeDisplay={this.toggleUsermodeDisplay}
              toggleGamemodeDisplay={this.toggleGamemodeDisplay}
              toggleCreateJoinRoomDisplay={this.toggleCreateJoinRoomDisplay}
              setUsermode={this.setUsermode}
            />
          ) : null}
          {this.state.isGamemodeDisplayed == true ? (
            <GameModeSelection
              toggleUsermodeDisplay={this.toggleUsermodeDisplay}
              toggleGamemodeDisplay={this.toggleGamemodeDisplay}
              toggleCreateJoinRoomDisplay={this.toggleCreateJoinRoomDisplay}
              usermode={this.state.selectedUsermode}
              setGamemode={this.setGamemode}
            />
          ) : null}
          {this.state.isCreateJoinRoomDisplayed == true ? (
            <RoomSelection
              toggleUsermodeDisplay={this.toggleUsermodeDisplay}
              toggleCreateJoinRoomDisplay={this.toggleCreateJoinRoomDisplay}
              toggleGamemodeDisplay={this.toggleGamemodeDisplay}
<<<<<<< Updated upstream
            />
          ) : null}
        </Grid.Column>
        <Grid.Column>
          <p>Leaderboard will be displayed in this segment!</p>
        </Grid.Column>
      </Grid>
    );
=======
              />
              ) : null}
          </Grid.Column>
          <Grid.Column>
            <Label>Leaderboard will be displayed in this segment!</Label>
          </Grid.Column>
        </Grid>
     </div>
      )
      }

     


  async getUser(){
    try {
      let userId = localStorage.getItem('currentUserId')
      const response = await api.get('/users/'+userId);
      // delays continuous execution of an async operation for 1 second.
      // This is just a fake async call, so that the spinner can be displayed
      // feel free to remove it :)
      // await new Promise(resolve => setTimeout(resolve, 500));

      // Get the returned users and update the state.
      let st = this.state
      st.user = response.data
      this.setState(st);

      // See here to get more data.
      console.log(this.state);
    } catch (error) {
      alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }
>>>>>>> Stashed changes
  }
}

export default withRouter(Home);
