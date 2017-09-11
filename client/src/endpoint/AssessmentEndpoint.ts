import {Observable} from 'rxjs/Observable'
import {Assessment, AssessmentFields} from '../core/domain/Assessment'
import {http} from './http'

const entityTypeName = 'assessment'

export class AssessmentEndpoint {

   post(entity: AssessmentFields): Observable<Assessment> {
      return http.post(`http://localhost:8000/api/${entityTypeName}`, entity)
   }

   get(uuid: string): Observable<Assessment> {
      return http.get(`http://localhost:8000/api/${entityTypeName}/${uuid}`)
      // .map(({entities, result}) => entities.category[result])
   }

}
