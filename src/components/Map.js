//Component for Map, Markers, and InfoWindow

import React, { Component } from 'react';

class Map extends Component {

  //load map on initial load
  componentDidMount() {
    this.loadMap();
  }

  loadMap = () => {
    loadGoogleMapsScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBe0pZu9OZtaR14XD_kcXjYwGQWyMfPKTg&callback=initMap');
    window.initMap = this.initMap;
  }

  //create new map object based on given LatLong (currently set to ROYAL OAK MI)
  initMap = () => {
    window.map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 42.488598, lng: -83.144647},
      zoom: 16
    });
  }

  //method to update displayed markers upon user search
  componentDidUpdate() {
    console.log(this.props.displayedLocations);
    this.initMarkers(window.map)
  }

  //method to open infowindow when marker is clicked
  openInfoWindow(map, marker, infoWindow) {
    return infoWindow.open(map, marker);
  }

  //Array of currently displayed markers
  markers = [];

  //update markers array to match displayedLocations
  initMarkers = (map) => {
    //clear existing markers
    for (let m of this.markers) {
      m.setMap(null);
    }

    //infowindow object created outside loop to ensure only one is showing at a time
    let newInfowindow = new window.google.maps.InfoWindow()

    //generate markers for displayedLocations
    for (let loc of this.props.displayedLocations) {
      let marker = new window.google.maps.Marker({
        position: {
          lat: loc.location.lat,
          lng: loc.location.lng
        },
        map: map,
        title: loc.name
      })

      //content string for InfoWindow
      let contentString =
        `<div class='info-window'}>
          <h3>${loc.name}</h3>
          <img src='' alt=${loc.name} photo>
          <ul class='info-window-address'>
            <li>${loc.location.formattedAddress[0]}</li>
            <li>${loc.location.formattedAddress[1]}</li>
          </ul>
        </div>`

      //Listener for markers, updates & opens infowindow on click
      marker.addListener('click', function() {
        //update infoWindow content
        newInfowindow.setContent(contentString)
        newInfowindow.open(map, marker);
      });

      this.markers.push(marker)
    }
  }


  render() {
    return (
        <div id='map'></div>
    );
  }
}

//Vanilla JS function to load google Maps script when app initially loads
function loadGoogleMapsScript(url) {
  let index = window.document.getElementsByTagName('script')[0];
  let script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;

  index.parentNode.insertBefore(script, index);
}

export default Map;
