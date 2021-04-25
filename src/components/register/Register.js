import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Form, Input } from "semantic-ui-react";
import styled from "styled-components";
import { api, handleError } from "../../helpers/api";
import { BaseContainer } from "../../helpers/layout";
import User from "../shared/models/User";


const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const InputField = styled(Input)``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      password: null,
      username: null,
    };
  }
  async register() {
    const requestBody = JSON.stringify({
      username: this.state.username,
      password: this.state.password,
    });

    try {
      let response = await api.post("/register", requestBody);
      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem("token", user.token);
      localStorage.setItem("currentUserId", user.id);

      // After successful registration
      this.navigateToHomePage();
    } catch (error) {
      alert(
        `Something went wrong during the register: \n${handleError(error)}`
      );
    }
  }

  navigateToLoginPage() {
    this.props.history.push("/login");
  }
  navigateToHomePage() {
    this.props.history.push(`/home`);
  }

  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    this.setState({
      [key]: value,
    });
  }
  componentDidMount() {}

  render() {
    return (
      <BaseContainer>
        <FormContainer>
          <Form>
            <h1>Register</h1>
            <Form.Field>
              <InputField
                placeholder="Username"
                onChange={(e) => {
                  this.handleInputChange("username", e.target.value);
                }}
              />
            </Form.Field>
            <Form.Field>
              <InputField
                type="password"
                placeholder="Enter here.."
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
                  this.register();
                }}
              >
                Register
              </Button>
            </ButtonContainer>

            <ButtonContainer>
              <Button
                secondary
                width="50%"
                onClick={() => {
                  this.navigateToLoginPage();
                }}
              >
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
