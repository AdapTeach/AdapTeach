import { rootStore } from '../../../../state/store'
import { CreateAssessmentState } from './CreateAssessmentState'

export const createAssessmentStore = rootStore.focusPath('routes', 'createAssessment')
   .actionTypes<{
      updateFields: Partial<CreateAssessmentState['form']>
   }>()
   .updates(_ => ({
      updateFields: (fields) => _.focusPath('form').setFields(fields)
   }))
