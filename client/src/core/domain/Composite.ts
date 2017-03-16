import {Objective} from './Objective'
import {UUID} from './UUID'

export interface Composite extends Objective {
   subObjectives: UUID[]
}
