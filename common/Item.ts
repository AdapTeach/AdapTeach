import {Objective, ObjectiveDTO, ObjectiveFields} from './Objective'
import {Category} from './Category'

export interface Item extends Objective {
   type: 'Item'
   category: string
}

export interface ItemFields extends ObjectiveFields {
   category: string
}

export interface ItemDTO extends ObjectiveDTO {
   type: 'Item'
   category: Category
}
