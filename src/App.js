//My Google Maps API Key: AIzaSyBe0pZu9OZtaR14XD_kcXjYwGQWyMfPKTg

import React, { Component } from 'react';
import Map from './components/Map';
import DetailList from './components/DetailList';
import Footer from './components/Footer';
import './App.css';

class App extends Component {
  state = {
    locations: [
      { name: 'Luna Royal Oak',
        category: 'Night Club',
        street: '1815 N Main St',
        city: 'Royal Oak',
        state: 'MI',
        coordinates: {
          lat: 42.504843,
          lng: -83.145264
        },
        image: ''
      }
    ]
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
