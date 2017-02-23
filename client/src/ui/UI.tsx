import * as React from 'react'
import {Router, Route, Link} from 'react-router-dom'
import {ContributeRoutes} from './contribute/ContributeRoutes'
import {router} from '../router/router'

const Home: React.StatelessComponent<{}> = () => <h1>Home</h1>

export const UI = () =>
   <Router history={router.history}>
      <div>
         <Route exact path='/' component={Home}/>
         <ContributeRoutes />
      </div>
   </Router>

