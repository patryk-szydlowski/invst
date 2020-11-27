import { Action, createReducer } from 'typesafe-actions'

import {
  Category,
  CategoryCreation,
  CategoryId,
  CategoryReducer,
  CategoryState,
} from 'features/category/types'

import {
  clearCategoryError,
  createCategory,
  getCategories,
  removeCategory,
} from './category.actions'
import { initialCategoryState } from './category.state'
import { insertCategory, removeCategoryById } from './category.utils'

function getCategoriesRequestReducer(): CategoryReducer<void> {
  return (state) => ({ ...state, fetching: true })
}

function getCategoriesSuccessReducer(): CategoryReducer<Category[]> {
  return (state, { payload: categories }) => ({
    ...state,
    fetching: false,
    categories: new Map(categories.map((category) => [category.categoryId, category])),
  })
}

function getCategoriesFailureReducer(): CategoryReducer<Error> {
  return (state, { payload: error }) => ({ ...state, fetching: false, error })
}

function getCategoriesCancelReducer(): CategoryReducer<void> {
  return (state) => ({ ...state, fetching: false })
}

function createCategoryRequestReducer(): CategoryReducer<CategoryCreation> {
  return (state) => ({ ...state, fetching: true })
}

function createCategorySuccessReducer(): CategoryReducer<Category> {
  return ({ categories, ...state }, { payload: category }) => ({
    ...state,
    fetching: false,
    categories: insertCategory(category)(categories),
  })
}

function createCategoryFailureReducer(): CategoryReducer<Error> {
  return (state, { payload: error }) => ({ ...state, fetching: false, error })
}

function createCategoryCancelReducer(): CategoryReducer<void> {
  return (state) => ({ ...state, fetching: false })
}

function removeCategoryRequestReducer(): CategoryReducer<CategoryId> {
  return (state) => ({ ...state, fetching: true })
}

function removeCategorySuccessReducer(): CategoryReducer<CategoryId> {
  return ({ categories, ...state }, { payload: categoryId }) => ({
    ...state,
    fetching: false,
    categories: removeCategoryById(categoryId)(categories),
  })
}

function removeCategoryFailureReducer(): CategoryReducer<Error> {
  return (state, { payload: error }) => ({ ...state, fetching: false, error })
}

function removeCategoryCancelReducer(): CategoryReducer<void> {
  return (state) => ({ ...state, fetching: false })
}

function clearCategoryErrorReducer(): CategoryReducer<void> {
  return (state) => ({ ...state, error: undefined })
}

export const categoryReducer = createReducer<CategoryState, Action>(initialCategoryState)
  .handleAction(getCategories.request, getCategoriesRequestReducer())
  .handleAction(getCategories.success, getCategoriesSuccessReducer())
  .handleAction(getCategories.failure, getCategoriesFailureReducer())
  .handleAction(getCategories.cancel, getCategoriesCancelReducer())
  .handleAction(createCategory.request, createCategoryRequestReducer())
  .handleAction(createCategory.success, createCategorySuccessReducer())
  .handleAction(createCategory.failure, createCategoryFailureReducer())
  .handleAction(createCategory.cancel, createCategoryCancelReducer())
  .handleAction(removeCategory.request, removeCategoryRequestReducer())
  .handleAction(removeCategory.success, removeCategorySuccessReducer())
  .handleAction(removeCategory.failure, removeCategoryFailureReducer())
  .handleAction(removeCategory.cancel, removeCategoryCancelReducer())
  .handleAction(clearCategoryError, clearCategoryErrorReducer())
