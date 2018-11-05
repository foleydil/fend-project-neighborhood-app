//Component with location info, displayed in search results area "DetailList"

import React, { Component } from 'react';

function ItemDetail (props) {
  return (
    <div className='item-detail'>
      <img
        className='location-photo'
        alt={props.location.categories[0].shortName + ' icon'}
        src={props.location.categories[0].icon.prefix + 'bg_64' + props.location.categories[0].icon.suffix}
      />
      <div className='item-info-container'>
        <h2 className='item-name'>{props.location.name}</h2>
        <p className='item-type'>{props.location.categories[0].shortName}</p>
        <p className='item-address'>{props.location.location.address} {props.location.location.city}, {props.location.location.state}</p>
      </div>
    </div>
  )
}

export default ItemDetail;

//Below snippet saved for item "locking" functionality, to be implemented later
//<img className='lock-toggle-icon' alt='unlocked icon' src={window.location.origin + '/res/002-unlock.png'}/>
