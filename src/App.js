//My Google Maps API Key: AIzaSyBe0pZu9OZtaR14XD_kcXjYwGQWyMfPKTg

import React, { Component } from 'react';
import Map from './components/Map';
import DetailList from './components/DetailList';
import Footer from './components/Footer';
import './App.css';

const foursquareClientID = 'MAF4ZMHNH0CDXW3KSRDM1O5R5ZPJFQNWWVBSNV3FB1YBUOVR'
const foursquareClientSecret = 'PZRARRAI1ARZGKJCE4BG5IXGOHJHLBLCQUDO3I0A0RVSQ43D'
const googleMapsKey = 'AIzaSyBe0pZu9OZtaR14XD_kcXjYwGQWyMfPKTg'
//LatLong drives locations called to from Foursquare API. (Currently ROYAL OAK, MI)
const LatLong = '42.489878, -83.144327'

class App extends Component {

  state = {
    //All 20 locations from Foursquare API
    locations: [],
    //Locations current displayed on map and results list
    displayedLocations: []
  }

  async componentDidMount() {
    await this.loadMap();

    //Retrieve array of location objects from FourSquare API
    // & set app state to locations to this array. Wait for this to finish before intializing markers
    await fetch(`https://api.foursquare.com/v2/venues/explore?client_id=${foursquareClientID}&client_secret=${foursquareClientSecret}&v=20180323&limit=20&radius=250&ll=${LatLong}&venuePhotos=1&intent=browse`)
    .then(response => response.json())
    .then(results => {
      let locations = []
      for (let res of results.response.groups[0].items) {
        locations.push(res.venue)
      }
      return this.setState( {
        locations: locations,
        displayedLocations: locations
      })
    })
    .catch(function(error) {
      window.alert("Problem fetching locations from FourSquare. Refresh the page to try again.")
      return console.log("Error: " + error)
    });

    try {
      this.initMarkers();
    } catch (e) {
      console.log("No locations to display! Check internet connection.")
      window.alert("No locations to display! Check internet connection.")
    }
  }

  loadMap = () => {
    loadGoogleMapsScript(`https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}&callback=initMap`);
    window.initMap = this.initMap;
  }

  //create new map object based on given LatLong (currently set to ROYAL OAK MI)
  initMap = () => {
    window.map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 42.488598, lng: -83.144647},
      zoom: 17
    });
    //infowindow object created outside loop to ensure only one is showing at a time
    window.infoWindow = new window.google.maps.InfoWindow()
  }

  centerMapOnMarker = (marker) => {
    var latLng = marker.getPosition(); // returns LatLng object
    window.map.panTo(latLng); // setCenter takes a LatLng object
  }

  //opens infowindow for a given location
  //passed as prop to DetailList.js
  async openInfoWindow(loc) {

    //fetch photo source for venue:
    let locPhotoURL = "https://i.imgur.com/ZJE8MJw.png"
    await fetch(`https://api.foursquare.com/v2/venues/${loc.id}/photos?client_id=${foursquareClientID}&client_secret=${foursquareClientSecret}&v=20180323&limit=1`)
    .then(response => response.json())
    .then(results =>
      locPhotoURL = results.response.photos.items[0].prefix + '100x100' + results.response.photos.items[0].suffix)
      .catch(function(error) {
        console.log("Error retrieving location photo: " + error)
    })

    //content string for InfoWindow
    let contentString =
    `<div class='info-window'}>
    <h3>${loc.name}</h3>
    <figure>
    <img class='infowindow-image' src=${locPhotoURL} alt="${loc.name} photo">
    <figcaption> Photo courtesy of Foursquare </figcaption>
    </figure>
    <ul class='info-window-address'>
    <li>${loc.location.formattedAddress[0]}</li>
    <li>${loc.location.formattedAddress[1]}</li>
    </ul>
    </div>`

    //update infoWindow content
    window.infoWindow.setContent(contentString)
    window.infoWindow.open(window.map, loc.marker);
  }

  //initialize markers and add to state.locations
  //passed as prop to Map.js
  initMarkers = () => {
    //generate markers for all state.locations
    for (let loc of this.state.locations) {
      let marker = new window.google.maps.Marker({
        position: {
          lat: loc.location.lat,
          lng: loc.location.lng
        },
        map: window.map,
        title: loc.name,
        id: loc.id
      })

      //Listener for markers, updates & opens infowindow on click
      //includes async call to Foursquare to retrieve venue photos.
      marker.addListener('click', () => this.openInfoWindow(loc, marker))

      loc.marker = marker;
    }
  }

  //Helper function, clears all markers by setting visibility to false
  setMarkersInvisible = () => {
    for (let loc of this.state.locations) {
      loc.marker.setVisible(false);
    }
  }

  //add visibility to markers based on current state.
  //passed as a prop to Map.js
  updateMarkers = () => {
    console.log(this.state.displayedLocations)

    try {
      this.setMarkersInvisible();
    } catch (e) {
      return
    }

    let dispLocIDs = []
    for (let loc of this.state.displayedLocations) {
      dispLocIDs.push(loc.id)
    }
    for (let loc of this.state.locations) {
      if (dispLocIDs.includes(loc.id)) {
        loc.marker.setVisible(true);
      }
    }
  }

  //method causing marker to bounce for 2 seconds. called when user
  //a marker or a list item. Passed as a method to detailList>ItemDetail
  bounceMarker = (id) => {
    //check ID of list item that was clicked, then match proper marker to bounce
    let locID = this.state.displayedLocations.filter(l => {return l.id === id })[0].id
    let loc = this.state.locations.filter(loc => {return loc.id === locID})[0]
    let m = loc.marker;
    //Center map on marker
    this.centerMapOnMarker(m);
    if (m.getAnimation() !== null) {
      m.setAnimation(null);
    }
    m.setAnimation(window.google.maps.Animation.BOUNCE)
    setTimeout(function(){
      m.setAnimation(null)
    }, 2000)
  }

  //Method to toggle whether list of locations is shown at bottom of screen.
  //passed a prop to DetailList.js
  toggleSearch = () => {
    let resultsArea=document.getElementById('item-list');
    if (resultsArea.style.display === "block") {
      resultsArea.style.display = "none";
      document.getElementById('map').style.height='calc(100vh - 53px)';
      document.getElementById('toggle-search').src = window.location.origin + '/res/expand-button.png';
    } else {
      resultsArea.style.display = "block";
      document.getElementById('map').style.height='50vh';
      document.getElementById('toggle-search').src = window.location.origin + '/res/collapse-button.png';
    }
  }

  //Method to update map markers and list of results when user enters text in search bar
  //passed as a prop to DetailList.js
  updateSearch = (query) => {
    let qUpper = query.toUpperCase();
    let displayedLocations = this.state.locations.filter((loc) => loc.name.toUpperCase().includes(qUpper) || loc.categories[0].shortName.toUpperCase().includes(qUpper));
    return this.setState({
      displayedLocations: displayedLocations
    })
  }

  render() {
    return (
      <div className="App">
        <main>
          <Map updateMarkers={this.updateMarkers}/>
          <DetailList
            toggleSearch={this.toggleSearch}
            updateSearch={this.updateSearch}
            bounceMarker={this.bounceMarker}
            openInfoWindow={this.openInfoWindow}
            locations={this.state.locations}
            displayedLocations={this.state.displayedLocations}
          />
          <Footer/>
        </main>
      </div>
    );
  }
}

export default App;

//Vanilla JS function to load google Maps script when app initially loads
function loadGoogleMapsScript(url) {
  function loadError() {window.alert("Error loading Google Maps script")}

  let index = window.document.getElementsByTagName('script')[0];
  index.onerror = loadError;
  let script = window.document.createElement('script');
  script.onerror = loadError;
  script.src = url;
  script.async = true;
  script.defer = true;
  window.gm_authFailure = () => {
    window.alert("Google Maps authentication error.")
};

  index.parentNode.insertBefore(script, index);
}
