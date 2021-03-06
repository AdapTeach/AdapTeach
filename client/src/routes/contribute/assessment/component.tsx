import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { path } from '../../../router/path'
import { ContributeNavigation } from '../ContributeNavigation'
import { CreateAssessmentPlace } from './create/CreateAssessmentPlace'
import { DisplayAssessment } from './display/DisplayAssessment'

export const ContributeAssessment = () =>
   <Route path='/contribute' render={() => <div>
      <ContributeNavigation />
      <Switch>
         <Route exact path={path.contribute.assessment.create} component={CreateAssessmentPlace} />
         <Route exact path={path.contribute.assessment.display()} component={DisplayAssessment} />
      </Switch>
   </div>} />
