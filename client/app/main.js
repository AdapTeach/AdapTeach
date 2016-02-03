import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, Link } from 'react-router'
import createHistory from 'history/lib/createBrowserHistory'
import { syncHistory, routeReducer } from 'react-router-redux'

import reducers from './reducers'

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}))

const browserHistory = createHistory()

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory)
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore)

//const store = createStore(reducer);
const store = createStoreWithMiddleware(reducer)

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store)

import App from './app'
import Home from './home'
import CreateCategory from './category/create'

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}/>
      <Route path="home" component={Home}/>
      <Route path="category">
        <Route path="create" component={CreateCategory}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
