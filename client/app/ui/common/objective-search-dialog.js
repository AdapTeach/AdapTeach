import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SearchBar from 'react-search-bar'
import {objectiveData} from 'domain-data'

class ObjectiveSearchDialog extends React.Component {

  state = {open: false}

  constructor(props) {
    super(props)
    this.objectivesByName = {}
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={::this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={::this.handleClose}
      />
    ]
    return (
      <span>
        <FloatingActionButton onClick={::this.handleOpen} secondary>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Search Objective"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={::this.handleClose}
        >
          <SearchBar
            onChange={::this.updateSuggestions}
            onSubmit={::this.onObjectiveSelected}
          />
        </Dialog>
      </span>
    )
  }

  handleOpen() {
    this.setState({open: true})
  }

  handleClose() {
    this.setState({open: false})
  }

  updateSuggestions(input, resolve) {
    // TODO Remove duplicate code
    if (this.props.filter === 'items') {
      objectiveData.search({name: input})
        .then(response => {
          const items = response.data.items
          items.forEach(i => this.objectivesByName[i.name] = i)
          const names = items.map(o => o.name)
          resolve(names)
        })
    } else {
      objectiveData.search({name: input})
        .then(response => {
          const items = response.data.items
          const composites = response.data.composites
          const objectives = items.concat(composites)
          objectives.forEach(o => this.objectivesByName[o.name] = o)
          const names = objectives.map(o => o.name)
          resolve(names)
        })
    }
  }

  onObjectiveSelected(name) {
    const objective = this.objectivesByName[name]
    this.props.onSelect(objective)
    this.handleClose()
  }

}

ObjectiveSearchDialog.propTypes = {
  onSelect: React.PropTypes.func.isRequired
}

export {ObjectiveSearchDialog}
