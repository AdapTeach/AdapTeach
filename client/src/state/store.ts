import { initialState } from './AppState'
import { createStore } from 'lenrix'

export const rootStore = createStore(initialState)

export const routesStore = rootStore.focusPath('routes')
