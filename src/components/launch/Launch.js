import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Modal } from "semantic-ui-react";
import styled from "styled-components";
import Login from "../authentication/login/Login";
import Register from "../authentication/register/Register";
import { getWindowDimensions } from "../shared/models/WindowSize";

const Title = styled.h1`
  font-weight: bold;
  color: white;
  text-align: center;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const VideoOverlays = styled.div`
  position: absolute;
  float: left;
  width: 100%;
  min-height: 370px;
  background-color: transparent;
  z-index: 3;
`;
export const TopRightButton = styled(Button)`
  margin-top: 50ppx;
  margin-right: 50px;
  position: absolute;
  top: 20px;
  right: 20px;
`;

class Launch extends React.Component {
  constructor() {
    super();
    this.state = {
      showLogin: false,
      showRegister: false,
    };
  }
  goToRegister() {
    this.setState({ showLogin: false });
    this.setState({ showRegister: true });
  }
  goToLogin() {
    if (localStorage.getItem("token") !== null) {
      this.props.history.push("/home");
    } else {
      this.setState({ showRegister: false });
      this.setState({ showLogin: true });
    }
  }
  goToGame() {
    if (localStorage.getItem("token") !== null) {
      this.props.history.push("/home");
    } else {
      this.setState({ showRegister: true });
    }
  }

  componentDidMount() {}

  render() {
    const { height, width } = getWindowDimensions();
    return (
      <div style={{ backgroundColor: "black", height: "100%" }}>
        <center>
          <VideoOverlays>
            <TopRightButton
              inverted="top"
              onClick={() => {
                this.goToLogin();
              }}
            >
              Login{" "}
            </TopRightButton>

            <center style={{ "margin-top": "250px" }}>
              <img alt="" width="50" height="50" src="logo.png" />
              <Title> MAPGUESS?? </Title>
              <Label> Group 24 </Label> <br />
              <Label> David Diener </Label> <br />
              <Label> Ho??ng Ben L?? Giang </Label> <br />
              <Label> Claudio Gebbia </Label> <br />
              <Label> Jerome Hadorn </Label> <br />
              <Label> Philip Giryes </Label> <br />
              <br />
              <Button
                onClick={() => {
                  this.goToGame();
                }}
              >
                Start Playing
              </Button>
            </center>
          </VideoOverlays>
          <video
            autoPlay
            loop
            muted
            style={{
              position: "absolute",
              width: "100%",
              left: "50%",
              top: "50%",
              height: "100%",
              objectFit: "cover",
              transform: "translate(-50%,-50%)",
              zIndex: "-1",
            }}
          >
            <source src={window.location + "/video.mp4"} type="video/mp4" />
          </video>
          {this.state.showLogin ? (
            <Modal basic open={true} size="small" trigger={null}>
              <Button
                position="right"
                size="mini"
                color="red"
                onClick={() => {
                  this.setState({ showLogin: false, showRegister: false });
                }}
              >
                X
              </Button>
              <Login
                change={() => {
                  this.goToRegister();
                }}
              />
            </Modal>
          ) : null}
          {this.state.showRegister ? (
            <Modal basic open={true} size="small" trigger={null}>
              <Button
                size="mini"
                color="red"
                onClick={() => {
                  this.setState({ showLogin: false, showRegister: false });
                }}
              >
                X
              </Button>
              <Register
                change={() => {
                  this.goToLogin();
                }}
              />
            </Modal>
          ) : null}
        </center>
      </div>
    );
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Launch);
