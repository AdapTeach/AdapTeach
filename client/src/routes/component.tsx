import * as React from 'react'
import {Route, Router, Switch} from 'react-router-dom'
import {router} from '../router/router'
import {ContributeComponent} from './contribute/component'

const Home: React.StatelessComponent<{}> = () => <h1>Home</h1>

export const RoutesComponent = () =>
   <Router history={router.history}>
      <Switch>
         <Route exact path='/' component={Home}/>
         <ContributeComponent/>
      </Switch>
   </Router>

