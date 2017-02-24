import {normalizeItem} from '../core/domain/norms'
import {Observable} from 'rxjs'
import {Item} from '../core/domain/Item'
import {http} from './http'
import {logAndReturn} from '../util/logAndReturn'

const entityTypeName = 'item'

export class ItemEndpoint {

   post(entity: Item): Observable<Item> {
      return http.post(`http://localhost:8000/api/${entityTypeName}`, entity)
         .map(r => r.response)
   }

   get(uuid: string): Observable<Item> {
      return http.get(`http://localhost:8000/api/${entityTypeName}/${uuid}`)
         .map(r => r.response)
         .map(normalizeItem)
         .map(({entities, result}) => entities.item[result])
   }

}
