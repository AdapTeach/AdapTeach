import {UUID} from './UUID'

export type AssessmentType = 'Quiz'

export interface AssessmentAnswer {
   text: string
   correct: boolean
}

export interface Assessment {
}

export interface AssessmentFields {
}

export interface AssessmentData {
   type: AssessmentType
   question: string
   prerequisiteIds?: UUID[]
   assessedItemIds: UUID[]
   activelyRecalledItemIds?: UUID[]
   passivelyRecalledItemIds?: UUID[]
   answers: AssessmentAnswer[]
}
