import React, { Component } from 'react';
import ItemDetail from './ItemDetail';

class DetailList extends Component {
  state = {
    query: '',
    results: []
  }

  render() {
    return (
      <div className='detailList'>
        <div className='search-bar-container'>
          <input
            type="text"
            placeholder="Search neighborhood places"
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <button id='toggle-search' onClick={this.props.toggleSearch}>+ / -</button>
        </div>

        <div id='item-list' style={{display: 'block'}}>
          <ItemDetail/>
          <ItemDetail/>
        </div>
      </div>
    )
  }

}

export default DetailList
