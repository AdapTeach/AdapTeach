import React from 'react'
import {Router} from 'react-router'
import {combineReducers} from 'redux'

import {history} from 'router'

import * as home from './home'
import * as category from './category'
import * as composite from './composite'
import * as item from './item'

export const App = () =>
  <Router history={history}>
    {home.route}
    {category.route}
    {composite.route}
    {item.route}
  </Router>

/*
 <Route path="composite">
 <Route path="create" component={CreateComposite}/>
 <Route path=":id" component={ViewComposite}/>
 </Route>
 <Route path="item">
 <Route path="create" component={CreateItem}/>
 <Route path=":id" component={ViewItem}/>
 </Route>
 */

export const reducer = combineReducers({
  category: category.reducer,
  item: item.reducer,
  composite: composite.reducer
})
