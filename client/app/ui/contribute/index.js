import React from 'react'
import {Route} from 'react-router'

import * as category from './category'
import * as composite from './composite'
import * as item from './item'
import * as quiz from './quiz'

import {Navigation} from './navigation'

export const route =
  <Route path="contribute">
    <Navigation/>
    {category.route}
    {composite.route}
    {item.route}
    {quiz.route}
  </Route>
