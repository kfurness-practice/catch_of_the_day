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
      const storeId = this.storeInput.value;
      console.log(`Going to ${storeId}`);
      // transition from / to /store to /store/id
      this.context.router.transitionTo(`/store/${storeId}`);
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

StorePicker.contextTypes = {
  router: React.PropTypes.object
}
