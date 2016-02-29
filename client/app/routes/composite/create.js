import React from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import SearchBar from 'react-search-bar'

import history from '../history'
import compositeEndpoint from '../../endpoint/composite'

import ObjectiveSearchDialog from '../common/objective-search-dialog'

class CreateComposite extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      openDialog: false,
      components: []
    }
  }

  render() {
    return (
      <div>
        <h2>Create Composite Objective</h2>
        <form onSubmit={this.create}>
          <TextField ref="name" hintText="Name"/>
          <br/>
          <TextField ref="description" hintText="Description"/>
          <br/>
          <label>Components</label>
          <ObjectiveSearchDialog onSelect={::this.onObjectiveSelected}></ObjectiveSearchDialog>
          <br/>
          {this.state.components.map(component =>
            <div key={component.uuid}>{component.name}</div>
          )}
          <RaisedButton onClick={::this.create} primary label="Create"/>
        </form>
      </div>
    )
  }

  onObjectiveSelected(objective) {
    this.setState({components: [...this.state.components, objective]})
  }

  create() {
    const composite = {
      name: this.refs.name.getValue(),
      description: this.refs.description.getValue(),
      componentIds: this.state.components.map(component => component.uuid)
    }
    compositeEndpoint.create(composite)
      .then(created => history.push(`/composite/${created.uuid}`))
      .catch(e => console.error(e))
  }

}

export default CreateComposite
