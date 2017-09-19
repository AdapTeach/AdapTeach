import {EMPTY_CREATE_ASSESSMENT_FORM} from '../routes/contribute/assessment/create/CreateAssessmentFormState'
import {RoutesState} from '../routes/state'

export interface AppState {
   routes: RoutesState
}

export const initialState: AppState = {
   routes: {
      contribute: {
         assessment: {
            create: {
               form: EMPTY_CREATE_ASSESSMENT_FORM
            }
         }
      }
   }
}
