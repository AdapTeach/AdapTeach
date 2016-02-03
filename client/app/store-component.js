import React, { Component } from 'react'

class StoreComponent extends Component {

  componentDidMount() {
    this.unsubscribe = this.context.store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

}

StoreComponent.contextTypes = {
  store: React.PropTypes.object
}

export default StoreComponent
