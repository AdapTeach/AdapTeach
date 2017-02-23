import {Endpoint} from './Endpoint'
import {Item} from '../core/domain/Item'

export class ItemEndpoint extends Endpoint<Item> {

   constructor() {
      super('item')
   }

}
