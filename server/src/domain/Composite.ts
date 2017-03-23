import {Objective, ObjectiveFields} from './Objective'
import {UUID} from './UUID'

export interface Composite extends Objective {
   type: 'Composite'
   subObjectives: Objective[]
}

export interface CompositeFields extends ObjectiveFields {
   subObjectives: UUID[]
}

