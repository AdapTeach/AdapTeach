import DataStore from './data-store'
import categoryEndpoint from '../../endpoint/category'

class CategoryDataStore extends DataStore {

  constructor() {
    super(categoryEndpoint)
  }

}

export default new CategoryDataStore()
