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

const reducer = createReducer(initialState, {
  [`CATEGORY_LOADED`]: (state, action) => state.setIn(['data', CATEGORY, action.payload.uuid], action.payload),
  ['ITEM_LOADED']: (state, action) => state.setIn(['data', ITEM, action.payload.uuid], action.payload)
})

export default {
  app: reducer
}
