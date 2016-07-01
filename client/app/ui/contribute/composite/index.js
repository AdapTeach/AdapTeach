import React from 'react'
import {Route} from 'react-router'

import * as create from './create'
import * as display from './display'

export const route =
  <Route path="composite">
    {create.route}
    {display.route}
  </Route>
