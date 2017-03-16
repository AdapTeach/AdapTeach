import {http} from './http'
import {Observable} from 'rxjs'

export class Endpoint<T> {

   constructor(private readonly entityTypeName) {
   }

   post(entity: T): Observable<T> {
      return http.post(`http://localhost:8000/api/${this.entityTypeName}`, entity)
   }

   get(uuid: string): Observable<T> {
      return http.get(`http://localhost:8000/api/${this.entityTypeName}/${uuid}`)
   }

   // search(params: Record<string, string>): Observable<T[]> {
   //    return http.get(`http://localhost:8000/api/${this.entityTypeName}`, params)
   //       .map(r => r.response)
   // }

}
