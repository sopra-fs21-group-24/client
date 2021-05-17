import React from "react";
import { Button, Grid, Icon } from "semantic-ui-react";
import { motion } from "framer-motion";
import { scale } from "react-component-transition/build/cjs/animations";
import styled from "styled-components";

const Header = styled.h1`
  text-align: center;
  text-shadow: 2px 2px #006699;
  font-size: 30px;
  color: white;
  width: 100%;
`;

const UserModeSelection = ({
  toggleUsermodeDisplay,
  toggleGamemodeDisplay,
  toggleCreateJoinLobbyDisplay,
  setUsermode,
}) => {
  return (
    <div>
      <Grid centered>
        <Grid.Row>
          <Header>Start a singleplayer game or play with friends!</Header>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column centered>
            <center>
              <motion.button
                initial={{
                  fontSize: "20px",
                  width: "200px",
                  height: "60px",
                  opacity: 1,
                  x: -300,
                  backgroundColor: "#bfe4cf",
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
                  toggleUsermodeDisplay();
                  toggleGamemodeDisplay();
                }}
              >
                Singleplayer
              </motion.button>
            </center>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column centered>
            <center>
              <motion.button
                initial={{
                  fontSize: "20px",
                  width: "200px",
                  height: "60px",
                  opacity: 1,
                  x: -300,
                  backgroundColor: "#eb99a2",
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
                  toggleUsermodeDisplay();
                  toggleCreateJoinLobbyDisplay();
                }}
              >
                Multiplayer
              </motion.button>
            </center>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default UserModeSelection;
