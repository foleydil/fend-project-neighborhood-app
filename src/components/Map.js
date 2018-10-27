import React, { Component } from 'react';

class Map extends Component {

  componentDidMount() {
    this.loadMap();
  }

  componentDidUpdate() {
    this.initMarkers(window.map)
  }

  loadMap = () => {
    loadGoogleMapsScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBe0pZu9OZtaR14XD_kcXjYwGQWyMfPKTg&callback=initMap');
    window.initMap = this.initMap;
  }

  initMap = () => {
    window.map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 42.488598, lng: -83.144647},
      zoom: 16
    });
    return this.initMarkers(window.map)
  }

  initMarkers = (map) => {
    console.log('initializing markers for:')
    console.log(this.props.locations)
    for (let loc of this.props.locations) {
      new window.google.maps.Marker({
        position: {
          lat: loc.location.lat,
          lng: loc.location.lng
        },
        map: map,
        title: loc.name
      })
    }
  }


  render() {
    return (
        <div id='map'></div>
    );
  }
}

function loadGoogleMapsScript(url) {
  let index = window.document.getElementsByTagName('script')[0];
  let script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;

  index.parentNode.insertBefore(script, index);
}

export default Map;
