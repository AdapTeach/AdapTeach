import {Subject} from 'rxjs'
import {AppState} from './AppState'
import {Update} from 'immutable-lens'

export const store = new Subject<Update<AppState>>()
