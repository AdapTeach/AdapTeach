import {combineReducers} from 'redux'

export {categoryRepo, categoryData} from './category'
export {compositeRepo} from './composite'
export {itemRepo} from './item'

import {categoryReducer} from './category'
import {compositeReducer} from './composite'
import {itemReducer} from './item'

export const domainReducer = combineReducers({
  category: categoryReducer,
  composite: compositeReducer,
  item: itemReducer
})

