import React from 'react'
import {Route} from 'react-router'

import {component} from './component'

export const route =
  <Route path="create" component={component}/>

export {reducer} from './model'