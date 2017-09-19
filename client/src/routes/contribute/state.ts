import {CreateAssessmentFormState} from './assessment/create/CreateAssessmentFormState'

export interface ContributeRoutesState {
   assessment: {
      create: {
         form: CreateAssessmentFormState
      }
   }
}
