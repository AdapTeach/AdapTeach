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
        <div key={objective.uuid}>{objective.name}</div>
      )}
    </div>
  }

  onObjectiveSelected(objective) {
    loggedUser.addObjective(objective)
  }

}

const propsMapper = props => loggedUser.objective$
  .startWith([])
  .map(objectives => ({objectives}))

export const component = connectWithLoader(propsMapper)(Objectives)
