import React from 'react';

import { getFunName } from '../helpers';

export default class StorePicker extends React.Component {
  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }
  goToStore(event) {
    event.preventDefault();
      // first grab input
      console.log(this.storeInput.value);
      // transition from / to /store to /store/id
  }

  render () {
    return (
      <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
        { /* Hello */}
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()}  ref={(input) => { this.storeInput = input} } />
        <button type="submit">Visit Store ➔</button>
      </form>
    )
  }
}
