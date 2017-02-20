import {http} from './http'
import {Observable} from 'rxjs'

export class Endpoint<T> {

   constructor(private readonly entityTypeName) {
   }

   post(entity: T): Observable<T> {
      return http.post(`http://localhost:8000/api/${this.entityTypeName}`, entity)
         .map(r => r.response)
   }

   get(id): Observable<T> {
      return http.get(`http://localhost:8000/api/${this.entityTypeName}/${id}`)
         .map(r => r.response)
   }

   // search(params: Record<string, string>): Observable<T[]> {
   //    return http.get(`http://localhost:8000/api/${this.entityTypeName}`, params)
   //       .map(r => r.response)
   // }

}
