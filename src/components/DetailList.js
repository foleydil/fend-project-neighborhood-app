import React, { Component } from 'react';
import ItemDetail from './ItemDetail';

class DetailList extends Component {
  state = {
    query: ''
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
          <img
            id='toggle-search'
            alt='collapse-button'
            onClick={this.props.toggleSearch}
            src={window.location.origin + '/res/collapse-button.png'}/>
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
