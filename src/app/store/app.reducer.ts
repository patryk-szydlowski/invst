import { combineReducers } from 'redux'

import { categoryReducer } from 'features/category/store'
import { CategoryFeature } from 'features/category/types'

export const appReducer = combineReducers({
  [CategoryFeature]: categoryReducer,
})
