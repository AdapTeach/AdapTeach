import React from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import {connect} from 'react-redux'

import {itemRepo} from 'domain-data'
import {CategorySearch} from 'components'

import {getState, actions} from './model'

class CreateItem extends React.Component {

  render() {
    return (
      <div>
        <h2>Create Item</h2>
        <form>
          <TextField value={this.props.name} onChange={::this.onNameChange} hintText="Name"/><br/>
          <TextField value={this.props.description} onChange={::this.onDescriptionChange} hintText="Description"/><br/>
          <label>Category</label>
          {this.props.category
            ? <div>{this.props.category.name}</div>
            : <CategorySearch onSelect={::this.props.actions.setCategory}/>}
          <RaisedButton onClick={::this.create} disabled={!this.canSubmit()} primary label="Create"/>
        </form>
      </div>
    )
  }

  onNameChange(ev) {
    this.props.actions.setName(ev.target.value)
  }

  onDescriptionChange(ev) {
    this.props.actions.setDescription(ev.target.value)
  }

  canSubmit() {
    return this.props.name
      && this.props.name.length > 2
      && this.props.category
  }

  create(e) {
    e.preventDefault()
    actions.createAndDisplay()
  }

}

const buildProps = () => ({
  ...getState(),
  actions
})

export const component = connect(buildProps)(CreateItem)
