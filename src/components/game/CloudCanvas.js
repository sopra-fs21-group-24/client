import React, { Component } from "react";
import styled from "styled-components";
import CloudDisplay from "./CloudDisplay";
import CloudModel from "./CloudModel";
import CloudSVGFilter from "./CloudSVGFilter";
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

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    //this.componentDidMount = this.componentDidMount.bind(this);
  }

  setup5Dice() {
    let width = this.state.width;
    let height = this.state.height;
    var url =
      "https://gallery.yopriceville.com/var/albums/Free-Clipart-Pictures/Cloud-PNG/Soft_Cloud_PNG_Clip_Art_Image.png?m=1537570070";
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.src = url;
    img.onload = function () {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, -50, 0, width / 1.4, height / 1.7);
      ctx.drawImage(img, width / 4, height / 4, width / 2, height / 2);
      ctx.drawImage(img, -50, height / 2.5, width / 1.6, height / 1.9);
      ctx.drawImage(img, width - width / 2, 0, width / 1.4, height / 1.8);
      ctx.drawImage(img, width - width / 2, height / 3, width / 2, height / 2);
    };
  }

  setupGiantStormyCloud() {
    let width = this.state.width;
    let height = this.state.height;
    var url = "./cloud1.png";
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.src = url;
    img.onload = function () {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, -200, -100, width * 1.3, height * 1.3);
    };
  }

  setupGiantStormyCloud() {
    let width = this.state.width;
    let height = this.state.height;
    var url = "./cloud1.png";
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.src = url;
    img.onload = function () {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, -200, -100, width * 1.3, height * 1.3);
    };
  }

  setupSchleierWolke() {
    let width = this.state.width;
    let height = this.state.height;
    var url = "./cloud2.png";
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.src = url;
    img.onload = function () {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
    };
  }

  setupLongCloud() {
    let width = this.state.width;
    let height = this.state.height;
    var url = "./cloud3.png";
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.src = url;
    img.onload = function () {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
    };
  }

  componentDidMount() {
    console.log(this.props.round, "Current round for cloud canvas")
    // if (this.props.round == -1) return
    console.log(this.state, "HERRREEE q id not null");
    //   let width = this.state.width
    //   let height = this.state.height
    // var url =
    //   "https://gallery.yopriceville.com/var/albums/Free-Clipart-Pictures/Cloud-PNG/Soft_Cloud_PNG_Clip_Art_Image.png?m=1537570070";
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    // var img = new Image();
    // img.src = url;
    // img.onload = function () {
    //   //   var width = Math.min(500, img.width);
    //   //   var height = img.height * (width / img.width);

    //   canvas.width = width;
    //   canvas.height = height-50;
    //   ctx.drawImage(img, 0, 0, width/2, height/2);
    //   ctx.drawImage(img, width/2, 50, width/2, height/1.5);
    //   ctx.drawImage(img, 500,300, width/2, height/1.5);
    // };
    console.log(this.props.questionId, this.props
      .questionId%5, "Cloud for Question")
    switch (this.props.questionId % 5) {
      case 0:
        this.setup5Dice();
        break;
      case 1:
        this.setupGiantStormyCloud();
        break;
      case 2:
        this.setupSchleierWolke();
        break;
      case 3:
        this.setup5Dice();
        break;
      case 4:
        this.setupLongCloud();
        break;
      default:
        alert("no cloud for this");
        break;
    }

    // this.setup5Dice();
    // this.setupGiantStormyCloud()
    // this.setupSchleierWolke()

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

      // {/* <CloudCanvas
      //   url={this.state.currentQuestionImage}
      //   gameMode={this.state.gameMode}
      //   timer={this.state.timer}>

      // </CloudCanvas>

      // <div  style={{ width:"100%", width:"100%", position: "fixed", top: "50px", left: "0px" }}>
      //   <CloudSVGFilter
      //     scaleVal={221}
      //     numOctavesVal={8}
      //     baseFrequencyVal={0.01}
      //     seedVal={633}
      //   ></CloudSVGFilter>
      //   <CloudDisplay blurVal={100} spreadVal={50} />
      // </div>
      //  <div style={{ width:"100%", width:"100%", position: "absolute", bottom: "0px", right: "0px" }}>
      //   <CloudSVGFilter
      //     scaleVal={221}
      //     numOctavesVal={8}
      //     baseFrequencyVal={0.01}
      //     seedVal={633}
      //   ></CloudSVGFilter>
      //   <CloudDisplay blurVal={100} spreadVal={50} />

      // </div>  <div style={{ minWidth:"500px", minHeight:"500px", position: "absolute", top: "100px", left: "100px" }}>
      //    <CloudSVGFilter
      //     scaleVal={221}
      //     numOctavesVal={8}
      //     baseFrequencyVal={0.01}
      //     seedVal={633}
      //   ></CloudSVGFilter>
      //   <CloudDisplay blurVal={100} spreadVal={50} />
      // </div> */}
    );
  }
}
export default CloudCanvas;
