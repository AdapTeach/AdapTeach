import {initialState} from './AppState'
import {createStore} from 'lenrix'

export const store = createStore(initialState)

export const routesStore = store.focusOn('routes')
