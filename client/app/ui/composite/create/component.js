import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import {router, path} from 'router'
import {compositeData} from 'domain-data'
import {ObjectiveSearchDialog} from 'components'

class CreateComposite extends React.Component {

  state = {
    name: '',
    description: '',
    components: []
  }

  render() {
    return (
      <div>
        <h2>Create Composite Objective</h2>
        <form onSubmit={::this.create}>
          <TextField onChange={::this.onNameChange} hintText="Name"/>
          <br/>
          <TextField onChange={::this.onDescriptionChange} hintText="Description"/>
          <br/>
          <label>Components</label>
          <ObjectiveSearchDialog onSelect={::this.onComponentAdd}></ObjectiveSearchDialog>
          <br/>
          {this.state.components.map(c =>
            <div key={c.uuid}>{c.name}</div>
          )}
          <RaisedButton onClick={::this.create} primary label="Create"/>
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

  onComponentAdd(component) {
    this.setState({
      components: [...this.state.components, component]
    })
  }

  create(e) {
    e.preventDefault()
    compositeData.create({
      name: this.state.name,
      description: this.state.description,
      componentIds: this.state.components.map(c => c.uuid)
    })
      .then(created => router.goTo(path.composite.display(created.uuid)))
      .catch(::console.error)
  }

}

export const component = CreateComposite
