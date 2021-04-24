import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Modal } from "semantic-ui-react";
import styled from "styled-components";
import Login from "../login/Login";
import Register from "../register/Register";

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

const Video = styled.video`
  height: 100%;
  width: 100%;
  float: left;
  top: 0;
  padding: none;
  // position: fixed;
`;

const VideoBox = styled.div`
  float: left;
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
    this.setState({ showRegister: false });
    this.setState({ showLogin: true });
  }
  goToGame() {
    this.setState({ showRegister: true });
  }

  componentDidMount() {}

  render() {
    return (
      <div style={{ backgroundColor: "black" }}>
        <center>
          <VideoBox>
            <VideoOverlays>
              <TopRightButton
                inverted="top"
                onClick={() => {
                  this.goToLogin();
                }}
              >
                Login{" "}
              </TopRightButton>

              <center>
                <br />
                <br />
                <img alt="" width="50" height="50" src="logo.png" />
                <br />
                <br />
                <br />
                <Title> MAPGUESSЯ </Title>
                <Label> Group 24 </Label> <br />
                <Label> David Diener </Label> <br />
                <Label> Hoàng Ben Lê Giang </Label> <br />
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
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <Title> The worlds #2 Map Game*</Title>
                <Label>*Unverified Statisic</Label>
              </center>
            </VideoOverlays>
            <Video className="videoTag" autoPlay loop muted>
              <source src={window.location + "/video.mp4"} type="video/mp4" />
            </Video>{" "}
            {this.state.showLogin ? (
                <Modal basic open={true} size="small" trigger={null}>
                  <Login change = {()=>{this.goToRegister()}}/>
                </Modal>
              ) : null}
              {this.state.showRegister ? (
                <Modal basic open={true} size="small" trigger={null}>
                  <Register change = {()=>{this.goToLogin()}}/>
                </Modal>
              ) : null}
          </VideoBox>
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
