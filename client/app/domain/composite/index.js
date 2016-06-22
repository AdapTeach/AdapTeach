import endpoint from './endpoint'

import {Repo, DataStore, eventQueue} from 'util'

export const compositeRepo = Repo('composite', endpoint)

export {compositeReducer} from './reducer'

class CompositeData extends DataStore {

  constructor() {
    super(eventQueue, endpoint)
  }

}

export const compositeData = new CompositeData()
