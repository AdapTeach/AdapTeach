import Immutable from 'immutable'
import deepFreeze from 'deep-freeze'

import environment from '../main/environment'
import { CATEGORY, ITEM } from './data/entities'

const initialState = Immutable.fromJS({
  data: {
    category: {}
  }
})

function reducer(state = initialState, action) {
  if (environment.isDevelopment) deepFreeze(state)
  switch (action.type) {
    case 'CATEGORY_LOADED':
      const category = action.payload
      return state.setIn(['data', CATEGORY, category.uuid], category)
    default:
      return state
  }
}

export default {
  app: reducer
}
