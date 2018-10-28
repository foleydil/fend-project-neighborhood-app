import React, { Component } from 'react';

class ItemDetail extends Component {

  render() {
    return (


      <div className='item-detail'>
        <img className='lock-toggle-icon' alt='unlocked icon' src={window.location.origin + '/res/002-unlock.png'}/>
        <img className='location-photo' alt='Alt Text' src=''/>
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
