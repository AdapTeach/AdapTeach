import R from 'ramda'
import {compositeRepo} from 'domain-data'
import {router, path} from 'router'
import store from 'store'
import {createReducer} from 'util'

const initialState = {
  name: '',
  description: '',
  components: []
}
export const getState = () => store.getState().ui.composite.create

const NAMESPACE = 'COMPOSITE_CREATE__'


const SET_NAME = NAMESPACE + 'SET_NAME'
const setName = name => store.dispatch({
  type: SET_NAME,
  name
})
const handleSetName = (state, {name}) => R.merge(state, {name})


const SET_DESCRIPTION = NAMESPACE + 'SET_DESCRIPTION'
const setDescription = description => store.dispatch({
  type: SET_DESCRIPTION,
  description
})
const handleSetDescription = (state, {description}) => R.merge(state, {description})


const ADD_COMPONENT = NAMESPACE + 'ADD_COMPONENT'
const addComponent = component => store.dispatch({
  type: ADD_COMPONENT,
  component
})
const mergeInto = R.mergeWith(R.concat)
const handleAddComponent = (state, {component}) => mergeInto(state, {components: [component]})


const CLEAR_STATE = NAMESPACE + 'CLEAR_STATE'
const clearState = () => store.dispatch({
  type: CLEAR_STATE
})
const handleClearState = (state, action) => initialState;


const createAndDisplay = () => compositeRepo.create({
    name: getState().name,
    description: getState().description,
    componentIds: getState().components.map(c => c.uuid)
  })
  .then(created => router.goTo(path.composite.display(created.uuid)))
  .then(clearState)
  .catch(::console.error)


export const actions = {
  setName,
  setDescription,
  addComponent,
  createAndDisplay
}

export const reducer = createReducer(initialState, {
  [SET_NAME]: handleSetName,
  [SET_DESCRIPTION]: handleSetDescription,
  [ADD_COMPONENT]: handleAddComponent,
  [CLEAR_STATE]: handleClearState
})
