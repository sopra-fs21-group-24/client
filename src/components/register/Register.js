import React from 'react';
import styled from 'styled-components';
import {
  BaseContainer
} from '../../helpers/layout';
import {
  api,
  handleError
} from '../../helpers/api';
import User from '../shared/models/User';
import {
  withRouter
} from 'react-router-dom';

import { Button, Form, Label, Input } from 'semantic-ui-react'

const FormContainer = styled.div `
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;


const InputField = styled(Input) ``

const ButtonContainer = styled.div `
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;



class Register extends React.Component {
  /**
   * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
   * The constructor for a React component is called before it is mounted (rendered).
   * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
   * These fields are then handled in the onChange() methods in the resp. InputFields
   */
  constructor() {
    super();
    this.state = {
      name: null,
      username: null
    };
  }
  /**
   * HTTP POST request is sent to the backend.
   * If the request is successful, a new user is returned to the front-end
   * and its token is stored in the localStorage.
   */
  async register() {
    // try {
      const requestBody = JSON.stringify({
        username: this.state.username,
        name: this.state.name,
        password: this.state.password
      });
      await api.post('/register', requestBody)
      .then((response1) => {
        console.log("Users post respone: ", response1)
        return api.post('/login', requestBody);
      }).then((userdata) => {
        console.log("login post response: ", userdata)
         // Get the returned user and update a new object.
        const user = new User(userdata.data);

        // Store the token into the local storage.
        localStorage.setItem('token', user.token);
        localStorage.setItem('currentUserId', user.id);

        // Register successfully worked --> navigate to the route /home in the HomeRouter
        this.props.history.push(`/home`);
      }).catch((error) =>{
        alert(`Something went wrong during the register: \n${handleError(error)}`);
      })
    

     
    // } catch (error) {
    //   alert(`Something went wrong during the register: \n${handleError(error)}`);
    // }
  }

  async login() {
    this.props.history.push("/login")
  }

  /**
   *  Every time the user enters something in the input field, the state gets updated.
   * @param key (the key of the state for identifying the field that needs to be updated)
   * @param value (the value that gets assigned to the identified state key)
   */
  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({
      [key]: value
    });
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
    <BaseContainer >
    <FormContainer>

      <Form>
      <h1>Register</h1>
        <Form.Field>
          <InputField placeholder = "Username"
          onChange = {
            e => {
              this.handleInputChange('username', e.target.value);
            }
          }
          />
        </Form.Field>
        <Form.Field>
          <InputField placeholder = "Name"
          onChange = {
            e => {
              this.handleInputChange('name', e.target.value);
            }
          } /> 
        </Form.Field>
        <Form.Field>
         
          <InputField type = "password"
            placeholder = "Enter here.."
            onChange = {
              e => {
                this.handleInputChange('password', e.target.value);
              }
            }/>
        </Form.Field>
      

      <ButtonContainer>
      <Button primary disabled = {
        !this.state.username || !this.state.name || !this.state.password
      }
      width = "50%"
      onClick = {
        () => {
          this.register();
        }
      } >Register</Button>
      </ButtonContainer>
      
      <ButtonContainer >
      <Button secondary width = "50%"
      onClick = {
        () => {
          this.login();
        }
      } >
      Already have an account ? Login here 
      </Button>
      </ButtonContainer>
      </Form>
        </FormContainer>
      </BaseContainer>
    );
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Register);