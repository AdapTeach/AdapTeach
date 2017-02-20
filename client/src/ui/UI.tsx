import * as React from 'react'
import {Router, Route, browserHistory} from 'react-router'
import {CreateCategory} from './contribute/category/CreateCategory'

const Home = () => <h1>Home</h1>

export const UI = () =>
   <Router history={browserHistory}>
      <Route path='/' component={CreateCategory}/>
   </Router>

// <Route path='about' component={About}/>
// <Route path='inbox' component={Inbox}>
//    <Route path='messages/:id' component={Message}/>
// </Route>
