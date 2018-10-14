//My Google Maps API Key: AIzaSyBe0pZu9OZtaR14XD_kcXjYwGQWyMfPKTg

import React, { Component } from 'react';
import Map from './components/Map';
import DetailList from './components/DetailList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
          <Map/>
          <DetailList/>
        </main>
      </div>
    );
  }
}

export default App;
