import { createStore, combineReducers, applyMiddleware } from 'redux'
import { syncHistory, routeReducer } from 'react-router-redux'

import reducers from '../core/reducers'
import history from '../routes/history'

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}))

const reduxRouterMiddleware = syncHistory(history)

const reducerErrorLogger = store => next => action => {
  try {
    return next(action)
  } catch (error) {
    console.error(`Error caught in reducer for ${action.type}`, {action, error})
    throw error
  }
}

const createStoreWithMiddleware = applyMiddleware(reducerErrorLogger, reduxRouterMiddleware)(createStore)
const store = createStoreWithMiddleware(reducer)

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store)

export default store
