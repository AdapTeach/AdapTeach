import {DataStore, eventQueue, Endpoint} from 'util'

const endpoint = Endpoint('objective')

class ObjectiveData extends DataStore {

  constructor() {
    super(eventQueue, endpoint)
  }

}

export const objectiveData = new ObjectiveData()
