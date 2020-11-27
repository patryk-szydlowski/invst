import { CategoryState } from 'features/category/types'

export const initialCategoryState: CategoryState = {
  categories: new Map(),
  fetching: false,
}
