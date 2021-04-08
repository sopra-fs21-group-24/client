import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { HomeGuard } from "../routeProtectors/HomeGuard";
import HomeRouter from "./HomeRouter";
import LobbyRouter from "./LobbyRouter";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import { LobbyGuard } from "../routeProtectors/LobbyGuard";
import Login from "../../login/Login";
import Register from "../../register/Register";
import Profile from "../../profile/Profile";
import Launch from "../../launch/Launch";
import NewHeader from "../../../views/Header";
import Lobby from "../../lobby/Lobby";


// import Game from "../../game/Game"
import GameController from "../../game/GameController";

// import {GamepageGuard} from "../routeProtectors/GamepageGuard";
// import GamepageRouter from "./GamepageRouter";
/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/home".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /home renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div>
            
            <Route
              path="/home"
              render={() => (
                <HomeGuard>
               
                  <HomeRouter base={"/home"} />
                </HomeGuard>
              )}
            />
            {/* <Route
              path="/gamepage"
              render={()=>(
                <GamepageGuard>
                  <GamepageRouter base = {"/gamepage"}/>
                </GamepageGuard>
              )}


            /> */}
<Route
              path="/game"
              render={() => (
                //TODO: add guard at some point
                
                  <GameController gameId="5"/>
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
                <NewHeader height={"50"} />
                <LobbyRouter base={"/lobby"}/>
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
/*
 * Don't forget to export your component!
 */
export default AppRouter;
