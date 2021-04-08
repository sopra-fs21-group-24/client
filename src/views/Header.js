import React, { Component } from 'react';
import { GoogleMap, withGoogleMap, Marker } from "react-google-maps";
import { Grid,Dropdown,Item,Comment, Popup,Card, Header, Image, Button, Label, Segment,Container,Menu,Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import ProfileModal from '../components/profile/Profile';


const ProfileIcon = (()=>(

    <Header as='h3'>
        <Icon name='user' />
        <Header.Content>
        <p onClick={()=>{console.log("Patrick")}}>Patrick</p>
        <Header.Subheader as='h6'>HighScore: 110 | 60 | 20</Header.Subheader>
        </Header.Content>
    </Header>  
    
))

const BigContainer = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TopRightPopup = styled.div`
margin-top: 10px;
margin-right:10px;
position:absolute;
top:10px;
right:10px;
display: block;
`;
export const TopRightButton = styled.div`
  margin-top: 50px;
  margin-right: 50px;
  position:absolute;
  top:20px;
  right:20px;
`;
const topnav = styled.div`
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
`;

const topnav_right = styled.div`
  float: right;
`;


const topnav_centered = styled.a`
float: none;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;

const rbutton = styled.button`
  position:absolute;
  right:0;
  top:0;
`;


const HomeHeader = props => {
  console.log("in home header", props)
  return (
    
   
    <BigContainer  height={props.height}>
      
    <Menu  secondary fixed='top' >
    <Container>
      <Menu.Item header>
        {/* <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} /> */}
        <Header as="h2">MAPGUESSЯ</Header>
      </Menu.Item>
      <Menu.Item position='right'>
        HighScore: 100 | 50 | 70
      </Menu.Item>
      <Menu.Item as='a' >

      

      <Dropdown  button floating   className='icon'  text={props.user.username}
  icon='user' position='right'>
      {/* <Input icon='search' iconPosition='left' className='search' /> */}
        <Dropdown.Menu>
          <ProfileModal user={props.user} updateUser={props.updateUser}/>
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
