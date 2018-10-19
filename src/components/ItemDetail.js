import React, { Component } from 'react';

class ItemDetail extends Component {

  render() {
    return (
      <div className='item-detail'>
        <img className='lock-toggle-icon' alt='unlocked icon' src={window.location.origin + '/res/002-unlock.png'}/>
        <img className='location-photo' alt='Alt Text' src=''/>
          <div className='item-info-container'>
            <h2 className='item-name'>Name of Place</h2>
            <p className='item-type'>Type of place (Restaurant, etc.)</p>
            <p className='item-address'>1234 56th st, NY NY 78901</p>
          </div>
      </div>
    );
  }
}

export default ItemDetail;
