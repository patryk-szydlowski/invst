import { EMPTY } from 'rxjs'

import { initialCategoryState } from 'features/category/store'
import {
  CategoryFeature,
  CategoryId,
  CategoryService,
  CategoryState,
  CategoryStateSlice,
} from 'features/category/types'
import { mockOpaque, mockPartial, mockSlice } from 'test/utils'

export const createCategoryId = mockOpaque<number, CategoryId>()

export const createCategoryState = mockPartial(initialCategoryState)

export const createCategorySlice = mockSlice<CategoryState, CategoryStateSlice>(
  CategoryFeature,
  initialCategoryState,
)

export const createCategoryService = mockPartial<CategoryService>({
  getCategories: () => EMPTY,
  createCategory: () => EMPTY,
  removeCategory: () => EMPTY,
})
