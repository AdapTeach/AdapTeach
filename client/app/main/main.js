import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, Link } from 'react-router'

// Required by MaterialUI until React reaches v1
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import history from './history'
import store from './store'

import App from '../routes/app'
import Home from '../routes/home'

import CreateCategory from '../routes/category/create'
import ViewCategory from '../routes/category/view'

import CreateItem from '../routes/item/create'
import ViewItem from '../routes/item/view'

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}/>
      <Route path="home" component={Home}/>
      <Route path="category">
        <Route path="create" component={CreateCategory}/>
        <Route path=":id" component={ViewCategory}/>
      </Route>
      <Route path="item">
        <Route path="create" component={CreateItem}/>
        <Route path=":id" component={ViewItem}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
