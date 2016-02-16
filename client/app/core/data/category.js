import store from '../../main/store'
import categoryEndpoint from '../endpoint/category'
import DataStore from './data-store'

class CategoryDataStore extends DataStore {

  constructor() {
    super('categories', categoryEndpoint)
  }

}

export default new CategoryDataStore()
