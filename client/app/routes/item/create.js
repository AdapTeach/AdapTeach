import React from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

import CategorySearch from '../common/category-search'
import history from '../history'
import itemEndpoint from '../../core/endpoint/item'

class CreateItem extends React.Component {

  constructor() {
    super()
    this.state = {itemName: ''}
  }

  render() {
    return (
      <div>
        <h2>Create Item</h2>
        <form onSubmit={this.create}>
          <TextField onChange={this.onItemNameChange.bind(this)} hintText="Name"/><br/>
          <TextField ref="description" hintText="Description"/><br/>
          <label>Category</label>
          {this.state.category ?
            <div>{this.state.category.name}</div>
            : <CategorySearch onSelect={this.selectCategory.bind(this)}/>}
          <RaisedButton onClick={this.create.bind(this)} disabled={!this.canSubmit()} secondary label="Create"/>
        </form>
      </div>
    )
  }

  onItemNameChange(ev) {
    this.setState({itemName: ev.target.value})
  }

  selectCategory(category) {
    this.setState({category})
  }

  canSubmit() {
    return this.state.itemName.length > 2 && this.state.category
  }

  create(e) {
    e.preventDefault()
    const item = {
      name: this.state.itemName,
      description: this.refs.description.getValue(),
      categoryId: this.state.category.uuid
    }
    itemEndpoint.create(item)
      .then(created => history.push(`/item/${created.uuid}`))
      .catch(e => console.error(e))
  }

}

export default CreateItem

