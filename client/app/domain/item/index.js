import endpoint from './endpoint'

import {Repo, DataStore, eventQueue} from 'util'

export const itemRepo = Repo('item', endpoint)

export {itemReducer} from './reducer'

class ItemData extends DataStore {

  constructor() {
    super(eventQueue, endpoint)
  }

}

export const itemData = new ItemData()
