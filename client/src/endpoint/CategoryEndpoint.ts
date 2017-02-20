import {Endpoint} from './Endpoint'
import {Category} from '../core/domain/Category'
import {Observable} from 'rxjs'
import {http} from './http'

const entityTypeName = 'category'

export class CategoryEndpoint extends Endpoint<Category> {

   constructor() {
      super(entityTypeName)
   }

   searchByName(name: string): Observable<Category[]> {
      console.log(name)
      return http.get(`http://localhost:8000/api/${entityTypeName}/search/${name}`)
         .map(r => r.response)
   }

}
