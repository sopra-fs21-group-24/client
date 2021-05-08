import React, { useState, useEffect } from "react";
import { api } from "../../helpers/api";
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
  const [display, setDisplay] = useState("Time");
  let users = []

  useEffect(() => {
    setLoading(true);
    try{
      users = api.get("/leaderboard/" + display);
    }catch{
      alert("Something went wrong fetching the leaderboard")
    }
    setLoading(false);
  })

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
            {users.map((user)=>{
              return (
                <List.Item>
                  <List.Content floated="right">
                    <Header as="h2" color = "grey">{user.score}</Header>
                  </List.Content>
                  <List.Content><Header color="grey" as="h2">{user.username}</Header></List.Content>
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
