import React from 'react'
import {connect} from 'react-redux'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

import {compositeRepo} from 'domain-data'
import {ObjectiveSearchDialog} from 'components'

import {actions, getState} from './model'

class CreateComposite extends React.Component {

  render() {
    return (
      <div>
        <h2>Create Composite Objective</h2>
        <form>
          <TextField onChange={::this.onNameChange} hintText="Name"/>
          <br/>
          <TextField onChange={::this.onDescriptionChange} hintText="Description"/>
          <br/>
          <label>Components</label>
          <ObjectiveSearchDialog onSelect={::this.props.actions.addComponent}></ObjectiveSearchDialog>
          <br/>
          {this.props.components.map(c =>
            <div key={c.uuid}>{c.name}</div>
          )}
          <RaisedButton onClick={::this.create} primary label="Create"/>
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

  create() {
    this.props.actions.createAndDisplay()
  }

}


const withProps = () => ({
  ...getState(),
  actions
})

export const component = connect(withProps)(CreateComposite)
