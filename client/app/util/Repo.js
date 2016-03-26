import R from 'ramda'

import store from 'store'

export const Repo = (entityTypeName, endpoint) => {

  const data = () => store.getState().domain[entityTypeName]

  const dispatchEntityUpdateAction = entity => {
    const cached = data()[entity.uuid]
    if (!R.equals(cached, entity))
      store.dispatch({
        type: `${entityTypeName.toUpperCase()}_UPDATE`,
        payload: entity
      })
    return entity
  }

  const create = category => endpoint.post(category)
    .then(response => response.data)
    .then(dispatchEntityUpdateAction)
    .catch(::console.error)

  const findInCache = id => data()[id]

  const find = id => {
    reFetch(id)
    return findInCache(id)
  }

  const fetch = id => {
    const entity = findInCache(id)
    if (entity) return new Promise(entity)
    else return reFetch(id)
  }

  const reFetch = id => endpoint.get(id)
    .then(response => response.data)
    .then(dispatchEntityUpdateAction)
    .catch(error => console.error(`Loading ${entityTypeName} ${id}`, error))

  return {
    create,
    findInCache,
    find,
    fetch,
    reFetch
  }

}
