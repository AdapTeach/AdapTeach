import {Objective, ObjectiveFields} from './Objective'
import {UUID} from './UUID'

export interface Composite extends Objective {
   subObjectives: UUID[]
}

export interface CompositeFields extends ObjectiveFields {
   subObjectives: UUID[]
}

