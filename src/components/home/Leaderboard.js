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
  const [display, setDisplay] = useState("Time");
  const [users, setUsers] = useState([]);
  const [stopp, setStopp] = useState(false)
  
  useEffect(() => {
    if(!stopp){
      fetch();
      setStopp(true);
    }
    async function fetch(){
      try{
        const response = await api.get("/leaderboard/" + display);
        setUsers(response.data)
        
      }catch{
        alert("Something went wrong fetching the leaderboard")
      }
    }

    
    })

  const modes = [{mode:"Time",icon:"clock outline"},{mode: "Pixelation", icon:"chess board"}, {mode:"Clouds", icon:"cloud"}];
  const changer = (mode)=>{
    setDisplay(mode);
    setStopp(false);
  }
  return (
    <div>
        <Segment>
          <Menu widths={3} fluid tabular color="black" compact>
            {modes.map((mode) => (
              <Menu.Item  name={mode} onClick={() => changer(mode.mode)} active={display===mode.mode}>
                <Icon size="big" name={mode.icon}/>
                {mode.mode}

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
      
    </div>
  );
};

export default Leaderboard;
