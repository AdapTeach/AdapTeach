import Rx from 'rxjs'

import {eventQueue} from 'util'
import {Store} from 'sparix'
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
    this.update(state => ({
      objectiveIds: [
        ...state.objectiveIds,
        objective.uuid
      ]
    }))
  }

  get objective$() {
    return this.map(state => state.objectiveIds)
      .map(ids => ids.map(id => objectiveData.find(id)))
      .mergeMap(arrayOfObservables => Rx.Observable.combineLatest(arrayOfObservables))
  }

}

export const loggedUser = new LoggedUser()
