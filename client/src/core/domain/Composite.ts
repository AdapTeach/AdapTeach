import {Objective, ObjectiveDTO, ObjectiveFields} from './Objective'
import {UUID} from './UUID'

export interface Composite extends Objective {
   type: 'COMPOSITE'
   subObjectives: UUID[]
}

export interface CompositeFields extends ObjectiveFields {
   subObjectives: UUID[]
}

export interface CompositeDTO extends ObjectiveDTO {
   type: 'COMPOSITE'
   subObjectives: Objective[]
}
