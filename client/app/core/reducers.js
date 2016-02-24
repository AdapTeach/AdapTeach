import Immutable from 'immutable'
import deepFreeze from 'deep-freeze'
import { createReducer } from 'redux-immutablejs'

import environment from '../main/environment'
import { CATEGORY, ITEM } from './data/entities'

const initialState = {
  data: {
    category: {},
    item: {}
  }
}

const categoryUpdate = (state, action) => updateCategoryAndParentHierarchy(state, action.payload)

function updateCategoryAndParentHierarchy(state, category) {
  var newState = state
  while (category) {
    newState = newState.setIn(['data', CATEGORY, category.uuid], category)
    category = category.parent
  }
  return newState
}

const itemUpdate = (state, action) => {
  const item = action.payload
  return updateCategoryAndParentHierarchy(state, item.category)
    .setIn(['data', ITEM, action.payload.uuid], action.payload)
}

const reducer = createReducer(initialState, {
  ['CATEGORY_UPDATE']: categoryUpdate,
  ['ITEM_UPDATE']: itemUpdate
})

export default {
  app: reducer
}
