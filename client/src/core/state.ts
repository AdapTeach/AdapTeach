import {store} from './store'
import {AppState, initialState} from './AppState'
import {Update} from 'immutable-lens'
import {lens} from './lens'

const app$ = store
   .scan((state, updater: Update<AppState>) => updater(state), initialState)
   .startWith(initialState)

const createAssessmentForm$ = app$.map(state => lens.createAssessmentForm.read(state))

export const state = {
   app$,
   createAssessmentForm$
}
