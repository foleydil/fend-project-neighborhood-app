//My Google Maps API Key: AIzaSyBe0pZu9OZtaR14XD_kcXjYwGQWyMfPKTg

import React, { Component } from 'react';
import Map from './components/Map';
import DetailList from './components/DetailList';
import Footer from './components/Footer';
import './App.css';

class App extends Component {

  toggleSearch() {
    let resultsArea=document.getElementById('item-list');
    if (resultsArea.style.display === "block") {
      resultsArea.style.display = "none";
    } else {
      resultsArea.style.display = "block";
    }
  }

  render() {
    return (
      <div className="App">
        <main>
          <Map/>
          <DetailList
            toggleSearch={this.toggleSearch}/>
        </main>
        <Footer/>
      </div>
    );
  }
}

export default App;
