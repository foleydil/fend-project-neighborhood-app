import React, { Component } from 'react';

class ItemDetail extends Component {

  render() {
    return (
      <div className='item-detail'>
        <img alt='Alt Text' src=''/>
        <h2 className='item-name'>Name of Place</h2>
        <p className='item-type'>Type of place (Restaurant, etc.)</p>
        <p className='item-address'>1234 56th st, NY NY 78901</p>
      </div>
    );
  }
}

export default ItemDetail;
