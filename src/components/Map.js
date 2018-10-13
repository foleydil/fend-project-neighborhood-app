import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps'

class Map extends Component {

  render() {

    const MapObject = withGoogleMap(props => (
      <GoogleMap
      defaultCenter = { {lat: 32.983373, lng: -97.205255} }
      defaultZoom = { 10 }>
      </GoogleMap>
    ));

    return (
        <MapObject
          containerElement = { <div className='map'/> }
          mapElement = { <div style={{height: '100%'}} /> }
        />
    );
  }
}

export default Map;
