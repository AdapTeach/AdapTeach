import Rx from 'rxjs'
import {Store} from 'sparix'

export class DataStore extends Store {

  endpoint

  constructor(eventQueue, endpoint) {
    super(eventQueue, {cache: {}})
    this.endpoint = endpoint
  }

  create(toCreate) {
    const result = this.endpoint.post(toCreate).then(response => response.data)
    result.then(created => this.updateState({cache: {[created.uuid]: created}}))
    return result
  }

  find(entityId) {
    const entity = this.currentState.cache[entityId]
    if (entity) {
      return Rx.Observable.of(entity)
    } else {
      const result = Rx.Observable
        .fromPromise(this.endpoint.get(entityId))
        .map(response => response.data)
      result.subscribe(found => this.updateState({cache: {[found.uuid]: found}}))
      return result
    }
  }

  search(params) {
    return this.endpoint.search(params)
  }

}
