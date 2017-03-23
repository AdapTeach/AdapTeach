import {Observable} from 'rxjs'
import {http} from './http'
import {Composite, CompositeDTO, CompositeFields} from '../core/domain/Composite'
import {UUID} from '../core/domain/UUID'

const entityTypeName = 'composite'

export class CompositeEndpoint {

   post(entity: CompositeFields): Observable<Composite> {
      return http.post(`http://localhost:8000/api/${entityTypeName}`, entity)
   }

   get(uuid: UUID): Observable<CompositeDTO> {
      return http.get(`http://localhost:8000/api/composite/${uuid}`)
   }

}
