import React from "react";
import { Button, Icon, Grid } from "semantic-ui-react";
import { motion } from "framer-motion";

const GameModeSelection = ({
  toggleGamemodeDisplay,
  toggleUsermodeDisplay,
  toggleCreateJoinLobbyDisplay,
  usermode,
  createSingleplayerGame,
}) => {
  return (
    <Grid centered>
      <Grid.Row centered>
        <motion.h1
        transition={{
          type: 'spring',
          stiffness: 300
        }}
        >Choose which gamemode you want to play!
        </motion.h1>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column centered width={7}>
          <center>
            <motion.button
              initial={{
                fontSize: "20px",
                width: "200px",
                height: "60px",
                opacity: 1,
                x: -300,
                backgroundColor: "#c3dcff",
                scale: 1,
                borderRadius: '8px'
              }}
              animate={{
                x: 0,
              }}
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgb(255, 255, 255)",
                boxShadow: "0px 0px 8px rgb(255, 255, 255)",
              }}
              onClick={() => {
                createSingleplayerGame("Time");
              }}
            >
              Time
            </motion.button>
            {/* <Button
            size="big"
            animated ='fade'
            fluid
            color="blue"
            onClick={() => {
              createSingleplayerGame("Time");
            }}
          >
            <Button.Content visible>Time</Button.Content>
            <Button.Content hidden><Icon name="clock outline" /></Button.Content>

          </Button> */}
          </center>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column centered width={7}>
          <center>
            <motion.button
              initial={{
                fontSize: "20px",
                width: "200px",
                height: "60px",
                opacity: 1,
                x: 300,
                backgroundColor: "#d8d3ff",
                scale: 1,
                borderRadius: '8px'
              }}
              animate={{
                x: 0,
              }}
              transition={{
                delay: 0.05,
              }}
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgb(255, 255, 255)",
                boxShadow: "0px 0px 8px rgb(255, 255, 255)",
              }}
              onClick={() => {
                createSingleplayerGame("Pixelation");
              }}
            >
              Pixelation
            </motion.button>
            {/* <Button
            size="big"
            animated ='fade'
            fluid
            color="blue"
            onClick={() => {
              createSingleplayerGame("Pixelation");
            }}
          >
            <Button.Content visible>Pixelation</Button.Content>
            <Button.Content hidden><Icon name="chess board" /></Button.Content>
            
          </Button> */}
          </center>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column centered width={7}>
          <center>
            <motion.button
              initial={{
                fontSize: "20px",
                width: "200px",
                height: "60px",
                opacity: 1,
                x: -300,
                backgroundColor: "#cfcfe1",
                scale: 1,
                borderRadius: '8px'
              }}
              animate={{
                x: 0,
              }}
              transition={{
                delay: 0.1,
              }}
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgb(255, 255, 255)",
                boxShadow: "0px 0px 8px rgb(255, 255, 255)",
              }}
              onClick={() => {
                createSingleplayerGame("Clouds");
              }}
            >
              Clouds
            </motion.button>
            {/* <Button
            size="big"
            animated ='fade'
            fluid
            color="blue"
            onClick={() => {
              createSingleplayerGame("Clouds");
            }}
          >
            <Button.Content visible>Clouds</Button.Content>
            <Button.Content hidden><Icon name="cloud"/></Button.Content>
          </Button> */}
          </center>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column centered>
          <center>
            <motion.button
              initial={{
                fontSize: "15px",
                color: "white",
                width: "100px",
                height: "40px",
                opacity: 1,
                x: -300,
                backgroundColor: "#323232",
                scale: 1,
                borderRadius: '8px'
              }}
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgb(255, 255, 255)",
                boxShadow: "0px 0px 8px rgb(255, 255, 255)",
              }}
              onClick={() => {
                if (usermode === "multiplayer") {
                  toggleGamemodeDisplay();
                  toggleCreateJoinLobbyDisplay();
                } else {
                  toggleGamemodeDisplay();
                  toggleUsermodeDisplay();
                }
              }}
            >
              Go Back
            </motion.button>

            {/* <Button
            size="big"
            // fluid
            color="black"
            onClick={() => {
              if (usermode === "multiplayer") {
                toggleGamemodeDisplay();
                toggleCreateJoinLobbyDisplay();
              } else {
                toggleGamemodeDisplay();
                toggleUsermodeDisplay();
              }
            }}
          >
            Go back
          </Button> */}
          </center>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default GameModeSelection;
