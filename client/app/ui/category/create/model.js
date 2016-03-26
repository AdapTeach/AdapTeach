import R from 'ramda'
import {categoryRepo} from 'domain-data'
import {router, path} from 'router'
import store from 'store'
import {createReducer} from 'util'

const initialState = {
  name: '',
  parentId: null
}
export const getState = () => store.getState().ui.category.create

const NAMESPACE = 'CATEGORY_CREATE__'


const SET_NAME = NAMESPACE + 'SET_NAME'
const setName = name => store.dispatch({
  type: SET_NAME,
  name
})
const handleSetName = (state, {name}) => R.merge(state, {name})


const SET_PARENT = NAMESPACE + 'SET_PARENT'
const setParent = parent => store.dispatch({
  type: SET_PARENT,
  parent
})
const handleSetParent = (state, {parent}) => R.merge(state, {parent})


const CLEAR_STATE = NAMESPACE + 'CLEAR_STATE'
const clearState = () => store.dispatch({
  type: CLEAR_STATE
})
const handleClearState = (state, action) => initialState;


const createAndDisplay = (form) => categoryRepo.create({
    name: form.name,
    parentId: getState().parent.uuid
  })
  .then(created => router.goTo(path.category.display(created.uuid)))
  .then(clearState)
  .catch(::console.error)


export const actions = {
  setName,
  setParent,
  createAndDisplay
}

export const reducer = createReducer(initialState, {
  [SET_NAME]: handleSetName,
  [SET_PARENT]: handleSetParent,
  [CLEAR_STATE]: handleClearState
})
