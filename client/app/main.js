import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, Link } from 'react-router'

// Required by MaterialUI until React reaches v1
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import history from './history'
import store from './store'

import App from './app'
import Home from './home'
import CreateCategory from './category/create'

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}/>
      <Route path="home" component={Home}/>
      <Route path="category">
        <Route path="create" component={CreateCategory}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
