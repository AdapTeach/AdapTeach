import endpoint from './endpoint'

import {DataStore, eventQueue} from 'util'

class ObjectiveData extends DataStore {

  constructor() {
    super(eventQueue, endpoint)
  }

}

export const objectiveData = new ObjectiveData()
