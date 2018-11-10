//My Google Maps API Key: AIzaSyBe0pZu9OZtaR14XD_kcXjYwGQWyMfPKTg

import React, { Component } from 'react';
import Map from './components/Map';
import DetailList from './components/DetailList';
import Footer from './components/Footer';
import './App.css';

const foursquareClientID = 'MAF4ZMHNH0CDXW3KSRDM1O5R5ZPJFQNWWVBSNV3FB1YBUOVR'
const foursquareClientSecret = 'PZRARRAI1ARZGKJCE4BG5IXGOHJHLBLCQUDO3I0A0RVSQ43D'
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
      return console.log("Error: " + error)
    });

    try {
      this.initMarkers();
    } catch (e) {
      console.log("No locations to display! Check internet connection. Error: " + e)
    }
  }


  loadMap = () => {
    loadGoogleMapsScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyBe0pZu9OZtaR14XD_kcXjYwGQWyMfPKTg&callback=initMap`);
    window.initMap = this.initMap;
  }

  //create new map object based on given LatLong (currently set to ROYAL OAK MI)
  initMap = () => {
    window.map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 42.488598, lng: -83.144647},
      zoom: 17
    });
  }

  centerMapOnMarker = (marker) => {
    var latLng = marker.getPosition(); // returns LatLng object
    window.map.panTo(latLng); // setCenter takes a LatLng object
  }

  //method to open infowindow when marker is clicked
  openInfoWindow(map, marker, infoWindow) {
    return infoWindow.open(map, marker);
  }

  markers = [];

  //update markers array to match displayedLocations
  //passed as prop to Map.js
  initMarkers = () => {

    //infowindow object created outside loop to ensure only one is showing at a time
    let newInfowindow = new window.google.maps.InfoWindow()

    //generate markers for displayedLocations, and add infoWindows
    //this includes async call to Foursquare to retrieve venue photos.
    for (let loc of this.state.displayedLocations) {
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
      marker.addListener('click', async function() {
        //fetch photo source for venue:
        let locPhotoURL = "https://i.imgur.com/ZJE8MJw.png"

        //UNCOMMENT WHEN READY TO MAKE FOURSQUARE PREMIUM CALLS
        await fetch(`https://api.foursquare.com/v2/venues/${loc.id}/photos?client_id=${foursquareClientID}&client_secret=${foursquareClientSecret}&v=20180323&limit=1`)
          .then(response => response.json())
          .then(results =>
              locPhotoURL = results.response.photos.items[0].prefix + '100x100' + results.response.photos.items[0].suffix)
            .catch(function(error) {
                console.log("Error: " + error)
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
        newInfowindow.setContent(contentString)
        newInfowindow.open(window.map, marker);
      });

      this.markers.push(marker);
    }
  }

  //Helper funcftion, clears all markers by setting visibility to false
  setMarkersInvisible = () => {
    for (let m of this.markers) {
      m.setVisible(false);
    }
  }

  //add visibility to markers based on current state.
  //passed as a prop to Map.js
  updateMarkers = () => {
    console.log(this.state.displayedLocations)

    this.setMarkersInvisible();
    let dispLocIDs = []
    for (let loc of this.state.displayedLocations) {
      dispLocIDs.push(loc.id)
    }
    for (let m of this.markers) {
      if (dispLocIDs.includes(m.id)) {
        m.setVisible(true);
      }
    }
  }

  //method causing marker to bounce for 2 seconds. called when user
  //a marker or a list item. Passed as a method to detailList>ItemDetail
  bounceMarker = (id) => {
    //check ID of list item that was clicked, then match proper marker to bounce
    let locID = this.state.displayedLocations.filter(l => {return l.id === id })[0].id
    let m = this.markers.filter(m => {return m.id === locID})[0]
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
  let index = window.document.getElementsByTagName('script')[0];
  let script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;

  index.parentNode.insertBefore(script, index);
}
