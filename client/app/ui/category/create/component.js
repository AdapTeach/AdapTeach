import React from 'react'
import {connect} from 'react-redux'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import {createContainerComponent} from 'util'

import {getState, actions} from './model'

import {CategorySearch} from 'components'

class CreateCategory extends React.Component {

  constructor() {
    super()
    this.form = {}
  }

  render() {
    return (
      <div>
        <h2>Create Category</h2>
        <form>
          <TextField onChange={::this.onNameChange} hintText="Name" ref="categoryName"/><br/>
          <label>Parent Category</label>
          {this.props.parent
            ? <div>{this.props.parent.name}</div>
            : <CategorySearch onSelect={::this.props.actions.setParent}/>}
          <RaisedButton onClick={::this.create} primary label="Create"/>
        </form>
      </div>
    )
  }

  onNameChange(e) {
    this.form.name = e.target.value
  }

  create(e) {
    e.preventDefault()
    this.props.actions.setName(this.refs.categoryName.getValue())
    this.props.actions.createAndDisplay(this.form)
  }

}

const withProps = () => ({
  ...getState(),
  actions
})

export const component = connect(withProps)(CreateCategory)
