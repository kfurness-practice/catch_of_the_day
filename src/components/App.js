import React from 'react';

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

export default class App extends React.Component {
  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

    // initial state
    this.state = {
      fishes: {},
      order: {}
    }
  }

  componentWillMount () {
    // this runs right before the <App> is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`,  {
          context: this,
          state: 'fishes'
        });

    // check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if(localStorageRef) {
      // update our App component's order state
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`,
      JSON.stringify(nextState.order));
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

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  removeFish(key) {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({ fishes })
  }

  loadSamples () {
    this.setState({
      fishes : sampleFishes
    })
  }

  addToOrder (key) {
    // take a copy of our state
    const order = {...this.state.order};
    // update or add new number of fish ordered
    order[key] = order[key] + 1 || 1;
    //update state
    this.setState({ order });
  }

  removeFromOrder(key) {
    const order = {...this.state.order};
    // order[key] = null;
    delete order[key];
    this.setState({order});
  }

  render () {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {Object
                .keys(this.state.fishes)
                .map( c => <Fish key={c} index={c} details={this.state.fishes[c]} addToOrder={this.addToOrder} />)
            }
          </ul>
        </div>
        <Order
           fishes={this.state.fishes}
           order={this.state.order}
           params={this.props.params}
           removeFromOrder={this.removeFromOrder}
            />
          <Inventory
            addFish={this.addFish}
            loadSamples={this.loadSamples}
            fishes={this.state.fishes}
            updateFish={this.updateFish}
            removeFish={this.removeFish} />
      </div>
    )
  }
}
