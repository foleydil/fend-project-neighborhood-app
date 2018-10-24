import React, { Component } from 'react';

class Map extends Component {

  componentDidMount() {
    this.loadMap();
  }

  loadMap = () => {
    loadGoogleMapsScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBe0pZu9OZtaR14XD_kcXjYwGQWyMfPKTg&callback=initMap');
    window.initMap = this.initMap;
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 42.488598, lng: -83.144647},
      zoom: 13
    });
  }

  render() {
    let markerLatLngs = [];
    for (let loc of this.props.locations) {
      markerLatLngs.push(loc.coordinates);
    }

    console.log(markerLatLngs);

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
