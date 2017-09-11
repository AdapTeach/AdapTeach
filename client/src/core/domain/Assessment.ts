import {UUID} from './UUID'
import {Entity} from './Entity'

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
   activelyRecalledItemIds?: UUID[]
   passivelyRecalledItemIds?: UUID[]
}
