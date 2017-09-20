import {createAssessmentInitialState, CreateAssessmentState} from '../routes/contribute/assessment/create/state'

export interface AppState {
   routes: {
      createAssessment: CreateAssessmentState
   }
}

export const initialState: AppState = {
   routes: {
      createAssessment: createAssessmentInitialState
   }
}
