import endpoint from './endpoint'

import Rx from 'rxjs'

import {Repo} from 'util'

import {Store} from 'sparix'

import {eventQueue} from 'util'

class CategoryData extends Store {

  constructor(eventQueue) {
    super(eventQueue, {data: {}})
  }

  create(toCreate) {
    const result = endpoint.post(toCreate).then(response => response.data)
    result.then(created => this.updateState({data: {[created.uuid]: created}}))
    return result
  }

  find(categoryId) {
    const category = this.currentState.data[categoryId]
    if (category) {
      return Rx.Observable.of(category)
    } else {
      const result = Rx.Observable
        .fromPromise(endpoint.get(categoryId))
        .map(response => response.data)
      result.subscribe(found => this.updateState({data: {[found.uuid]: found}}))
      return result
    }
  }

}

export const categoryData = new CategoryData(eventQueue)

export const categoryRepo = Repo('category', endpoint)

export {categoryReducer} from './reducer'
