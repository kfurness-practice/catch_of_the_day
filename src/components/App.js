import React from 'react';

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';


export default class App extends React.Component {
  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    // initial state
    this.state = {
      fishes: {},
      order: {}
    }
  }

  addFish(fish) {
    // update state
    //take copy of state
    const fishes = {...this.state.fishes};
    // add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // set state
    // this.setState({ fishes: fishes }) Same as below!!!!
    this.setState({ fishes});
  }

  loadSamples () {
    this.setState({
      fishes : sampleFishes
    })
  }

  render () {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {Object
                .keys(this.state.fishes)
                .map( c => <Fish key={c} details={this.state.fishes[c]} />)
            }
          </ul>
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>
    )
  }
}
