import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
// import sample from '../../video.mp4';

const Title = styled.h1`
  font-weight: bold;
  color: white;
  text-align: center;
`;
const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const Video = styled.video`
height: 100%;
width: 100%;
float: left;
top: 0;
padding: none;
// position: fixed;
`;

const VideoBox =  styled.div`
float:left;
`;

const VideoOverlays = styled.div`
position:absolute;
float:left;
width:100%;
min-height:370px;
background-color:transparent;
z-index:300000;
`;

// const TopRightButton =styled.button`
//     line-height: 12px;
//     width: 50px;
//     font-size: 8pt;
//     font-family: tahoma;
//     margin-top: 10px;
//     margin-right: 10px;
//     position:absolute;
//     top:0;
//     right:0;
// `;
export const TopRightButton = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  padding: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  width: ${props => props.width || null};
  height: 35px;
  border: none;
  border-radius: 20px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgb(16, 89, 255);
  transition: all 0.3s ease;
  margin-top: 10px;
  margin-right: 10px;
  position:absolute;
  top:0;
  right:0;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class Launch extends React.Component {
  /**
   * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
   * The constructor for a React component is called before it is mounted (rendered).
   * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
   * These fields are then handled in the onChange() methods in the resp. InputFields
   */
  constructor() {
    super();
    this.state = {
   
    };
  }
  /**
   * HTTP POST request is sent to the backend.
   * If the request is successful, a new user is returned to the front-end
   * and its token is stored in the localStorage.
   */
 
  async goToRegister() {
    this.props.history.push('/register');
  }
  async goToLogin() {
    this.props.history.push('/login');
  }
  async goToGame() {
    this.props.history.push('/game/dashboard');
  }

  /**
   *  Every time the user enters something in the input field, the state gets updated.
   * @param key (the key of the state for identifying the field that needs to be updated)
   * @param value (the value that gets assigned to the identified state key)
   */
  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
  }

  /**
   * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
   * Initialization that requires DOM nodes should go here.
   * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
   * You may call setState() immediately in componentDidMount().
   * It will trigger an extra rendering, but it will happen before the browser updates the screen.
   */
  componentDidMount() {}

  render() {
    return (
      
       <VideoBox>
        <VideoOverlays>
        <TopRightButton
                // width="50%"
                onClick={() => {
                  this.goToLogin();
                }}
              > Login </TopRightButton>
        {/* <TopRightButton onClick={}>Press me </TopRightButton> */}
        <center>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Title>MAPGUESSЯ</Title>

            <Label>Group 24</Label>
            <br/>
            <Label>...</Label>
            <br/>
            <Label>...</Label>
            <br/>
            <Label>...</Label>
            <br/>
            <Label>...</Label>
            <br/>
            <Label>Jerome Hadorn</Label>
            <br/>
            <br/>
            <br/>
        <Button onClick={() => {
                  this.goToGame();
                }}>Start Playing</Button>
        </center>
        </VideoOverlays>

        <Video className='videoTag' autoPlay loop muted>
            <source src={window.location + '/video.mp4'} type='video/mp4' />
        </Video>
        </VideoBox>

    );
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Launch);
