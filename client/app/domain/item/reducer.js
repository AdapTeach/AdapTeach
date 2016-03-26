import R from 'ramda'
import {createReducer} from 'util'

const initialState = {}

export const itemReducer = createReducer(initialState, {
  ['ITEM_UPDATE']: (state, {payload}) => R.merge(state, {[payload.uuid]: payload})
})
