import Rx from 'rxjs'
import {Store} from 'sparix'

export class DataStore extends Store {

  endpoint

  constructor(eventQueue, endpoint) {
    super(eventQueue, {data: {}})
    this.endpoint = endpoint
  }

  create(toCreate) {
    const result = this.endpoint.post(toCreate).then(response => response.data)
    result.then(created => this.updateState({data: {[created.uuid]: created}}))
    return result
  }

  find(entityId) {
    const entity = this.currentState.data[entityId]
    if (entity) {
      return Rx.Observable.of(entity)
    } else {
      const result = Rx.Observable
        .fromPromise(this.endpoint.get(entityId))
        .map(response => response.data)
      result.subscribe(found => this.updateState({data: {[found.uuid]: found}}))
      return result
    }
  }

}
