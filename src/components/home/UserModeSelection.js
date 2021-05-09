import React from "react";
import { Button, Grid, Icon } from "semantic-ui-react";
import { motion } from "framer-motion";
import { scale } from "react-component-transition/build/cjs/animations";
import styled from "styled-components";


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
          <h1>
            Start a singleplayer game or play with friends!
          </h1>
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
                }}
                onClick={() => {
                  toggleUsermodeDisplay();
                  toggleGamemodeDisplay();
                }}
              >
                Singleplayer
              </motion.button>
              {/* <Button
                size="big"
                // fluid
                animated="fade"
                color="green"
                onClick={() => {
                  toggleUsermodeDisplay();
                  toggleGamemodeDisplay();
                }}
              >
                <Button.Content visible>Singleplayer</Button.Content>
                <Button.Content hidden>
                  <Icon name="user" />
                </Button.Content>
              </Button> */}
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
                }}
                onClick={() => {
                  toggleUsermodeDisplay();
                  toggleCreateJoinLobbyDisplay();
                }}
              >
                Multiplayer
              </motion.button>
              {/* <Button
                size="big"
                // fluid
                animated="fade"
                color="red"
                onClick={() => {
                  toggleUsermodeDisplay();
                  toggleCreateJoinLobbyDisplay();
                }}
              >
                <Button.Content visible>Multiplayer</Button.Content>
                <Button.Content hidden>
                  <Icon name="users" />
                </Button.Content>
              </Button> */}
            </center>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default UserModeSelection;
