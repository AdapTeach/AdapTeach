import R from 'ramda'
import {itemRepo} from 'domain-data'
import {router, path} from 'router'
import store from 'store'
import {createReducer} from 'util'


const initialState = {
  name: '',
  description: '',
  category: null
}
export const getState = () => store.getState().ui.item.create

const NAMESPACE = 'ITEM_CREATE__'


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


const SET_CATEGORY = NAMESPACE + 'SET_CATEGORY'
const setCategory = category=> store.dispatch({
  type: SET_CATEGORY,
  category
})
const handleSetCategory = (state, {category}) => R.merge(state, {category})


const CLEAR_STATE = NAMESPACE + 'CLEAR_STATE'
const clearState = () => store.dispatch({
  type: CLEAR_STATE
})
const handleClearState = (state, action) => initialState


const createAndDisplay = () => itemRepo.create({
    name: getState().name,
    description: getState().description,
    categoryId: getState().category.uuid
  })
  .then(created => router.goTo(path.item.display(created.uuid)))
  .then(clearState)
  .catch(::console.error)

export const actions = {
  setName,
  setDescription,
  setCategory,
  createAndDisplay
}

export const reducer = createReducer(initialState, {
  [SET_NAME]: handleSetName,
  [SET_DESCRIPTION]: handleSetDescription,
  [SET_CATEGORY]: handleSetCategory,
  [CLEAR_STATE]: handleClearState
})
