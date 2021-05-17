import React, { useState, useEffect } from "react";
import { api } from "../../helpers/api";
import { RiVipCrownLine } from 'react-icons/ri';
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
  const [encounteredError, setEncounteredError] = useState(false)
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
        setEncounteredError(true);
        // alert("Something went wrong fetching the leaderboard")
      }
    }    
    })
  let count = 0;
  const modes = [{mode:"Time",icon:"clock outline"},{mode: "Pixelation", icon:"chess board"}, {mode:"Clouds", icon:"cloud"}];
  const changer = (mode)=>{
    setDisplay(mode);
    setStopp(false);
  }
  return (
    <div>
      {encounteredError && <h3 style={{color:"red"}}>Encountered Error fetching the Leaderboard. Please refresh the screen.</h3>}
       

          <Menu widths={3} fluid tabular compact inverted>
            {modes.map((mode) => (
              <Menu.Item  name={mode} onClick={() => changer(mode.mode)} active={display===mode.mode}>
                <Icon size="big" name={mode.icon}/>
                {mode.mode}

              </Menu.Item>
            ))}
          </Menu>
          <List animated verticalAlign="middle">
            {users.map((user)=>{
              count++;
              return (
                <List.Item>
                  <List.Content floated="right">
                    <Header as="h2" block>{user.score}</Header>
                  </List.Content>
                  <List.Content><Header block color="black" as="h2">{count}. {user.username} {count===1?<RiVipCrownLine/>:<p></p>}</Header></List.Content>
                </List.Item>
              );
            })}
          </List>

      
    </div>
  );
};

export default Leaderboard;
