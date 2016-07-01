import React from 'react'
import {Router, Route} from 'react-router'

import {history} from 'router'

import * as contribute from './contribute'

import {Home} from './home'

export const UI = () =>
  <Router history={history}>
    {contribute.route}
    <Route path="*" component={Home}/>
  </Router>
