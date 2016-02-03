import React from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

import StoreComponent from '../store-component'
import actions from './actions'

class CreateCategory extends StoreComponent {

  render() {
    const props = this.props
    const state = this.context.store.getState().app
    return (
      <div>
        <h2>Create Category</h2>
        <form onSubmit={this.create}>
          <TextField hintText="Name"/><br/>
          <RaisedButton onClick={this.create} secondary label="Create"/>
        </form>
        <div>{state.categoryList.length}</div>
        <ol>
          {state.categoryList.map( category => <li key={category.uuid}>{category.name}</li>)}
        </ol>
      </div>
    )
  }

  create(e) {
    e.preventDefault()
    console.log('CREATE')
  }

}

export default CreateCategory

