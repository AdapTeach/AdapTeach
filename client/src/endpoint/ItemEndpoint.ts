import {RichItem} from '../core/domain/RichItem'
import {normalizeItem} from '../core/domain/norms'
import {Observable} from 'rxjs'
import {Item} from '../core/domain/Item'
import {http} from './http'

const entityTypeName = 'item'

export class ItemEndpoint {

   post(entity: Item): Observable<Item> {
      return http.post(`http://localhost:8000/api/${entityTypeName}`, entity)
         .map(r => r.response)
   }

   get(uuid: string): Observable<Item> {
      return http.get(`http://localhost:8000/api/${entityTypeName}/${uuid}`)
         .map(r => r.response)
         .map((richItem: RichItem) => normalizeItem(richItem))
         .map(({entities, result}) => entities.item[result])
   }

}
