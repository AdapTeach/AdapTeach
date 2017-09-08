import {createFormStore} from '../../../../util/createFormStore'
import {UUID} from '../../../../core/domain/UUID'
import {AssessmentAnswer, AssessmentType} from '../../../../core/domain/Assessment'

export interface CreateAssessmentFormState {
   type: AssessmentType
   question: string
   prerequisiteIds: UUID[]
   prerequisiteDialogVisible: boolean
   assessedItemIds: UUID[]
   activelyRecalledItemIds: UUID[]
   passivelyRecalledItemIds: UUID[]
   answers: AssessmentAnswer[]
   valid: boolean
}

const initialState: CreateAssessmentFormState = {
   type: 'Quiz',
   question: '',
   answers: [{text: '', correct: true}, {text: '', correct: false}],
   prerequisiteIds: [],
   prerequisiteDialogVisible: false,
   assessedItemIds: [],
   activelyRecalledItemIds: [],
   passivelyRecalledItemIds: [],
   valid: false
}

export const createAssessmentFormStore = createFormStore(initialState)

const store = createAssessmentFormStore

store.map(({question, assessedItemIds, answers}) => question.length > 5)
   .subscribe(valid => store.updateState({valid}))
