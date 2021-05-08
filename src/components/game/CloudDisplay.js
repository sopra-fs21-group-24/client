import React, { Component } from "react";
import styled from "styled-components";
import CloudModel from "./CloudModel";
// const sliderThumbStyles = props => props;
const StyledCloudDisplay = styled.section`
  grid-column: 1;
  grid-row: 1/-1;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 78vh;
  position: relative;
  & img {
    width: 8vh;
    margin: 0;
    position: absolute;
    filter: grayscale(50%);
    z-index: 2;
  }
  & .cloud-model-container {
    z-index: 1;
    // justify-self: center;
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    // overflow: hidden;
  }
`;

class CloudDisplay extends Component {
 

  render() {
    const { blurVal, spreadVal } = this.props;
    return (
      <StyledCloudDisplay className="cloud-display">
    
        <div className="cloud-model-container">
          <CloudModel blurVal={blurVal} spreadVal={spreadVal} />
        </div>
      </StyledCloudDisplay>
    );
  }
}
export default CloudDisplay;
