import DataStore from './data-store'
import compositeEndpoint from '../../endpoint/composite'

class CompositeDataStore extends DataStore {

  constructor() {
    super(compositeEndpoint)
  }

}

export default new CompositeDataStore()
