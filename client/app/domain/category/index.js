import {DataStore, eventQueue, Endpoint} from 'util'

const endpoint = Endpoint('category')

class CategoryData extends DataStore {

  constructor() {
    super(eventQueue, endpoint)
  }

}

export const categoryData = new CategoryData()
