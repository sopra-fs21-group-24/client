import React from "react";
import { Button, Icon, Grid } from "semantic-ui-react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Header = styled.h1`
  text-align: center;
  text-shadow: 2px 2px #006699;
  font-size: 30px;
  color: white;
  width: 100%;
`;

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
        <Header>Choose which gamemode you want to play!</Header>
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
                borderRadius: "8px",
              }}
              animate={{
                x: 0,
              }}
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgb(255, 255, 255)",
                boxShadow: "0px 0px 8px rgb(255, 255, 255)",
                cursor: "pointer",
              }}
              onClick={() => {
                createSingleplayerGame("Time");
              }}
            >
              Time
            </motion.button>
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
                borderRadius: "8px",
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
                cursor: "pointer",
              }}
              onClick={() => {
                createSingleplayerGame("Pixelation");
              }}
            >
              Pixelation
            </motion.button>
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
                borderRadius: "8px",
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
                cursor: "pointer",
              }}
              onClick={() => {
                createSingleplayerGame("Clouds");
              }}
            >
              Clouds
            </motion.button>
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
                borderRadius: "8px",
              }}
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgb(255, 255, 255)",
                boxShadow: "0px 0px 8px rgb(255, 255, 255)",
                cursor: "pointer",
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
          </center>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default GameModeSelection;
