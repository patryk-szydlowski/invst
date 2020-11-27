/* eslint-disable jest/expect-expect */
import { EMPTY } from 'rxjs'
import { marbles } from 'rxjs-marbles/jest'

import {
  Category,
  CategoryCreation,
  CategoryModule,
  CategoryStateSlice,
} from 'features/category/types'
import { actions, state } from 'test/utils'
import { createCategoryId, createCategoryService } from 'test/utils/category'

import { createCategory, getCategories, removeCategory } from './category.actions'
import { createCategoryEpic, getCategoriesEpic, removeCategoryEpic } from './category.epics'

describe('category epics', () => {
  describe('get categories epic', () => {
    test(
      'returns get categories success when service successfully retrieves categories',
      marbles((context) => {
        // given
        const category: Category = {
          categoryId: createCategoryId(1),
          name: 'category-name',
          label: 'category-label',
        }

        const categories = [category]
        const categoryService = createCategoryService({
          getCategories: () => context.cold('a', { a: categories }),
        })

        const actions$ = actions(context.hot('a', { a: getCategories.request() }))
        const state$ = state<CategoryStateSlice>(EMPTY)
        const dependencies: CategoryModule = { categoryService }

        const expected = context.hot('a', { a: getCategories.success(categories) })

        // when
        const result = getCategoriesEpic(actions$, state$, dependencies)

        // expect
        context.expect(result).toBeObservable(expected)
      }),
    )

    test(
      'returns get categories failure when service fails in retrieving categories',
      marbles((context) => {
        // given
        const error = new Error()
        const categoryService = createCategoryService({
          getCategories: () => context.cold('#', undefined, error),
        })

        const actions$ = actions(context.hot('a', { a: getCategories.request() }))
        const state$ = state<CategoryStateSlice>(EMPTY)
        const dependencies: CategoryModule = { categoryService }

        const expected = context.hot('a', { a: getCategories.failure(error) })

        // when
        const result = getCategoriesEpic(actions$, state$, dependencies)

        // expect
        context.expect(result).toBeObservable(expected)
      }),
    )

    test(
      'returns nothing when service does not respond before get categories cancel',
      marbles((context) => {
        // given
        const categoryService = createCategoryService({
          getCategories: () => context.cold('-#', undefined, new Error()),
        })

        const actions$ = actions(
          context.hot('ab', { a: getCategories.request(), b: getCategories.cancel() }),
        )
        const state$ = state<CategoryStateSlice>(EMPTY)
        const dependencies: CategoryModule = { categoryService }

        const expected = context.hot('-')

        // when
        const result = getCategoriesEpic(actions$, state$, dependencies)

        // expect
        context.expect(result).toBeObservable(expected)
      }),
    )
  })

  describe('create category epic', () => {
    test(
      'returns create category success when service successfully creates category',
      marbles((context) => {
        // given
        const categoryCreation: CategoryCreation = {
          name: 'category-name',
          label: 'category-label',
        }
        const category: Category = {
          categoryId: createCategoryId(1),
          ...categoryCreation,
        }

        const categoryService = createCategoryService({
          createCategory: () => context.cold('a', { a: category }),
        })

        const actions$ = actions(context.hot('a', { a: createCategory.request(categoryCreation) }))
        const state$ = state<CategoryStateSlice>(EMPTY)
        const dependencies: CategoryModule = { categoryService }

        const expected = context.hot('a', { a: createCategory.success(category) })

        // when
        const result = createCategoryEpic(actions$, state$, dependencies)

        // expect
        context.expect(result).toBeObservable(expected)
      }),
    )

    test(
      'returns create category failure when service fails creating category',
      marbles((context) => {
        // given
        const error = new Error()
        const categoryCreation: CategoryCreation = {
          name: 'category-name',
          label: 'category-label',
        }

        const categoryService = createCategoryService({
          createCategory: () => context.cold('#', undefined, error),
        })

        const actions$ = actions(context.hot('a', { a: createCategory.request(categoryCreation) }))
        const state$ = state<CategoryStateSlice>(EMPTY)
        const dependencies: CategoryModule = { categoryService }

        const expected = context.hot('a', { a: createCategory.failure(error) })

        // when
        const result = createCategoryEpic(actions$, state$, dependencies)

        // expect
        context.expect(result).toBeObservable(expected)
      }),
    )

    test(
      'returns nothing when service does not respond before create category cancel',
      marbles((context) => {
        // given
        const categoryCreation: CategoryCreation = {
          name: 'category-name',
          label: 'category-label',
        }

        const categoryService = createCategoryService({
          createCategory: () => context.cold('-#', undefined, new Error()),
        })

        const actions$ = actions(
          context.hot('ab', {
            a: createCategory.request(categoryCreation),
            b: createCategory.cancel(),
          }),
        )
        const state$ = state<CategoryStateSlice>(EMPTY)
        const dependencies: CategoryModule = { categoryService }

        const expected = context.hot('-')

        // when
        const result = createCategoryEpic(actions$, state$, dependencies)

        // expect
        context.expect(result).toBeObservable(expected)
      }),
    )
  })

  describe('remove category epic', () => {
    test(
      'returns remove category success when service successfully removes category',
      marbles((context) => {
        // given
        const categoryId = createCategoryId(1)

        const categoryService = createCategoryService({
          removeCategory: () => context.cold('a', { a: undefined }),
        })

        const actions$ = actions(context.hot('a', { a: removeCategory.request(categoryId) }))
        const state$ = state<CategoryStateSlice>(EMPTY)
        const dependencies: CategoryModule = { categoryService }

        const expected = context.hot('a', { a: removeCategory.success(categoryId) })

        // when
        const result = removeCategoryEpic(actions$, state$, dependencies)

        // expect
        context.expect(result).toBeObservable(expected)
      }),
    )

    test(
      'returns remove category failure when service fails removing category',
      marbles((context) => {
        // given
        const error = new Error()
        const categoryId = createCategoryId(1)

        const categoryService = createCategoryService({
          removeCategory: () => context.cold('#', undefined, error),
        })

        const actions$ = actions(context.hot('a', { a: removeCategory.request(categoryId) }))
        const state$ = state<CategoryStateSlice>(EMPTY)
        const dependencies: CategoryModule = { categoryService }

        const expected = context.hot('a', { a: removeCategory.failure(error) })

        // when
        const result = removeCategoryEpic(actions$, state$, dependencies)

        // expect
        context.expect(result).toBeObservable(expected)
      }),
    )

    test(
      'returns nothing when service does not respond before remove category cancel',
      marbles((context) => {
        // given
        const categoryId = createCategoryId(1)

        const categoryService = createCategoryService({
          removeCategory: () => context.cold('-#', undefined, new Error()),
        })

        const actions$ = actions(
          context.hot('ab', {
            a: removeCategory.request(categoryId),
            b: removeCategory.cancel(),
          }),
        )
        const state$ = state<CategoryStateSlice>(EMPTY)
        const dependencies: CategoryModule = { categoryService }

        const expected = context.hot('-')

        // when
        const result = removeCategoryEpic(actions$, state$, dependencies)

        // expect
        context.expect(result).toBeObservable(expected)
      }),
    )
  })
})
