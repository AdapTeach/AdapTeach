import store from '../../main/store'

class DataStore {

  constructor(endpoint) {
    this.endpoint = endpoint
    this.entityType = endpoint.entityTypeName
  }

  data() {
    return store.getState().app.get('data').get(this.entityType)
  }

  get(id) {
    const entity = this.data().get(id)
    if (!entity) this.endpoint.load(id)
    return entity
  }

}

export default DataStore
