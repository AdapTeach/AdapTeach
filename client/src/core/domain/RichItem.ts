import {Category} from './Category'
import {UUID} from './UUID'

export interface RichItem {
   uuid: UUID,
   name: string,
   category: Category
}
