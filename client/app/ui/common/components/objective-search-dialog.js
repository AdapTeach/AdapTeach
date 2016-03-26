import React from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import SearchBar from 'react-search-bar'
import axios from 'axios'

class ObjectiveSearchDialog extends React.Component {

  constructor(props) {
    super(props)
    this.objectivesByName = {}
    this.state = {open: true}
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
          The actions in this window were passed in as an array of React objects.
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
    axios.get(`http://localhost:8000/api/objective/search/${input}`)
      .then(response => {
        const items = response.data.items
        const composites = response.data.composites
        const objectives = items.concat(composites)
        objectives.forEach(o => this.objectivesByName[o.name] = o)
        const names = objectives.map(o => o.name)
        resolve(names)
      })
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
