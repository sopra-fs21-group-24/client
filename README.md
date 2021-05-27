<h1 align="center">MAPGUESSЯ</h1>

<p align="center">
<img width=30%" src="https://github.com/sopra-fs21-group-24/client/blob/master/public/logo.png" />
</p>

# Introduction
We created a game similair to [GeoGuessr](https://www.geoguessr.com/). The players will be randomly placed somewhere on Google maps (for example: a country, a city or a monumental place like the eiffel tower). At the beginning of the game the map won't be visible and there are some clouds over the map. The goal of the player is to brush away as little as possible of the clouds to recognize the place he is located in. The player will give his answer by placing a pin on a map that is displayed on the lower left side of the screen. The scoring will be based on points. Depending on the game mode points are computed by time, accuracy of guess and amount of clouds brushed away.


Check out a deployed instance of the game here: [sopra-fs21-group-24-client.herokuapp.com](https://sopra-fs21-group-24-client.herokuapp.com/)

Associated Back End repository can be found here: [Server Repository](https://github.com/sopra-fs21-group-24/server)

Data & Reports regarding the project: [Data Repository](https://github.com/sopra-fs21-group-24/data)

- [Technologies](#technologies)
- [High-level components](#high-level-components)
    - [Authentication](#authentication)
    - [Launch](#launch)
    - [Home](#home)
    - [Lobby](#lobby)
    - [Game](#game)
- [Launch & Deployment](#launch-&-deployment)
- [Illustrations](#illustrations)
- [Roadmap](#roadmap)
    - [Question Type Selection Module](#question-type-selection-module)
    - [Tinting of Satellite Image](#tinting-of-satellite-image)
- [Authors and acknowledgment](#authors-and-acknowledgment)
- [License](#license)
# Technologies
Our geography-game is a node application running React JS with Javascript. For our UI components we used semantic react. The remaining dependencies are rather small and serve just very niche purposes that accelerated our dev process (Playing Sounds/ Alerts / Animations).
<p float="left">
<img width="100" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png" />

<img width="100" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png"/>
</p>

# High-level components
Besides the general react project structure our application can be split into 5 different parts:
* Authentication
* Launch
* Home
* Lobby
* Game

#### Authentication
Authentication contains login and register components used to facilitate the entire login/register process for our application and they are implemented on the Launch Screen.

[Code: Authentication Module](https://github.com/sopra-fs21-group-24/client/tree/master/src/components/authentication)

#### Launch
The Launch Screen is the first page a user lands on when navigating to our app. It displays a nice background video and allows the user to register or login.

[Code: Launch Module](https://github.com/sopra-fs21-group-24/client/blob/master/src/components/launch/Launch.js)
#### Home
The home screen has many responsibilities. It cycles in a lot of component leading up to the start of a game. The selection of the usermode/gamemode, updating ones profile, logging out and displaying a scoreboard of all user highscores for the different game modes.
[Code: Home Module](https://github.com/sopra-fs21-group-24/client/blob/master/src/components/home/Home.js)

#### Lobby
The lobby screens module consists of two major components, a screen and associated react components to join a lobby and the lobby screen itself for waiting till the game start.
[Code: Lobby Module](https://github.com/sopra-fs21-group-24/client/tree/master/src/components/lobby)
#### Game
The game screen is the most compley of all our components as it handles most of the FE gamelogic, displaying of satellite-imagery, interactive map for dropping pins, displaying of scores, playing sound-effects and manipulating the satellite image (clouds / pixelation).

[Code: Game Module](https://github.com/sopra-fs21-group-24/client/blob/master/src/components/game/GameController.js)

# Launch & Deployment
We require latest node & react for bugfree running of our application (Date: June 2021).

To get all the required dependecies needed for our application:
```sh
npm install
```
For hot reloading and running our application:
```sh
npm run dev
```
For building a "compiled" version of our application run:
```sh
npm run build
```

For running a "compiled" version of our application:
```sh
npm run start
```

### Connecting to BE
Our application requires a running BE. You can find our BE repo and installation guide [here](https://github.com/sopra-fs21-group-24/server).

To repoint the FE requests to a url of your liking (local/external URL) edit the [getDomain.js](https://github.com/sopra-fs21-group-24/client/blob/master/src/helpers/getDomain.js) File.

# Illustrations
#### Home
<p align="center">
<img width=60%" src="https://github.com/sopra-fs21-group-24/client/blob/master/public/HomeScreen.png" />
</p>
On the Application's Home Screen you can see the current leaderboard of all the Gamemodes. From here you can choose to start a Single- or Multiplayer Game. In the header your current Highscores are displayed. By clicking on your name you have the possibility to change your user data.

#### Lobby Screen
<p align="center">
<img width=60%" src="https://github.com/sopra-fs21-group-24/client/blob/master/public/LobbyScreen.png" />
</p>
If you choose to join a Lobby you will see this lobby screen. Choose the game mode / visibility on the left and see the invite key on the right to invite friends to your private game.

#### In Game Screen
<p align="center">
<img width=60%" src="https://github.com/sopra-fs21-group-24/client/blob/master/public/InGame.png" />
</p>
This is what you see during the game. You can place your guess on the minimap on the bottom right. In the header you see the most important stats about the current round.

#### ScoreScreen
<p align="center">
<img width=60%" src="https://github.com/sopra-fs21-group-24/client/blob/master/public/ScoreScreen.png" />
</p>
After Submiting a guess you'll be navigated to the Score Screen. Here you can see your current score aswell as the distance between your guess and the solution. After 10 seconds the next round starts.

# Roadmap
For the following two features help would be very much appreciated.
#### Question Type Selection Module
A component similair to the gameMode/userMode selection that lets the user select if they only want questions from places in **Switzerland**, **Europe** or **Worldwide**.

#### Tinting of Satellite Image
A gimmick to add would be red tinting the satelitte image more and more in the last 10s of each round, fo added game tension.
# Authors and acknowledgment
This project was started using the following back end [template](https://github.com/HASEL-UZH/sopra-fs21-template-server) provided by the University of Zurich.
#### Team Members
* Claudio Gebbia - [@claudioge](https://github.com/claudioge)
* Jérôme Hadorn - [@jeromehadorn](https://github.com/jeromehadorn)
* Hoàng Ben Lê Giang - [@benlegiang](https://github.com/benlegiang)
* David Diener - [@Dave5252](https://github.com/Dave5252)
* Philip Giryes - [@Pieli](https://github.com/Pieli)
# License
This project is licensed under the MIT license. Check out the License text [here](https://github.com/sopra-fs21-group-24/client/blob/master/LICENSE).
