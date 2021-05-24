import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Lobby from "../../lobby/Lobby";
// import Game from "../../game/Game"
import GameController from "../../game/GameController";
import Launch from "../../launch/Launch";
import Login from "../../authentication/login/Login";
import Register from "../../authentication/register/Register";
import { GameGuard } from "../routeProtectors/GameGuard";
import { HomeGuard } from "../routeProtectors/HomeGuard";
import { LobbyGuard } from "../routeProtectors/LobbyGuard";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import HomeRouter from "./HomeRouter";
import LobbyRouter from "./LobbyRouter";
import { api, getAuthConfig, handleError } from "../../../helpers/api";


class AppRouter extends React.Component {

  constructor(){
    super();
  }

  async getUser(){
    try {
      let userId = localStorage.getItem("currentUserId");
      const response =  api.get("/users/" + userId);
      return response.data
    } catch (error) {
     return null
    }
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div>
            <Route
              path="/home"
              render={() => {
                if (this.getUser()){
                  return <HomeRouter base={"/home"} />
                } else {
                  return <Launch/>
                }
              }}    
            />
            <Route
              path="/game"
              render={() => (
                <GameGuard>
                  <GameController gameId="5" />
                </GameGuard>
              )}
            />
            <Route
              path="/login"
              exact
              render={() => (
                <LoginGuard>
                  <Login />
                </LoginGuard>
              )}
            />
            <Route
              path="/register"
              exact
              render={() => (
                <LoginGuard>
                  <Register />
                </LoginGuard>
              )}
            />
            <Route
              path="/lobby"
              render={() => (
                <LobbyGuard>
                  <LobbyRouter base={"/lobby"} />
                </LobbyGuard>
              )}
            />

            <Route path="/" exact render={() => <Launch />} />
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}
export default AppRouter;
