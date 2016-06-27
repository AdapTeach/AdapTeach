import {DataStore, eventQueue, Endpoint} from 'util'

const endpoint = Endpoint('composite')

class CompositeData extends DataStore {

  constructor() {
    super(eventQueue, endpoint)
  }

}

export const compositeData = new CompositeData()
