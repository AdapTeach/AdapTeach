import { UUID } from './UUID'
import { Entity } from './Entity'

export type AssessmentType = 'Quiz'

export interface AssessmentAnswer {
   text: string
   correct: boolean
}

export interface Assessment extends Entity, AssessmentFields {
}

export interface AssessmentFields {
   type: AssessmentType
   question: string
   answers: AssessmentAnswer[]
   prerequisiteIds: UUID[]
   assessedItemIds: UUID[]
   activelyRecalledItemIds: UUID[]
   passivelyRecalledItemIds: UUID[]
}

export const EMPTY_ASSESSMENT_FIELDS: AssessmentFields = {
   type: 'Quiz',
   question: '',
   answers: [
      { text: '', correct: true },
      { text: '', correct: false }
   ],
   prerequisiteIds: [],
   assessedItemIds: [],
   activelyRecalledItemIds: [],
   passivelyRecalledItemIds: []
}
