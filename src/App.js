//My Google Maps API Key: AIzaSyBe0pZu9OZtaR14XD_kcXjYwGQWyMfPKTg

import React, { Component } from 'react';
import Map from './components/Map';
import DetailList from './components/DetailList';
import Footer from './components/Footer';
import './App.css';

const foursquareClientID = 'MAF4ZMHNH0CDXW3KSRDM1O5R5ZPJFQNWWVBSNV3FB1YBUOVR'
const foursquareClientSecret = 'PZRARRAI1ARZGKJCE4BG5IXGOHJHLBLCQUDO3I0A0RVSQ43D'
const royalOakLatLong = '42.489878, -83.144327'

class App extends Component {

  state = {
    //All 20 locations from Foursquare API
    locations: [],
    //Locations current displayed on map and results list
    displayedLocations: []
  }

  componentDidMount() {
    this.getFoursquareBusinesses();
  }

  //Retrieve array of location objects from FourSquare API, set app state - locations to this array
  getFoursquareBusinesses() {
    fetch(`https://api.foursquare.com/v2/venues/explore?client_id=${foursquareClientID}&client_secret=${foursquareClientSecret}&v=20180323&limit=20&radius=250&ll=${royalOakLatLong}&intent=browse`)
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
          console.log("Error: " + error)
        });
    }

  //Method to toggle whether list of locations is shown at bottom of screen.
  //passed a prop to DetailList.js
  toggleSearch = () => {
    let resultsArea=document.getElementById('item-list');
    if (resultsArea.style.display === "block") {
      resultsArea.style.display = "none";
      document.getElementById('map').style.height='500px';
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
          <Map displayedLocations={this.state.displayedLocations}/>
          <DetailList
            toggleSearch={this.toggleSearch}
            updateSearch={this.updateSearch}
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
