import endpoint from './endpoint'

import {Repo, DataStore, eventQueue} from 'util'

class CategoryData extends DataStore {

  constructor() {
    super(eventQueue, endpoint)
  }

}

export const categoryData = new CategoryData()

export const categoryRepo = Repo('category', endpoint)

export {categoryReducer} from './reducer'
