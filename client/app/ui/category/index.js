import React from 'react'
import {Route} from 'react-router'
import {combineReducers} from 'redux'

import * as create from './create'
import * as display from './display'

export const route =
  <Route path="category">
    {create.route}
    {display.route}
  </Route>

export const reducer = combineReducers({
  create: create.reducer
})
