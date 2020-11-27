import { of } from 'rxjs'
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'

import { CategoryEpic } from 'features/category/types'

import { createCategory, getCategories, removeCategory } from './category.actions'

export const getCategoriesEpic: CategoryEpic = (action$, _, { categoryService }) =>
  action$.pipe(
    filter(isActionOf(getCategories.request)),
    switchMap(() =>
      categoryService.getCategories().pipe(
        map((categories) => getCategories.success(categories)),
        catchError((error: Error) => of(getCategories.failure(error))),
        takeUntil(action$.pipe(filter(isActionOf(getCategories.cancel)))),
      ),
    ),
  )

export const createCategoryEpic: CategoryEpic = (action$, _, { categoryService }) =>
  action$.pipe(
    filter(isActionOf(createCategory.request)),
    switchMap(({ payload: categoryCreation }) =>
      categoryService.createCategory(categoryCreation).pipe(
        map((category) => createCategory.success(category)),
        catchError((error: Error) => of(createCategory.failure(error))),
        takeUntil(action$.pipe(filter(isActionOf(createCategory.cancel)))),
      ),
    ),
  )

export const removeCategoryEpic: CategoryEpic = (action$, _, { categoryService }) =>
  action$.pipe(
    filter(isActionOf(removeCategory.request)),
    switchMap(({ payload: categoryId }) =>
      categoryService.removeCategory(categoryId).pipe(
        map(() => removeCategory.success(categoryId)),
        catchError((error: Error) => of(removeCategory.failure(error))),
        takeUntil(action$.pipe(filter(isActionOf(removeCategory.cancel)))),
      ),
    ),
  )

export const categoryEpics = [getCategoriesEpic, createCategoryEpic, removeCategoryEpic]
