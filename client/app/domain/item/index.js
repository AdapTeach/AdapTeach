import {DataStore, eventQueue, Endpoint} from 'util'

const endpoint = Endpoint('item')

class ItemData extends DataStore {

  constructor() {
    super(eventQueue, endpoint)
  }

}

export const itemData = new ItemData()
