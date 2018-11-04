//Component with location info, displayed in search results area "DetailList"

import React, { Component } from 'react';

class ItemDetail extends Component {

  render() {
    return (
      <div className='item-detail'>
        <img className='location-photo' alt={this.props.location.categories[0].shortName + ' icon'} src={this.props.location.categories[0].icon.prefix + 'bg_64' + this.props.location.categories[0].icon.suffix}/>
          <div className='item-info-container'>
            <h2 className='item-name'>{this.props.location.name}</h2>
            <p className='item-type'>{this.props.location.categories[0].shortName}</p>
            <p className='item-address'>{this.props.location.location.address} {this.props.location.location.city}, {this.props.location.location.state}</p>
          </div>
      </div>
    );
  }
}

export default ItemDetail;

//Below snippet saved for item "locking" functionality, if I have time 
//<img className='lock-toggle-icon' alt='unlocked icon' src={window.location.origin + '/res/002-unlock.png'}/>
