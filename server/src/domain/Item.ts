import {Objective, ObjectiveFields} from './Objective'
import {Category} from './Category'

export interface Item extends Objective {
   category: Category
}

export interface ItemFields extends ObjectiveFields {
   category: string
}
