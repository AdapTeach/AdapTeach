import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import {itemData} from 'domain-data'
import {CategorySearch} from 'components'
import {router, path} from 'router'

class CreateItem extends React.Component {

  state = {
    name: '',
    description: '',
    category: null
  }

  render() {
    return (
      <div>
        <h2>Create Item</h2>
        <form>
          <TextField value={this.state.name} onChange={::this.onNameChange} hintText="Name"/><br/>
          <TextField value={this.state.description} onChange={::this.onDescriptionChange} hintText="Description"/><br/>
          <label>Category</label>
          {this.state.category
            ? <div>{this.state.category.name}</div>
            : <CategorySearch onSelect={::this.onCategoryChange}/>}
          <RaisedButton onClick={::this.create} disabled={!this.canSubmit()} primary label="Create"/>
        </form>
      </div>
    )
  }

  onNameChange(ev) {
    this.setState({name: ev.target.value})
  }

  onDescriptionChange(ev) {
    this.setState({description: ev.target.value})
  }

  onCategoryChange(category) {
    this.setState({category})
  }

  canSubmit() {
    return this.state.name
      && this.state.name.length > 2
      && this.state.category
  }

  create(e) {
    e.preventDefault()
    itemData.create({
      name: this.state.name,
      description: this.state.description,
      categoryId: this.state.category.uuid
    })
      .then(created => router.goTo(path.item.display(created.uuid)))
  }

}

export const component = CreateItem
