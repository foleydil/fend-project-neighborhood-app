//Component for search bar and list of search results

import React, { Component } from 'react';
import ItemDetail from './ItemDetail';

class DetailList extends Component {
  state = {
    query: ''
  }

  //set state to user input when a search is made, callback to update displayedLocations in App.js
  updateQuery = (query) => {
    this.setState( {query: query} );
    this.props.updateSearch(query);
  }

  render() {
    return (
      <div className='detailList'>
        <div className='search-bar-container'>
          <div className='search-label'>
            <h2>Search: </h2>
          </div>
          <input
            type="text"
            placeholder="Search neighborhood places"
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <img
            id='toggle-search'
            alt='collapse-button'
            onClick={this.props.toggleSearch}
            src={window.location.origin + '/res/collapse-button.png'}/>
        </div>

        <div id='item-list' style={{display: 'block'}}>
          {this.props.displayedLocations.map((location, key) =>
            <ItemDetail
              bounceMarker={this.props.bounceMarker}
              location={location}
              key={key}
            />
          )}
        </div>
      </div>
    )
  }

}

export default DetailList
