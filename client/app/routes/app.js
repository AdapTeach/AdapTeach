import React from 'react'
import { Router, Route, Link } from 'react-router'

import history from './history'

import Home from './home'

import CreateCategory from './category/create'
import ViewCategory from './category/view'

import CreateCompositeObjective from './composite/create'

import CreateItem from './item/create'
import ViewItem from './item/view'

export default () =>
  <Router history={history}>
    <Route path="/" component={Home}/>
    <Route path="category">
      <Route path="create" component={CreateCategory}/>
      <Route path=":id" component={ViewCategory}/>
    </Route>
    <Route path="composite">
      <Route path="create" component={CreateCompositeObjective}/>
    </Route>
    <Route path="item">
      <Route path="create" component={CreateItem}/>
      <Route path=":id" component={ViewItem}/>
    </Route>
  </Router>
