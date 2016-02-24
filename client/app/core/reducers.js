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

const categoryLoaded = (state, action) => {
  var newState = state
  var category = action.payload
  while (category) {
    newState = newState.setIn(['data', CATEGORY, category.uuid], category)
    category = category.parent
  }
  return newState
}

const reducer = createReducer(initialState, {
  ['CATEGORY_LOADED']: categoryLoaded,
  ['ITEM_LOADED']: (state, action) => state.setIn(['data', ITEM, action.payload.uuid], action.payload)
})

export default {
  app: reducer
}
