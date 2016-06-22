import React from 'react'
import {Router} from 'react-router'

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
