import { Category, CategoryId } from './domain.types'
import { CategoryFeature } from './feature.types'

export type CategoryState = {
  categories: Map<CategoryId, Category>
  fetching: boolean
  error?: Error
}

export type CategoryStateSlice = {
  [CategoryFeature]: CategoryState
}
