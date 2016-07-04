import Rx from 'rxjs'

import {eventQueue} from 'util'
import {Store, remove} from 'sparix'
import {endpoint} from './endpoint'
import {objectiveData} from '../objective'

const initialState = {
  uuid: null,
  name: '',
  objectiveIds: []
}

class LoggedUser extends Store {

  constructor() {
    super(eventQueue, initialState)
  }

  addObjective(objective) {
    endpoint.addObjective(objective)
      .then(::this.saveInCache)
  }

  saveInCache(objective) {
    this.updateState({
      objectiveIds: array => [
        ...array,
        objective.uuid
      ]
    })
  }

  get objective$() {
    endpoint.findObjectives().then(objectives => {
      this.updateState({objectiveIds: objectives.map(o => o.uuid)})
    })
    return this.map(state => state.objectiveIds)
      .map(ids => ids.map(id => objectiveData.find(id)))
      .mergeMap(arrayOfObservables => Rx.Observable.combineLatest(arrayOfObservables))
      .startWith([])
      .distinctUntilChanged()
  }

  removeObjective(objective) {
    endpoint.removeObjective(objective.uuid)
      .then(() => this.updateState({
        objectiveIds: remove(objective.uuid)
      }))
  }

}

export const loggedUser = new LoggedUser()
