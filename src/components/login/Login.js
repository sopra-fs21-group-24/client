import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { api, handleError, handleUserFriendlyError } from "../../helpers/api";
import { BaseContainer } from "../../helpers/layout";
import {
  Button,

  Form,

  Header,

  Segment,
  Input,
  Container
} from "semantic-ui-react";
import User from "../shared/models/User";

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;


class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
    };
  }

  async login() {
    try {
      const requestBody = JSON.stringify({
        username: this.state.username,
        password: this.state.password
      });
      const response = await api.post("/login", requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem("token", user.token);
      localStorage.setItem("username", user.username);
      localStorage.setItem("currentUserId", user.id);

      this.navigateToHomePage()
    } catch (error) {
      alert(`Something went wrong during the login process: \n${handleUserFriendlyError(error)}`);
    }
  }

  navigateToRegisterPage() {
    this.props.change();
  }
  navigateToHomePage() {
    this.props.history.push("/home");
  }

  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
  }
  componentDidMount() {}

  render() {
    return (

      <Segment fluid>
      <Header as="h2" color="black" textAlign="center">Login</Header>
        <FormContainer>
          <Form>
            <Form.Field>
              <Input
                placeholder="Username"
                onChange={(e) => {
                  this.handleInputChange("username", e.target.value);
                }}
              />
            </Form.Field>
            <Form.Field>
              <Input
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  this.handleInputChange("password", e.target.value);
                }}
              />
            </Form.Field>

            <ButtonContainer>
              <Button
                primary
                disabled={!this.state.username || !this.state.password}
                width="50%"
                onClick={() => {
                  this.login();
                }}
              >
                Login
              </Button>
            </ButtonContainer>
            <ButtonContainer>
              <Button
                secondary
                width="50%"
                onClick={() => {
                  this.navigateToRegisterPage();
                }}
              >
                Don't have an account? Register here
              </Button>
            </ButtonContainer>
          </Form>
        </FormContainer>
        </Segment>

    );
  }
}
export default withRouter(Login);
