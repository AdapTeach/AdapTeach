import React from 'react'
import TextField from 'material-ui/lib/text-field'
import SelectField from 'material-ui/lib/SelectField';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button'

import CategorySearch from './search/search'
import StoreComponent from '../store-component'

class CreateCategory extends StoreComponent {

  render() {
    const props = this.props
    const state = this.context.store.getState().app
    return (
      <div>
        <h2>Create Category</h2>
        <form onSubmit={this.create}>
          <TextField hintText="Name"/><br/>
          <label>Parent Category</label>
          {state.selectedCategory ? <div>{state.selectedCategory.name}</div> : <CategorySearch />}
          <RaisedButton onClick={this.create} secondary label="Create"/>
        </form>
      </div>
    )
  }

  create(e) {
    e.preventDefault()
    console.log('CREATE')
  }

}

export default CreateCategory

