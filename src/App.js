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

  getFoursquareBusinesses() {
    fetch(`https://api.foursquare.com/v2/venues/search?client_id=${foursquareClientID}&client_secret=${foursquareClientSecret}&v=20180323&radius=100&ll=${royalOakLatLong}`)
        .then(response => response.json())
        .then(result => {
          return this.setState( {
            locations: result.response.venues
          })
        })
        .catch(function(error) {
          console.log("Error: " + error)
        });
    }


  toggleSearch() {
    let resultsArea=document.getElementById('item-list');
    if (resultsArea.style.display === "block") {
      resultsArea.style.display = "none";
      document.getElementById('map').style.height='500px';
      document.getElementById('toggle-search').src = window.location.origin + '/res/expand-button.png';
    } else {
      resultsArea.style.display = "block";
      document.getElementById('map').style.height='300px';
      document.getElementById('toggle-search').src = window.location.origin + '/res/collapse-button.png';
    }
  }

  render() {
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
