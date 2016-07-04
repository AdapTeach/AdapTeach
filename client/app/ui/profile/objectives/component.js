import React from 'react'

import {ObjectiveSearchDialog} from 'components'
import {loggedUser, objectiveData} from 'domain-data'
import {connectWithLoader} from 'util'

class Objectives extends React.Component {

  render() {
    return <div>
      <h1>Personal Objectives :</h1>
      <ObjectiveSearchDialog onSelect={::this.onObjectiveSelected}></ObjectiveSearchDialog>
      {this.props.objectives.map(objective =>
        <div key={objective.uuid}>
          {objective.name}
          <button onClick={this.onRemoveButtonClick(objective)}>X</button>
        </div>
      )}
    </div>
  }

  onObjectiveSelected(objective) {
    loggedUser.addObjective(objective)
  }

  onRemoveButtonClick(objective) {
    return () => loggedUser.removeObjective(objective)
  }

}

const propsMapper = props => loggedUser.objective$
  .map(objectives => ({objectives}))

export const component = connectWithLoader(propsMapper)(Objectives)
