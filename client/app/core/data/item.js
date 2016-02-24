import DataStore from './data-store'
import itemEndpoint from '../../endpoint/item'

class ItemDataStore extends DataStore {

  constructor() {
    super(itemEndpoint)
  }

}

export default new ItemDataStore()
