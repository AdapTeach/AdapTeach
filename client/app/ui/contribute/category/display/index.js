import React from 'react'
import {Route} from 'react-router'

import {component} from './component'

export const route =
  <Route path=":id" component={component}/>
