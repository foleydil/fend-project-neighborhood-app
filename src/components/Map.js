//Component for Map, Markers, and InfoWindow

import React, { Component } from 'react';

class Map extends Component {

    //method to update displayed markers upon user search
  componentDidUpdate() {
    this.props.initMarkers();
  }

  render() {
    return (
        <div id='map'></div>
    );
  }
}

export default Map;
