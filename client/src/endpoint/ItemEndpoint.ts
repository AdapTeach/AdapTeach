import {normalizeItem} from '../core/domain/norms'
import {Observable} from 'rxjs'
import {Item, ItemFields} from '../core/domain/Item'
import {http} from './http'

const entityTypeName = 'item'

export class ItemEndpoint {

   post(entity: ItemFields): Observable<Item> {
      return http.post(`http://localhost:8000/api/${entityTypeName}`, entity)
   }

   get(uuid: string): Observable<Item> {
      return http.get(`http://localhost:8000/api/${entityTypeName}/${uuid}`)
         .map(normalizeItem)
         .map(({entities, result}) => entities.item[result])
   }

   search(name: string): Observable<Item[]> {
      if (name.length < 2) return Observable.of([])
      return http.get(`http://localhost:8000/api/${entityTypeName}/search/${name}`)
   }

}
