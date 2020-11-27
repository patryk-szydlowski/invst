import { fromNullable, Option } from 'fp-ts/Option'
import { createSelector } from 'reselect'

import {
  allCategoriesResolver,
  categoryResolver,
  parentCategoryResolver,
  subCategoriesResolver,
} from 'features/category/resolvers'
import {
  Category,
  CategoryFeature,
  CategoryId,
  CategoryState,
  CategoryStateSlice,
} from 'features/category/types'

const selectCategoryFeature = (store: CategoryStateSlice) => store[CategoryFeature]

const extractCategories = ({ categories }: CategoryState): Map<CategoryId, Category> => categories
const extractFetching = ({ fetching }: CategoryState): boolean => fetching
const extractError = ({ error }: CategoryState): Option<Error> => fromNullable(error)

export const selectCategories = createSelector(selectCategoryFeature, extractCategories)
export const selectFetching = createSelector(selectCategoryFeature, extractFetching)
export const selectError = createSelector(selectCategoryFeature, extractError)
export const selectAllCategories = createSelector(selectCategories, allCategoriesResolver)
export const selectCategory = createSelector(selectCategories, categoryResolver)
export const selectParentCategory = createSelector(selectCategory, parentCategoryResolver)
export const selectSubCategories = createSelector(selectCategory, subCategoriesResolver)
