import axios from 'axios'

import store from '../../main/store'

class Endpoint {

  constructor(entityTypeName) {
    this.entityTypeName = entityTypeName
  }

  create(entity) {
    return axios.post(`http://localhost:8000/api/${this.entityTypeName}`, entity)
      .then(response => response.data)
      .then(this.dispatchEntityLoadedAction.bind(this))
      .catch(error => console.error(error))
  }

  load(id) {
    return axios.get(`http://localhost:8000/api/${this.entityTypeName}/${id}`)
      .then(response => response.data)
      .then(this.dispatchEntityLoadedAction.bind(this))
      .catch(error => console.error(`Loading ${this.entityTypeName}`, error))
  }

  dispatchEntityLoadedAction(entity) {
    store.dispatch({
      type: `${this.entityTypeName.toUpperCase()}_LOADED`,
      payload: entity
    })
    return entity
  }

}

export default Endpoint
