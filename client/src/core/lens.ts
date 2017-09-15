import {createLens} from 'immutable-lens'
import {AppState} from './AppState'

const app = createLens<AppState>()
const contribute = app.focusOn('contribute')
const contributeAssessment = contribute.focusOn('assessment')
const createAssessmentForm = contributeAssessment.focusOn('create').focusOn('form')

export const lens = {
   app,
   createAssessmentForm
}
