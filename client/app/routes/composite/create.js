import React from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import SearchBar from 'react-search-bar'

import history from '../history'
import itemEndpoint from '../../endpoint/item'

import ObjectiveSearchDialog from '../common/objective-search-dialog'

class CreateCompositeObjective extends React.Component {

  constructor(props) {
    super(props)
    this.state = {openDialog: false}
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
          <label>Objectives</label>
          <ObjectiveSearchDialog onSelect={::this.onObjectiveSelected}></ObjectiveSearchDialog>
          <br/>
          <RaisedButton onClick={::this.create} primary label="Create"/>
        </form>
      </div>
    )
  }

  onObjectiveSelected(objective) {
    console.log(objective)
  }

  create(e){
    const composite = {
      name: this.refs.name.getValue(),
      description: this.refs.description.getValue()
    }
    console.log(composite)
    //compositeEndpoint.create(item)
    //  .then(created => history.push(`/item/${created.uuid}`))
    //  .catch(e => console.error(e))
  }

}

export default CreateCompositeObjective
