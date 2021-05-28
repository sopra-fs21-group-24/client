import React, { Component } from "react";
import styled from "styled-components";
// import CloudDisplay from "./CloudDisplay";
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
      oldTrans:0
    };

    this.getTransparencyCount = this.getTransparencyCount.bind(this)
    //this.componentDidMount = this.componentDidMount.bind(this);
   
  }

  async startAnlysis(){
    // console.log("CHEEECK:" , this.mounted, this.props.isPlaying)
    while(this.mounted && this.props.isPlaying){
      this.getTransparencyCount()
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // console.log("still checking transperancy")
    }
  }

  setup5Dice() {
    let width = this.state.width;
    let height = this.state.height;
    var url =
      "./cloud4.png";
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


  loadACloud(){
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

  
    // this.startAnlysis()
  }

  setupGiantStormyCloud() {
    let width = this.state.width;
    let height = this.state.height;
    var url = "./cloud1.png";
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.src = url;
    img.setAttribute('crossOrigin', '');
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
    img.setAttribute('crossOrigin', '');
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
    img.setAttribute('crossOrigin', '');
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
    img.setAttribute('crossOrigin', '');
    img.onload = function () {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
    };
  }
  componentWillUnmount(){
    this.mounted = false
  }
  async componentDidMount() {
    this.mounted = true;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    

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
        // console.log("Drawing from: ", old.x, old.y, "To:", x, y);
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

    this.getTransparencyCount()
    this.startAnlysis()
  }

  getTransparencyCount() {
    if(!this.mounted) return
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    var pixelCount = canvas.width * canvas.height;
    // console.log("PIXELCOUNT: ", pixelCount)
    var arrayElemsCount = pixelCount * 4; // for components (rgba) per pixel.
    var dataArray = imageData.data;
    // 0 is completely transparent, set to 0.5 to
    // allow for instance semi transparent pixels to be accounted for
    var threshold = 0;
    var transparentPixelCount = 0;
    // remember fourth (index = 3) byte is alpha
    for (var i = 3; i < arrayElemsCount; i += 4) {
      var alphaValue = dataArray[i];
      if (alphaValue <= threshold) {
        transparentPixelCount++;
      }
    }
    var transparencyPercentage = (transparentPixelCount / pixelCount) * 100;
    // console.log("TRANSP: ", transparencyPercentage)
    this.props.onHandleDifficulty(transparencyPercentage/100);    
  }

  render() {
    return (
      <canvas style={{ background: "transparent" }} id="canvas"></canvas>
    );
  }
}
export default CloudCanvas;
