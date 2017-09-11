import {createFormStore} from '../../../../util/createFormStore'
import {UUID} from '../../../../core/domain/UUID'
import {AssessmentAnswer, AssessmentType} from '../../../../core/domain/Assessment'

export interface CreateAssessmentFormState {
   type: AssessmentType
   question: string
   prerequisiteIds: UUID[]
   prerequisiteSearchFormIsVisible: boolean
   assessedItemIds: UUID[]
   assessedItemSearchFormIsVisible: boolean
   activelyRecalledItemIds: UUID[]
   activelyRecalledItemSearchFormIsVisible: boolean
   passivelyRecalledItemIds: UUID[]
   passivelyRecalledItemSearchFormIsVisible: boolean
   answers: AssessmentAnswer[]
}

const initialState: CreateAssessmentFormState = {
   type: 'Quiz',
   question: '',
   answers: [{text: '', correct: true}, {text: '', correct: false}],
   prerequisiteIds: [],
   prerequisiteSearchFormIsVisible: false,
   assessedItemIds: [],
   assessedItemSearchFormIsVisible: false,
   activelyRecalledItemIds: [],
   activelyRecalledItemSearchFormIsVisible: false,
   passivelyRecalledItemIds: [],
   passivelyRecalledItemSearchFormIsVisible: false
}

export const createAssessmentFormStore = createFormStore(initialState)

const store = createAssessmentFormStore
