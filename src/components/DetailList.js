import React, { Component } from 'react';

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
          <button className='toggle-search'>^</button>
        </div>

        <div>
          <div className='item-detail'>
            <img alt='Alt Text' src=''/>
            <h2 className='item-name'>Name of Place</h2>
            <p className='item-type'>Type of place (Restaurant, etc.)</p>
            <p className='item-address'>1234 56th st, NY NY 78901</p>
          </div>
          <div className='item-detail'>
            <img alt='Alt Text' src=''/>
            <h2 className='item-name'>Name of Place</h2>
            <p className='item-type'>Type of place (Restaurant, etc.)</p>
            <p className='item-address'>1234 56th st, NY NY 78901</p>
          </div>

        </div>
      </div>
    )
  }

}

export default DetailList
