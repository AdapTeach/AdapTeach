import * as React from 'react'
import {Route, Switch} from 'react-router-dom'
import {ContributeNavigation} from './ContributeNavigation'
import {CreateCategory} from './category/create/CreateCategory'
import {path} from '../../router/path'
import {DisplayCategory} from './category/display/DisplayCategory'
import {CreateItem} from './item/create/CreateItem'
import {DisplayItem} from './item/display/DisplayItem'
import {CreateComposite} from './composite/create/CreateComposite'
import {DisplayComposite} from './composite/display/DisplayComposite'

export const ContributeRoutes = () =>
   <Route path='/contribute' render={() => <div>
      <ContributeNavigation />
      <Switch>
         <Route exact path={path.contribute.category.create} component={CreateCategory}/>
         <Route exact path={path.contribute.category.display()} component={DisplayCategory}/>
         <Route exact path={path.contribute.composite.create} component={CreateComposite}/>
         <Route exact path={path.contribute.composite.display()} component={DisplayComposite}/>
         <Route exact path={path.contribute.item.create} component={CreateItem}/>
         <Route exact path={path.contribute.item.display()} component={DisplayItem}/>
      </Switch>
   </div>}/>
