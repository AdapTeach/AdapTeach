import store from '../../main/store'
import itemEndpoint from '../endpoint/item'
import DataStore from './data-store'

class ItemDataStore extends DataStore {

  constructor() {
    super(itemEndpoint)
  }

}

export default new ItemDataStore()
