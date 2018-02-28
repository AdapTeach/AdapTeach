import { initialState } from './AppState'
import { createStore, createFocusableStore } from 'lenrix'
import { applyMiddleware } from 'redux'
import { router } from '../router/router'

const store = createFocusableStore(
   (state) => state,
   initialState,
   (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)

export const rootStore = store.actionTypes<{
   navigateTo: { url: string }
}>()

export const routesStore = rootStore.focusPath('routes')
