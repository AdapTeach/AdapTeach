import R from 'ramda'
import {createReducer} from 'util'

const initialState = {}

export const compositeReducer = createReducer(initialState, {
  ['COMPOSITE_UPDATE']: (state, {payload}) => R.merge(state, {[payload.uuid]: payload})
})
