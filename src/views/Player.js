import React from "react";
import styled from "styled-components";
import {DefaultButton} from "./design/Button.js"

const Container = styled.div`
  margin: 6px 0;
  width: 280px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff26;
`;

const UserName = styled.div`
  font-weight: lighter;
  margin-left: 5px;
`;

const Name = styled.a`
  font-weight: bold;
  text-decoration: underline;
  color: #06c4ff;
`;

const Id = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
`;

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */

 function isUserOnline(user) {
  if (user.logged_in == "ONLINE") {
    return true
  }
  else {
    return false
  }
}

const Player = ({ user, action }) => {

  

  return (
    <Container  style={{
      backgroundColor: isUserOnline(user) ? 'green' : 'red'
    }}>
      <Name>{user.name}</Name> <UserName>{user.username}</UserName>
      <Id>Id: {user.id}</Id>
    <DefaultButton onClick={action}>Profile</DefaultButton>
    </Container>
  );
};

export default Player;
