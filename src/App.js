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
    locations: []
  }

  componentDidMount() {
    this.getFoursquareBusinesses();
  }

  //Retrieve array of location objects from FourSquare API, set app state - locations to this array
  getFoursquareBusinesses() {
    fetch(`https://api.foursquare.com/v2/venues/explore?client_id=${foursquareClientID}&client_secret=${foursquareClientSecret}&v=20180323&limit=20&radius=250&ll=${royalOakLatLong}`)
        .then(response => response.json())
        .then(results => {
          let locations = []
          for (let res of results.response.groups[0].items) {
            locations.push(res.venue)
          }
          return this.setState( {
            locations: locations
          })
        })
        .catch(function(error) {
          console.log("Error: " + error)
        });
    }

  //Method to toggle whether list of locations is shown at bottom of screen.
  //passed a prop to DetailList.js
  toggleSearch() {
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


  render() {
    //Temporary code to monitor locations in app state
    console.log("current state: ")
    console.log(this.state)

    return (
      <div className="App">
        <main>
          <Map locations={this.state.locations}/>
          <DetailList toggleSearch={this.toggleSearch}/>
          <Footer/>
        </main>
      </div>
    );
  }
}

export default App;
