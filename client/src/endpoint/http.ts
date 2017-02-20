import {Observable, AjaxResponse} from 'rxjs'
import {mapObjIndexed} from 'ramda'

export const http = {

   post(url: string, body): Observable<AjaxResponse> {
      return Observable.ajax.post(url, body)
   },

   get(url: string, params?: Record<string, string>): Observable<AjaxResponse> {
      const queryParams = params
         ? '?' + mapObjIndexed((val, key) => `${key}=${val}&`, params)
         : ''
      return Observable.ajax.get(url + queryParams)
   }

}
