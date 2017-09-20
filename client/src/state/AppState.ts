import {RoutesState} from '../routes/state'
import {createAssessmentInitialState} from '../routes/contribute/assessment/create/state'

export interface AppState {
   routes: RoutesState
}

export const initialState: AppState = {
   routes: {
      contribute: {
         assessment: {
            create: createAssessmentInitialState
         }
      }
   }
}
