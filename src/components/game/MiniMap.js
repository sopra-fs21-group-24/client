import React, { Component } from "react";
import { GoogleMap, Marker, Polyline, withGoogleMap } from "react-google-maps";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { AnimateHeight } from "react-anim-kit";
import styled from "styled-components";
const style = {
  // maxWidth: "450px",
  // height: "350px",
  // overflowX: "hidden",
  // overflowY: "hidden",
  // "border-radius": "25px",
};
const containerStyle = {
  // maxWidth: "450px",
  // height: "350px",
  "border-radius": "25px",
};

export const lineColors = [
  '#BB201B',
  '#FECE02',
  '#010101',
  '#128254',
  '#FA6223'
]

export const TopLeftButton = styled(Button)`
  margin-top: 50px;
  margin-right: 50px;
  position: absolute;
  top: 10px;
  left: 10px;
  margin-bottom: 50px;
`;


const MiniMapContainer = styled.div`
  position: absolute;
  bottom: 15px;
  
`;
// const guessIcon = {
//   url: "https://loc8tor.co.uk/wp-content/uploads/2015/08/stencil.png",
//   scaledSize: new this.props.google.maps.Size(90, 42)
// };

// const answerIcon = {
//   url: "https://loc8tor.co.uk/wp-content/uploads/2015/08/stencil.png",
//   scaledSize: new this.props.google.maps.Size(90, 42)
// };
export const MapElem = withGoogleMap((props) => (
  <div style={{ borderRadius: "25px" }}>
    <GoogleMap
      style={style}
      containerStyle={containerStyle}
      onClick={props.onMapClick}
      // center={props.center}
      // ref={props.onMapMounted}
      zoom={props.zoom}
      defaultOptions={{
        center: {
          lat: 20.907646,
          lng: -0.848103,
        },
        streetViewControl: false,
        maxZoom: 10,
        fullscreenControl: false,
        zoomControl: false,
        mapTypeControl: false,
        styles: require(`./mapStyle.json`),
        // gestureHandling: 'none'
      }}
    >
      {props.results.length > 0&& props.showResults
        ? 
        props.results.map((value, index, array) => {
          return (
            <Polyline
            path={[
              { lat: props.results[index].lat, lng: props.results[index].lng },
              { lat: props.markers[index].lat, lng: props.markers[index].lng },
            ]}
            options={{
              strokeColor: lineColors[index],
              strokeOpacity: '0.9',
              strokeWeight: 4,
              icons: [
                {
                  icon: "hello",
                  offset: "0",
                  repeat: "10px",
                },
              ],
            }}
          />
       )} 
  )
        : null}

{props.results.length > 0&& props.showResults
        ? 
        props.results.map((value, index, array) => {
          return (
            <Marker
            key={1}
            position={value}
            
            // icon={answerIcon}
            // title={`[${marker.lat.toFixed(2)}-ish, ${marker.lng.toFixed(2)}-ish]`}
          />
         
       )} 
  )
        : null}

        {props.results.length > 0 && props.showResults
        ? 
        props.markers.map((value, index, array) => {
          return (
            <Marker
            key={2}
            
            position={value}
            icon={{  scaledSize: new window.google.maps.Size(1, 1) }}
            // icon="https://campus-map.stanford.edu/images/new/cm-target.png"
            // title={`[${marker.lat.toFixed(2)}-ish, ${marker.lng.toFixed(2)}-ish]`}
          />
         
       )} 
  )
        : null}

      {props.marker ? (
        <Marker
          key={1}
          position={props.marker}
          // icon="https://campus-map.stanford.edu/images/new/cm-target.png"
          // title={`[${marker.lat.toFixed(2)}-ish, ${marker.lng.toFixed(2)}-ish]`}
        />
      ) : null}
    </GoogleMap>
  </div>
));

class MiniMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      transitionAmount: 0,
      pin: null,
      answer: null,
      pins: [],
      answers: [],
      height: "400px",
      width: "450px",
      mapEnabled: true,
    };
    // this.setState(props);

    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleMapMounted = this.handleMapMounted.bind(this);
  }

  handleMapMounted(map) {
    this._map = map;
  }

  handleMapClick(event) {
    const latLng = event.latLng.toJSON();
    const nextState = this.state;
    nextState.pin = latLng;
    this.setState(nextState);
    console.log(this.state);

    this.props.pinMarkerOnClick(nextState.pin);
  }

  handleClick = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  render() {
    let {
      center,
      zoom,
      pin,
      // pins,
      // answer,
      // answers,
      // mapEnabled,
    } = this.props.state;

    if (pin != null) {
      center = pin;
    }

    let w = this.state.open ? "600px":"350px"
    let h = this.state.open ? "500px":"200px"
    let r = this.state.open ? "20px":"20px"
    return (
      <MiniMapContainer style={{right:r, width:w}}>

  
      <Segment style={{ maxHeight: "700px"  }}>
        <Header as="h4" textAlign="center">
          Drop your Pin on the Map
        </Header>
        <TopLeftButton icon onClick={()=>{this.handleClick()}}><Icon name="expand" ></Icon></TopLeftButton>
        <br></br>
        {/* <AnimateHeight
            // shouldChange={this.state.open}
            renderSpaceAfter
          > */}

            {/* {this.state.open && ( */}
        <MapElem
          containerElement={<div style={{height:h,  width: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          onMapMounted={this.handleMapMounted}
          onMapClick={this.handleMapClick}
          center={center}
          markers={this.props.state.pins}
          marker={this.props.state.pin}
          result={this.props.state.answer}
          zoom={zoom}
          results={this.props.state.answers}
          showResults={false}
        />
            {/* )} */}
        

        <Button
          style={{ marginTop: "15px" }}
          fluid
          onClick={() => {
            this.props.handleGuessSubmit();
          }}
        >
          Submit Guess!
        </Button>
        {/* </AnimateHeight> */}
      </Segment>
      </MiniMapContainer>
    );
  }
}

export default MiniMap;
