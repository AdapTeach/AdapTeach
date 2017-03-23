import {Objective, ObjectiveFields} from './Objective'
import {UUID} from './UUID'

export interface Composite extends Objective {
   type: 'COMPOSITE'
   subObjectives: Objective[]
}

export interface CompositeFields extends ObjectiveFields {
   subObjectives: UUID[]
}

