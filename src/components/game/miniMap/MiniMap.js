import React, { Component } from "react";
import { GoogleMap, Marker, Polyline, withGoogleMap } from "react-google-maps";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { AnimateHeight } from "react-anim-kit";
import styled from "styled-components";
import {
  ComponentTransition,
  AnimationTypes,
} from "react-component-transition";
import { hashTable } from "../GameController";

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

// Line colors are ordered in blue, pink, yellow, green and purple like the markers
// Solution marker is RED
export const lineColors = [
  "#1B4F72", // blue
  "#FF69B4", // pink
  "#DFFF00", // yellow
  "#00FF00", // green
  "#9B59B6", // purple
];

// Each player gets uniquely colored marker
export const differentMarkers = [
  "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  "http://maps.google.com/mapfiles/ms/icons/pink-dot.png",
  "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
  "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
  "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
];

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
      {/**Displays the lines from the solution pin to all player pins */}
      {props.everyOneGuessed && props.showResults
        ? props.playerMarkers
            .filter(function (user) {
              if (user.lastCoordinate == null) {
                return false;
              } else if (
                user.lastCoordinate.lat == null ||
                user.lastCoordinate.lon == null
              ) {
                return false;
              }
              return true;
            })
            .map((user) => {
              return (
                <Polyline
                  path={[
                    {
                      lat: user.lastCoordinate.lat,
                      lng: user.lastCoordinate.lon,
                    },
                    props.results[props.currentRound - 2],
                  ]}
                  options={{
                    strokeColor: lineColors[hashTable.search(user.userId)],
                    strokeOpacity: "0.9",
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
              );
            })
        : null}

      {/**Displays marker of the solution in RED */}
      {props.everyOneGuessed && props.showResults ? (
        <Marker
          key={1}
          position={props.results[props.currentRound - 2]}
          icon={{ scaledSize: new window.google.maps.Size(1, 1) }}
        />
      ) : null}

      {/* Displays marker where the users had guessed */}
      {props.everyOneGuessed && props.showResults
        ? props.playerMarkers
            .filter(function (user) {
              if (user.lastCoordinate == null) {
                return false;
              } else if (
                user.lastCoordinate.lat == null ||
                user.lastCoordinate.lon == null
              ) {
                return false;
              }
              return true;
            })
            .map((user) => {
              return (
                <Marker
                  key={2}
                  position={{
                    lat: user.lastCoordinate.lat,
                    lng: user.lastCoordinate.lon,
                  }}
                  icon={differentMarkers[hashTable.search(user.userId)]}
                />
              );
            })
        : null}

      {/* Displays a pin where user clicks on the map at the bottom right corner */}
      {props.marker ? (
        <Marker
          key={1}
          position={props.marker}
          icon={
            differentMarkers[
              hashTable.search(localStorage.getItem("currentUserId"))
            ]
          }
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
    //this.setState(props);

    //console.log(this.state.hashTable.search(1664));
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleMapMounted = this.handleMapMounted.bind(this);
  }

  handleMapMounted(map) {
    this._map = map;
  }

  handleMapClick(event) {
    // For debug purposes
    //console.log(this.props.state.playerIds);
    //console.log(hashTable.search(localStorage.getItem("currentUserId")));
    const latLng = event.latLng.toJSON();
    const nextState = this.state;
    nextState.pin = latLng;
    this.setState(nextState);

    this.props.pinMarkerOnClick(nextState.pin);
  }

  handleClick = () => {
    this.setState((prevState) => ({ open: !prevState.open }));
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

    let w = this.state.open ? "600px" : "350px";
    let h = this.state.open ? "500px" : "200px";
    let r = this.state.open ? "20px" : "20px";
    return (
      <MiniMapContainer style={{ right: r, width: w }}>
        <ComponentTransition
          animateOnMount={true}
          enterAnimation={AnimationTypes.slideDown.enter}
          exitAnimation={AnimationTypes.fade.exit}
        >
          <Segment style={{ maxHeight: "700px" }}>
            <Header as="h4" textAlign="center">
              Drop your Pin on the Map
            </Header>
            <TopLeftButton
              icon
              onClick={() => {
                this.handleClick();
              }}
            >
              <Icon name="expand"></Icon>
            </TopLeftButton>
            <br></br>
            {/* <AnimateHeight
            // shouldChange={this.state.open}
            renderSpaceAfter
          > */}

            {/* {this.state.open && ( */}
            <MapElem
              containerElement={<div style={{ height: h, width: `100%` }} />}
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
        </ComponentTransition>
      </MiniMapContainer>
    );
  }
}

export default MiniMap;
