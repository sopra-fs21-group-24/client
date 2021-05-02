import React from "react";
import { Container, Dropdown, Header, Menu, Popup } from "semantic-ui-react";
import styled from "styled-components";
import ProfileModal from "../components/profile/Profile";

const BigContainer = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomeHeader = (props) => {
  console.log("in home header", props);

  let username = props.user ? props.user.username : "Placeholder";
  let user = props.user ? props.user : { username: "", password: "" };
  let userScore = props.userScore
    ? props.userScore
    : { clouds: 0, pixelation: 0, time: 0 };

  return (
    <BigContainer height={props.height}>
      <Menu secondary fixed="top">
        <Container>
          <Menu.Item header>
            {/* <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} /> */}
            <Header inverted as="h2">MAPGUESSЯ</Header>
          </Menu.Item>
          <Menu.Item position="right">
            
          <Popup content ='Here you can see your highscores for clouds|pixelation|time mode' trigger ={<Header inverted as = 'h3'>HighScores:  {userScore.clouds} | {userScore.pixelation} | {"0"}</Header>}/> 
            {userScore.time}
            
          </Menu.Item>
          
          <Menu.Item as="a">
            <Dropdown
              button
              floating
              className="icon"
              text={username}
              icon="user"
              position="right"
            >
              <Dropdown.Menu>
                <ProfileModal user={user} updateUser={props.updateUser} />
                <Dropdown.Item onClick={props.logout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Container>
      </Menu>
    </BigContainer>
  );
};

export default HomeHeader;
