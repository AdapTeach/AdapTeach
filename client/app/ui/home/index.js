import React from 'react'
import {Route} from 'react-router'

const component = () =>
  <h2>Home</h2>

export const route =
  <Route path="*" component={component}/>
