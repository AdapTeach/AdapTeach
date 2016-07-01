import React from 'react'
import {Route} from 'react-router'

import * as objectives from './objectives'

export const route =
  <Route path="profile">
    {objectives.route}
  </Route>
