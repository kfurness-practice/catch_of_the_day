import React from 'react';

import AddFishForm from './AddFishForm';

export default class Inventory extends React.Component {
  renderInventory (key) {
    return (
      <div className="fish-edit" key={key}>
        <input type="text" name="name" placeholder="Fish Name" />
        <input type="text" name="price" placeholder="Fish Price" />
        <input type="text" name="status" placeholder="Fish Status" />
        <input type="text" name="desc" placeholder="Fish Desc" />
        <input type="text" name="image" placeholder="Fish Image" /> 

      </div>
    )
  }

  render () {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}
