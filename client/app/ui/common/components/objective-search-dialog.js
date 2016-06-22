import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SearchBar from 'react-search-bar'

class ObjectiveSearchDialog extends React.Component {

  state = {open: true}

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
