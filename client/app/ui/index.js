import React from 'react'
import {Router} from 'react-router'

import {history} from 'router'

import * as home from './home'
import * as category from './category'
import * as composite from './composite'
import * as item from './item'
import * as quiz from './quiz'

import {Navigation} from './navigation'

export const App = () =>
  <div>
    <Navigation></Navigation>
    <Router history={history}>
      {home.route}
      {category.route}
      {composite.route}
      {item.route}
      {quiz.route}
    </Router>
  </div>
