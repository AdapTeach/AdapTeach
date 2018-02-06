import { normalizeItem } from '../core/domain/norms'
import { Observable } from 'rxjs'
import { Item, ItemDTO } from '../core/domain/Item';
import { http } from './http'
import { Objective } from '../core/domain/Objective'
import { Composite } from '../core/domain/Composite'

const entityTypeName = 'objective'

export class ObjectiveEndpoint {

   post(entity: Objective): Observable<Item> {
      return http.post(`http://localhost:8000/api/${entityTypeName}`, entity)
   }

   get(uuid: string): Observable<Item> {
      return http.get<ItemDTO>(`http://localhost:8000/api/${entityTypeName}/${uuid}`)
         .map(normalizeItem)
         .map(({ entities, result }) => entities.item[result])
   }

   searchByName(name: string): Observable<{ composites: Composite[], items: Item[] }> {
      return http.get(`http://localhost:8000/api/${entityTypeName}/search/${name}`)
   }

}
