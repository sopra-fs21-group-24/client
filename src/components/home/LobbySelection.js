import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  Button,
  Grid,
  Segment,
  Dimmer,
  Loader,
  Image,
} from "semantic-ui-react";
import { handleError, api } from "../../helpers/api";
import { motion } from "framer-motion";

const LobbySelection = ({
  toggleUsermodeDisplay,
  toggleCreateJoinLobbyDisplay,
  toggleGamemodeDisplay,
  createLobby,
}) => {
  const history = useHistory();

  const LoaderExampleActive = () => (
    <Segment>
      <Loader active />
      <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
    </Segment>
  );

  return (
    <Grid centered>
      <Grid.Row centered>
        <h1>Create a new lobby or join an existing lobby!</h1>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column centered width="7">
          <center>
            <motion.button
              initial={{
                fontSize: "20px",
                width: "200px",
                height: "60px",
                opacity: 1,
                y: -200,
                backgroundColor: "#fffce0",
                scale: 1,
                borderRadius: "8px",
              }}
              animate={{
                x: 0,
                y: 0,
              }}
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgb(255, 255, 255)",
                boxShadow: "0px 0px 8px rgb(255, 255, 255)",
              }}
              onClick={async () => {
                await createLobby();
                LoaderExampleActive();
                toggleCreateJoinLobbyDisplay();
              }}
            >
              Create Lobby
            </motion.button>
            {/* <Button
            size="big"
            fluid
            color="blue"
            onClick={async() => {
              await createLobby();
              LoaderExampleActive();
              toggleCreateJoinLobbyDisplay();
            }}
            >
            Create Lobby
          </Button> */}
          </center>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column centered width="7">
          <center>
            <motion.button
              initial={{
                fontSize: "20px",
                width: "200px",
                height: "60px",
                opacity: 1,
                y: -100,
                backgroundColor: "#c3dcff",
                scale: 1,
                borderRadius: "8px",
              }}
              animate={{
                x: 0,
                y: 0,
              }}
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgb(255, 255, 255)",
                boxShadow: "0px 0px 8px rgb(255, 255, 255)",
              }}
              onClick={() => {
                history.push({
                  pathname: "/lobby/join",
                });
              }}
            >
              Join Lobby
            </motion.button>
            {/* <Button
            size="big"
            fluid
            color="blue"
            onClick={() => {
              history.push({
                pathname: "/lobby/join",
              });
            }}
            >
            Join Lobby
          </Button> */}
          </center>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column centered width="7">
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
              }}
              onClick={() => {
                toggleCreateJoinLobbyDisplay();
                toggleUsermodeDisplay();
              }}
            >
              Go Back
            </motion.button>
            {/* <Button
            size="big"
            // fluid
            color="black"
            onClick={() => {
              toggleCreateJoinLobbyDisplay();
              toggleUsermodeDisplay();
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

export default LobbySelection;
