import { createStore, combineReducers, applyMiddleware } from 'redux'
import { syncHistory, routeReducer } from 'react-router-redux'

import reducers from '../core/reducers'
import history from './history'

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}))

const reduxRouterMiddleware = syncHistory(history)

const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore)
const store = createStoreWithMiddleware(reducer)

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store)

export default store
