import R from 'ramda'
import {createReducer} from 'util'

const initialState = {}

const categoryUpdate = (state, action) => updateCategoryAndParentHierarchy(state, action.payload)

function updateCategoryAndParentHierarchy(state, category) {
  var newState = state
  while (category) {
    newState = R.merge(newState, {[category.uuid]: category})
    category = category.parent
  }
  return newState
}

export const categoryReducer = createReducer(initialState, {
  ['CATEGORY_UPDATE']: categoryUpdate
})
