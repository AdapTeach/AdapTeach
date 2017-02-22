import * as React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

const Fail: React.StatelessComponent<{}> = () => <h1>Fail</h1>

export const UI = () =>
   <Router>
      <div>
         <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/contribute'>Contribute</Link></li>
            <li><Link to='/test'>Test</Link></li>
         </ul>

         <hr/>

         <Route exact path='/' component={Home}/>
         <Route exact path='/' component={Home}/>
         <Route path='/test' component={Test}/>
      </div>
   </Router>

const Home: React.StatelessComponent<{}> = () => <h1>Home</h1>

const Test: React.StatelessComponent<{match: any}> = ({match}) =>
   <div>
      <h1>Test</h1>
      <Route path={`${match.url}/nested`} component={Nested}/>
   </div>

const Nested: React.StatelessComponent<{}> = () => <h1>Nested</h1>
