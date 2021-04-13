import React, { Component } from 'react';
import { GoogleMap,Polyline, withGoogleMap, Marker } from "react-google-maps";
import { Button, Container, Header, Segment } from 'semantic-ui-react';

const style = {
  maxWidth: "450px",
  height: "350px",
  overflowX: "hidden",
  overflowY: "hidden",
  'border-radius':"25px"
 };
 const containerStyle = {
  maxWidth: "450px",
  height: "350px",
  'border-radius':"25px"
 };


const MapElem = withGoogleMap(props => (
  <div style={{'border-radius': "25px"}}>
    <GoogleMap
    
    style={style} containerStyle={containerStyle}
      onClick={props.onMapClick}
      ref={props.onMapMounted}
      center={props.center}
      zoom={props.zoom}
      defaultOptions={{
        streetViewControl: false,
        maxZoom: 10,
        fullscreenControl: false,
        zoomControl:false,
        mapTypeControl:false,
        styles: require(`./mapStyle.json`)
        // gestureHandling: 'none'
      }}
    >

       {props.result != null && props.marker != null? 
       <Polyline 
       path= {[ 
   {lat:props.result.lat, lng:props.result.lng},
   {lat:props.marker.lat, lng:props.marker.lng},
 ]} 
       options={{ 
       strokeColor: 'red',
       strokeOpacity: 1,
       strokeWeight: 5,
       icons: [{ 
         icon: "hello",
         offset: '0',
         repeat: '10px'
       }],
     }}
     />:null
    
    }
         
      {
        props.marker ? <Marker
            key={1}
            position={props.marker}
            // icon="https://campus-map.stanford.edu/images/new/cm-target.png"
            // title={`[${marker.lat.toFixed(2)}-ish, ${marker.lng.toFixed(2)}-ish]`}
          />:null
       
      }
     
    </GoogleMap>
  </div>
));

class MiniMap extends Component {
  constructor(props) {
    super(props);
    console.log("map props", props)

    this.state = {
      pin:null,
      height:"400px",
      width:"450px"
    }
    this.setState(props)

    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleMapMounted = this.handleMapMounted.bind(this);
  }

  handleMapMounted(map) {
    console.log("map props2", map)
    // ??????
    this._map = map;
  }

  handleMapClick(event) {
    const latLng = event.latLng.toJSON();
    const nextState = this.state;

    nextState.pin = latLng;
    // nextState.pins.push(latLng)
    // console.log({pins:[latLng]});
    this.setState(nextState)
    console.log(this.state)

    this.props.pinMarkerOnClick(nextState.pin);
  }

  render() {
    let { center, zoom, pin } = this.props.state;

    let pins = []
    if (pin != null){
      center = pin
      pins.push(pin)
    }
    

    return (
      <Segment floated style={{width:"450px"}}>

        <Header as="h4" textAlign='center'>Drop them pins</Header>
        <MapElem
          containerElement={
              <div style={{ height:`400px`, width: `100%` }} />
          }
          mapElement={
              <div style={{ height: `100%` }} />
          }
          onMapMounted={this.handleMapMounted}
          onMapClick={this.handleMapClick}
          center={center}
          marker={pin}
          zoom={zoom}
          result={this.props.state.answer}
          />

          <Button style={{'margin-top':"15px"}} fluid onClick={()=>{ this.props.handleGuessSubmit()}}>Submit Guess!</Button>
        
        </Segment>
    );
  }
}

export default MiniMap;
