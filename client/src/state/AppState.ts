import {
   CreateAssessmentFormState,
   EMPTY_CREATE_ASSESSMENT_FORM
} from '../routes/contribute/assessment/create/CreateAssessmentFormState'

export interface AppState {
   contribute: {
      assessment: {
         create: {
            form: CreateAssessmentFormState
         }
      }
   }
}

export const initialState: AppState = {
   contribute: {
      assessment: {
         create: {
            form: EMPTY_CREATE_ASSESSMENT_FORM
         }
      }
   }
}
