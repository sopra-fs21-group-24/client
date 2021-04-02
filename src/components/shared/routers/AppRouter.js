import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Login from "../../login/Login";
import Register from "../../register/Register"
import Profile from "../../profile/Profile"
import Launch from "../../launch/Launch";
import Header from "../../../views/Header"
import {GamepageGuard} from "../routeProtectors/GamepageGuard";
import GamepageRouter from "./GamepageRouter";
/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div>
            <Route
              path="/game"
              render={() => (
                <GameGuard>
                  <Header height = {"50"}/> 
                  <GameRouter base={"/game"} />
                </GameGuard>
              )}
            />
            <Route
              path="/gamepage"
              render={()=>(
                <GamepageGuard>
                  <GamepageRouter base = {"/gamepage"}/>
                </GamepageGuard>
              )}
            />
            <Route
              path="/login"
              exact
              render={() => (
                <LoginGuard>
                  <Header height = {"50"}/> 
                  <Login />
                </LoginGuard>
              )}
            />
            <Route
              path="/register"
              exact
              render={() => (
                <div>
                  <Header height = {"50"}/> 
                  <Register />
               </div>
              )}
            />
             <Route
              path="/profile"
              exact
              render={() => (
<GameGuard>
<Header height = {"50"}/> 
  <Profile />
</GameGuard>
               
              )}
            />
            <Route
              path="/gamepage"
              render={() => (
                <GameGuard>
                  <Header height = {"50"}/> 
                  <GameRouter base={"/gamepage"} />
                </GameGuard>
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
