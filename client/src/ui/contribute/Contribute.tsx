import * as React from 'react'
import {Route} from 'react-router-dom'
import {ContributeNavigation} from './ContributeNavigation'
import {CreateCategory} from './category/CreateCategory'

export const Contribute: React.StatelessComponent<{}> = () =>
   <Route path='contribute'>
      <Route path='category'>
         <Route path='create' component={CreateCategory}/>
      </Route>
   </Route>
