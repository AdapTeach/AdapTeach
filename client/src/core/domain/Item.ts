import {Objective, ObjectiveFields} from './Objective'
import {Entity} from './Entity'
import {Category} from './Category'

export interface Item extends Objective {
   category: string
}

export interface ItemFields extends ObjectiveFields {
   category: string
}

export interface ItemDTO extends Entity {
   name: string,
   category: Category
}
