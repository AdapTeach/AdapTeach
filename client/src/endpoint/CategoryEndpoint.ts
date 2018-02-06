import { Category, CategoryFields, CategoryDTO } from '../core/domain/Category';
import {Observable} from 'rxjs'
import {http} from './http'
import {normalizeCategory} from '../core/domain/norms'

const entityTypeName = 'category'

export class CategoryEndpoint {

   post(entity: CategoryFields): Observable<Category> {
      return http.post(`http://localhost:8000/api/${entityTypeName}`, entity)
   }

   get(uuid: string): Observable<Category> {
      return http.get<CategoryDTO>(`http://localhost:8000/api/${entityTypeName}/${uuid}`)
         .map(normalizeCategory)
         .map(({entities, result}) => entities.category[result])
   }

   searchByName(name: string): Observable<Category[]> {
      return http.get(`http://localhost:8000/api/${entityTypeName}/search/${name}`)
   }

}
