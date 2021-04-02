import React from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import { Button } from 'semantic-ui-react'
import { ReactLogo } from "./ReactLogo";

/**
 * Using styled-components you can visual HTML primitives and use props with it!
 * The idea behind this external package, it's to have a better structure and overview for your HTML and CSS
 * Using styled-components, you can have styling conditions using the following syntax: ${props => ...}
 * https://www.styled-components.com/
 */
const Container = styled.div`
  height: ${props => props.height}px;
  background: ${props => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: bold;
  color: white;
  text-align: center;
  cursor: pointer;
`;

const LogOutButton = styled(Button)`
  position: absolute;
  right: 10px;
  top: 5px;
`;
/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */

 function isUserLoggedIn(){
  let token = localStorage.getItem('token')
  let userId = localStorage.getItem('currentUserId')
  console.log(token != null && userId != null)
  return token != null && userId != null
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUserId');
}

const Header = props => {
  return (
    
    <Container height={props.height}>
      <Title ><a onClick={()=>{
        props.history.push('/')
      }}>MAPGUESSЯ</a></Title>
      
      
        { isUserLoggedIn() ?  
          
         <LogOutButton onClick={()=>{
          logout()
          props.history.push('/login')
          }}
          >Logout</LogOutButton> : null
        }

    </Container>
  );
};

/**
 * Don't forget to export your component!
 */
// export default Header;
const NewHeader = withRouter(Header)
export default NewHeader;
