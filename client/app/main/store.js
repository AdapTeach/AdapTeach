import { createStore, combineReducers, applyMiddleware } from 'redux'
import { syncHistory, routeReducer } from 'react-router-redux'
import deepFreeze from 'deep-freeze'

import environment from './environment'
import {domainReducer} from '../domain'
import {reducer as uiReducer} from '../ui'
import {history} from 'router'

const reducer = combineReducers({
  ui: uiReducer,
  domain: domainReducer,
  routing: routeReducer
})

const reduxRouterMiddleware = syncHistory(history)

const reducerErrorLogger = store => next => action => {
  try {
    return next(action)
  } catch (error) {
    console.error(`Error caught in reducer for ${action.type}`, {action, error})
    throw error
  }
}

const stateFreezer = store => next => action => {
  if (environment.isDevelopment()) {
    deepFreeze(store.getState())
    const result = next(action)
    deepFreeze(result)
    return result
  }
  return next(action)
}

const createStoreWithMiddleware = applyMiddleware(reducerErrorLogger, stateFreezer, reduxRouterMiddleware)(createStore)
const store = createStoreWithMiddleware(reducer)

// Required for replaying actions from devtools to work
if (environment.isDevelopment()) {
  reduxRouterMiddleware.listenForReplays(store)
}

export default store
