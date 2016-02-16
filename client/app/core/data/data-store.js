import store from '../../main/store'

class DataStore {

  constructor(key, endpoint) {
    this.key = key
    this.endpoint = endpoint
  }

  data() {
    return store.getState().app.get('data').get(this.key)
  }

  get(id) {
    const entity = this.data().get(id)
    if (!entity) this.endpoint.load(id)
    return entity
  }

}

export default DataStore
