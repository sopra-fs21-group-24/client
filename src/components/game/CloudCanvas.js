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

const Box = styled.div`
  display: inline-block;
  background: url("https://cloud.githubusercontent.com/assets/4652816/12771954/41dccb10-ca68-11e5-9db8-a473f51426c8.jpg");
  background-size: cover;
`;

class CloudCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPress: false,
      old: null,
      width: props.width,
      height: props.height,
    };
    console.log(this.state,"CLOUDCANVAS STATE")

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    //this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
      console.log(this.state,"HERRREEE")
      let width = this.state.width
      let height = this.state.height
    var url =
      "https://gallery.yopriceville.com/var/albums/Free-Clipart-Pictures/Cloud-PNG/Soft_Cloud_PNG_Clip_Art_Image.png?m=1537570070";
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.src = url;
    img.onload = function () {
      //   var width = Math.min(500, img.width);
      //   var height = img.height * (width / img.width);

      canvas.width = width;
      canvas.height = height-50;
      ctx.drawImage(img, 0, 0, width/2, height/2);
      ctx.drawImage(img, width/2, 50, width/2, height/1.5);
      ctx.drawImage(img, 500,300, width/2, height/1.5);
    };

    var isPress = false;
    var old = null;

    canvas.addEventListener("mousedown", function (e) {
      isPress = true;
      old = { x: e.offsetX, y: e.offsetY };
    });
    canvas.addEventListener("mousemove", function (e) {
      if (isPress) {
        var x = e.offsetX;
        var y = e.offsetY;
        ctx.globalCompositeOperation = "destination-out";

        ctx.beginPath();
        ctx.arc(x, y, 25, 0, 2 * Math.PI);
        ctx.fill();

        ctx.lineWidth = 50;
        ctx.beginPath();
        ctx.moveTo(old.x, old.y);
        ctx.lineTo(x, y);
        ctx.stroke();

        old = { x: x, y: y };
      }
    });
    canvas.addEventListener("mouseup", function (e) {
      isPress = false;
    });
  }
  //   componentDidMount() {
  //     console.log("mount")
  //     var url =
  //       "https://cloud.githubusercontent.com/assets/4652816/12771961/5341c3c4-ca68-11e5-844c-f659831d9c00.jpg";
  //     const canvas = document.getElementById("canvas");
  //     const ctx = canvas.getContext("2d");
  //     const img = new Image();

  //     img.src = url;

  //     img.onload = function () {
  //       var width = Math.min(500, img.width);
  //       var height = img.height * (width / img.width);

  //       canvas.width = width;
  //       canvas.height = height;
  //       ctx.drawImage(img, 0, 0, width, height);
  //     };

  //     var isPress = false;
  //     this.setState({isPress:isPress})
  //     var old = null;
  //     this.setState({old:old})

  //     // const canvas = this.refs.canvas;
  //     // const ctx = canvas.getContext("2d");
  //     // const img = this.refs.image;
  //     // img.onload = () => {
  //     //   ctx.drawImage(img, 0, 0);
  //     //   ctx.font = "40px Courier";
  //     //   ctx.fillText(this.props.text, 210, 75);
  //     // };
  //   }

  onMouseDown(e) {
    console.log("down");
    let isPress = true;
    this.setState({ isPress: isPress });
    let old = { x: e.offsetX, y: e.offsetY };
    this.setState({ old: old });
  }
  //   canvas.addEventListener('mousedown', function (e){
  //     isPress = true;
  //     old = {x: e.offsetX, y: e.offsetY};
  //   });
  onMouseMove(e) {
    console.log("moving");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let old = this.state.old;

    if (this.state.isPress) {
      var x = e.offsetX;
      var y = e.offsetY;

      ctx.globalCompositeOperation = "destination-out";

      ctx.beginPath();
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
      ctx.fill();

      ctx.lineWidth = 20;
      ctx.beginPath();
      ctx.moveTo(old.x, old.y);
      ctx.lineTo(x, y);
      ctx.stroke();

      old = { x: x, y: y };
      this.setState({ old: old });
    }
  }
  //   canvas.addEventListener('mousemove', function (e){
  //     if (isPress) {
  //       var x = e.offsetX;
  //       var y = e.offsetY;
  //       ctx.globalCompositeOperation = 'destination-out';

  //       ctx.beginPath();
  //       ctx.arc(x, y, 20, 0, 2 * Math.PI);
  //       ctx.fill();

  //       ctx.lineWidth = 20;
  //       ctx.beginPath();
  //       ctx.moveTo(old.x, old.y);
  //       ctx.lineTo(x, y);
  //       ctx.stroke();

  //       old = {x: x, y: y};

  //     }
  //   });
  onMouseUp(e) {
    console.log("up");
    let isPress = false;
    this.setState({ isPress: isPress });
  }
  //   canvas.addEventListener('mouseup', function (e){
  //     isPress = false;
  //   });

  render() {
    return (
      <canvas style={{ background: "transparent" }} id="canvas"></canvas>

      //   onMouseUp={this.onMouseUp} onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove}
      //   <div>
      //     <canvas style={{background:"transparent"}} ref="canvas" width={640} height={425} />
      //     {/* <img ref="image" src={cheese} className="hidden" /> */}
      //   </div>
    );
  }
}
export default CloudCanvas;
