import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button,DefaultButton } from '../../views/design/Button';

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 500px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 475px;
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

const BigLabel = styled.h4`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;


const ReadonlyInputLabel = styled.label`
  color: black;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  flexDirection: 'row';
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
class Profile extends React.Component {
  /**
   * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
   * The constructor for a React component is called before it is mounted (rendered).
   * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
   * These fields are then handled in the onChange() methods in the resp. InputFields
   */
  constructor() {
    super();
    this.state = {
        userId: null,
        username:null,
        name:null,
        logged_in: null,
        birthdate:null,
      
      currentUserId:null
    };

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
    console.log(this.state)
  }

  async updateUser(){
    try {
      const requestBody = JSON.stringify({
        username: this.state.username,
        logged_in:this.state.logged_in,
        name:this.state.name,
        birthdate:this.state.birthdate,
        token: localStorage.getItem("token")
      });
      console.log(requestBody)
      console.log(this.state.currentUserId)
      let url = '/users/' + this.state.currentUserId.toString()
      console.log(url)
      const response = await api.put('/users/' + this.state.currentUserId, requestBody);

      // Get the returned user and update a new object.
      await this.fetchUser(this.state.currentUserId)
      console.log("User after update:", this.state.user)

      // // this.state.username = username
      // // this.state.birthday = birthday
      // // this.state.name = name
      // console.log("after fetch/post state")
      // this.setState({user:user})
      // console.log(this.state)

    } catch (error) {
      alert(`Something went wrong fetching the user data: \n${handleError(error)}`);
    }
  }

  async goBack(){
    this.props.history.goBack()
  }

  async fetchUser(userId){
    try {
      // const requestBody = JSON.stringify({
      //   username: this.state.username,
      //   password: this.state.password
      // });
      const response = await api.get('/users/'+userId);

      // Get the returned user and update a new object.
      const user = new User(response.data);


      // this.state.username = username
      // this.state.birthday = birthday
      // this.state.name = name
      console.log("after fetch state")
      this.setState({username:user.username,
      name:user.name,
    birthdate:user.birthdate,
    logged_in:user.logged_in})
      console.log(this.state)
      return user

    } catch (error) {
      alert(`Something went wrong fetching the user data: \n${handleError(error)}`);
    }
  }

  isEditAllowed(){
    console.log(this.state.currentUserId,this.state.userId)
    return this.state.currentUserId == this.state.userId
  }
  /**
   * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
   * Initialization that requires DOM nodes should go here.
   * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
   * You may call setState() immediately in componentDidMount().
   * It will trigger an extra rendering, but it will happen before the browser updates the screen.
   */
  componentDidMount() {
    // console.log(this.props.location.state.userId)
    // console.log(this.props.location.state.currentUserId)
    this.setState({userId: this.props.location.state.userId, currentUserId:this.props.location.state.currentUserId})
    // console.log(this.state.userId)
    this.fetchUser(this.props.location.state.userId)
  }



  render() {
    return (
      
     
        <BaseContainer>
         {/* <Label>Helloooooo{this.state.currentUserId}</Label> */}
          <FormContainer>
            <Form>
              <BigLabel>{this.isEditAllowed() ? "Edit your Profile":"View Profile: "+this.state.username}</BigLabel>
              <Label>Username</Label>
              { this.isEditAllowed() ? <InputField defaultValue={this.state.username} placeholder="Enter here.."
                onChange={e => {
                  this.handleInputChange('username', e.target.value);
                }}
              /> : <ReadonlyInputLabel>{this.state.username}</ReadonlyInputLabel>}
              <Label>Name</Label>
              { this.isEditAllowed() ?<InputField
                defaultValue={this.state.name}
                placeholder="Enter here.."
                onChange={e => {
                  this.handleInputChange('name', e.target.value);
                }}
              />: <ReadonlyInputLabel>{this.state.name}</ReadonlyInputLabel>}
              <Label>Birthday</Label>
              { this.isEditAllowed() ?<InputField
                defaultValue={this.state.birthdate}
                placeholder="Enter here.."
                onChange={e => {
                  this.handleInputChange('birthdate', e.target.value);
                }}
              />: <ReadonlyInputLabel>{this.state.birthdate}</ReadonlyInputLabel>}
              <Label>Status</Label>
              { this.isEditAllowed() ?
      
              
              <div onChange={e => {
                this.handleInputChange('logged_in', e.target.value);
              }}>
                <input type="radio" value="ONLINE" name="value" checked={this.state.logged_in == "ONLINE"}/> <Label>ONLINE</Label>
                <input type="radio" value="OFFLINE" name="value" checked={this.state.logged_in != "ONLINE"}/> <Label>OFFLINE</Label>
      </div>: <ReadonlyInputLabel>{this.state.logged_in}</ReadonlyInputLabel>}
             
             <ButtonContainer>
                <DefaultButton
                  width="50%"
                  onClick={() => {
                    this.goBack();
                  }}
                >
                  Back to Dashboard
                </DefaultButton>
                </ButtonContainer>

             { this.isEditAllowed() ? <ButtonContainer>
                <Button
                  width="50%"
                  onClick={() => {
                    this.updateUser();
                  }}
                >
                  Save Changes
                </Button>
                </ButtonContainer> : null }
              
               
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
export default withRouter(Profile);
