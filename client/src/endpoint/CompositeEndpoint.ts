import {normalizeItem} from '../core/domain/norms'
import {Observable} from 'rxjs'
import {http} from './http'
import {Composite} from '../core/domain/Composite'
import {UUID} from '../core/domain/UUID'

const entityTypeName = 'composite'

export class CompositeEndpoint {

   post(entity: Composite): Observable<Composite> {
      console.log(entity)
      return http.post(`http://localhost:8000/api/${entityTypeName}`, entity)
   }

   get(uuid: UUID): Observable<Composite> {
      return http.get(`http://localhost:8000/api/${entityTypeName}/${uuid}`)
         .map(normalizeItem)
         .map(({entities, result}) => entities.item[result])
   }

}
