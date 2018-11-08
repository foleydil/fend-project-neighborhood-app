//Component for Map, Markers, and InfoWindow

import React, { Component } from 'react';

class Map extends Component {

  //Update markers when component is re-rendered (anytime displayedLocations changes in App.js)
  componentDidMount() {
  }

  componentDidUpdate() {
    this.props.initMarkers();
    this.props.updateMarkers();
  }

  render() {
    return (
        <div id='map'></div>
    );
  }
}

export default Map;
