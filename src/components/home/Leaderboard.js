import React, { useState } from "react";
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Dimmer,
  Loader,
} from "semantic-ui-react";

const Leaderboard = (props) => {
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState();
  const users = {
    Guesr: 1000,
    Dude: 990,
    Lu: 980,
    Ch: 800,
    Eier: 800,
    Bla: 730,
    Skia: 330,
    Ratnu: 300,
    MapKing: 30,
    Madguess: 20,
  };


  const modes = ["Time", "Pixelation", "Clouds"];

  return (
    <div>
      {loading ? (
        <Dimmer active inverted>
          <Loader indeterminate>Loading Leaderboard</Loader>
        </Dimmer>
      ) : (
        <Segment>
          <Menu widths={3} fluid tabular color="black" compact>
            {modes.map((mode) => (
              <Menu.Item name={mode} onClick={() => setDisplay(mode)} active={display===mode}>
                {mode}
              </Menu.Item>
            ))}
          </Menu>
          <List divided verticalAlign="middle">
            {Object.keys(users).map(function (key, index) {
              return (
                <List.Item>
                  <List.Content floated="right">
                    <Header as="h2" color = "grey">{users[key]}</Header>
                  </List.Content>
                  <List.Content><Header color="grey" as="h2">{key}</Header></List.Content>
                </List.Item>
              );
            })}
          </List>
        </Segment>
      )}
    </div>
  );
};

export default Leaderboard;
