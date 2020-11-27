import { createAction, createAsyncAction } from 'typesafe-actions'

import { Category, CategoryCreation, CategoryId } from 'features/category/types'

export const getCategories = createAsyncAction(
  'category/get-categories/request',
  'category/get-categories/success',
  'category/get-categories/failure',
  'category/get-categories/cancel',
)<void, Category[], Error, void>()

export const createCategory = createAsyncAction(
  'category/create-category/request',
  'category/create-category/success',
  'category/create-category/failure',
  'category/create-category/cancel',
)<CategoryCreation, Category, Error, void>()

export const removeCategory = createAsyncAction(
  'category/remove-category/request',
  'category/remove-category/success',
  'category/remove-category/failure',
  'category/remove-category/cancel',
)<CategoryId, CategoryId, Error, void>()

export const clearCategoryError = createAction('category/clear-error')<void>()
