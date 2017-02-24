import {Category} from '../core/domain/Category'
import {Observable} from 'rxjs'
import {http} from './http'
import {normalizeCategory} from '../core/domain/norms'

const entityTypeName = 'category'

export class CategoryEndpoint {

   post(entity: Category): Observable<Category> {
      return http.post(`http://localhost:8000/api/${entityTypeName}`, entity)
         .map(r => r.response)
   }

   get(uuid: string): Observable<Category> {
      return http.get(`http://localhost:8000/api/${entityTypeName}/${uuid}`)
         .map(r => r.response)
         .map(normalizeCategory)
         .map(({entities, result}) => entities.category[result])
   }

   searchByName(name: string): Observable<Category[]> {
      return http.get(`http://localhost:8000/api/${entityTypeName}/search/${name}`)
         .map(r => r.response)
   }

}
