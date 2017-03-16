import {Observable} from 'rxjs'
import {mapObjIndexed} from 'ramda'

export const http = {

   post<T>(url: string, body): Observable<T> {
      return Observable.ajax.post(url, body, {'Content-Type': 'application/json'})
         .map(r => r.response)
   },

   get<T>(url: string, params?: Record<string, string>): Observable<T> {
      const queryParams = params
         ? '?' + mapObjIndexed((val, key) => `${key}=${val}&`, params)
         : ''
      return Observable.ajax.getJSON(url + queryParams)
   }

}
