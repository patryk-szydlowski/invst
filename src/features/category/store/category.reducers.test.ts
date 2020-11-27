import { Category, CategoryCreation } from 'features/category/types'
import { createCategoryId, createCategoryState } from 'test/utils/category'

import {
  clearCategoryError,
  createCategory,
  getCategories,
  removeCategory,
} from './category.actions'
import { categoryReducer } from './category.reducers'

describe('category reducer', () => {
  describe('get categories', () => {
    test('starts fetching on get categories request', () => {
      // given
      const state = createCategoryState({ fetching: false })
      const expectedState = createCategoryState({ fetching: true })

      const action = getCategories.request()

      // when
      const nextState = categoryReducer(state, action)

      // then
      expect(nextState).toEqual(expectedState)
    })

    test('stops fetching and overwrites categories on get categories success', () => {
      // given
      const existingCategoryId = createCategoryId(1)
      const existingCategory: Category = {
        categoryId: existingCategoryId,
        name: 'existing-category-name',
        label: 'existing-category-label',
      }
      const newCategoryId = createCategoryId(2)
      const newCategory: Category = {
        categoryId: newCategoryId,
        name: 'existing-category-name',
        label: 'existing-category-label',
      }

      const state = createCategoryState({
        fetching: true,
        categories: new Map([[existingCategoryId, existingCategory]]),
      })
      const expectedState = createCategoryState({
        fetching: false,
        categories: new Map([[newCategoryId, newCategory]]),
      })

      const action = getCategories.success([newCategory])

      // when
      const nextState = categoryReducer(state, action)

      // then
      expect(nextState).toEqual(expectedState)
    })

    test('stops fetching and stores error on get categories failure', () => {
      // given
      const error = new Error()

      const state = createCategoryState({ fetching: true })
      const expectedState = createCategoryState({ fetching: false, error })

      const action = getCategories.failure(error)

      // when
      const nextState = categoryReducer(state, action)

      // then
      expect(nextState).toEqual(expectedState)
    })

    test('stops fetching on get categories cancel', () => {
      // given
      const state = createCategoryState({ fetching: true })
      const expectedState = createCategoryState({ fetching: false })

      const action = getCategories.cancel()

      // when
      const nextState = categoryReducer(state, action)

      // then
      expect(nextState).toEqual(expectedState)
    })
  })

  describe('create category', () => {
    test('starts fetching on create category request', () => {
      // given
      const payload: CategoryCreation = {
        name: 'category-name',
        label: 'category-label',
      }

      const state = createCategoryState({ fetching: false })
      const expectedState = createCategoryState({ fetching: true })

      const action = createCategory.request(payload)

      // when
      const nextState = categoryReducer(state, action)

      // then
      expect(nextState).toEqual(expectedState)
    })

    test('stops fetching and adds new category on create category success', () => {
      // given
      const existingCategoryId = createCategoryId(1)
      const existingCategory: Category = {
        categoryId: existingCategoryId,
        name: 'existing-category-name',
        label: 'existing-category-label',
      }
      const newCategoryId = createCategoryId(2)
      const newCategory: Category = {
        categoryId: newCategoryId,
        name: 'existing-category-name',
        label: 'existing-category-label',
      }

      const state = createCategoryState({
        fetching: true,
        categories: new Map([[existingCategoryId, existingCategory]]),
      })
      const expectedState = createCategoryState({
        fetching: false,
        categories: new Map([
          [existingCategoryId, existingCategory],
          [newCategoryId, newCategory],
        ]),
      })

      const action = createCategory.success(newCategory)

      // when
      const nextState = categoryReducer(state, action)

      // then
      expect(nextState).toEqual(expectedState)
    })

    test('stops fetching and stores error on create category failure', () => {
      // given
      const error = new Error()

      const state = createCategoryState({ fetching: true })
      const expectedState = createCategoryState({ fetching: false, error })

      const action = createCategory.failure(error)

      // when
      const nextState = categoryReducer(state, action)

      // then
      expect(nextState).toEqual(expectedState)
    })

    test('stops fetching on create category cancel', () => {
      // given
      const state = createCategoryState({ fetching: true })
      const expectedState = createCategoryState({ fetching: false })

      const action = createCategory.cancel()

      // when
      const nextState = categoryReducer(state, action)

      // then
      expect(nextState).toEqual(expectedState)
    })
  })

  describe('remove category', () => {
    test('starts fetching on remove category request', () => {
      // given
      const categoryId = createCategoryId(2)

      const state = createCategoryState({ fetching: false })
      const expectedState = createCategoryState({ fetching: true })

      const action = removeCategory.request(categoryId)

      // when
      const nextState = categoryReducer(state, action)

      // then
      expect(nextState).toEqual(expectedState)
    })

    test('stops fetching and deletes category with sub-categories on remove category success', () => {
      // given
      const parentCategoryId = createCategoryId(1)
      const categoryId = createCategoryId(2)
      const subCategoryId1 = createCategoryId(3)
      const subCategoryId2 = createCategoryId(4)
      const parentCategory: Category = {
        categoryId: parentCategoryId,
        name: 'existing-category-name',
        label: 'existing-category-label',
        subCategoryIds: [categoryId],
      }
      const category: Category = {
        categoryId: categoryId,
        name: 'existing-category-name',
        label: 'existing-category-label',
        parentCategoryId,
        subCategoryIds: [subCategoryId1, subCategoryId2],
      }
      const subCategory1: Category = {
        categoryId: categoryId,
        name: 'existing-category-name',
        label: 'existing-category-label',
        parentCategoryId: categoryId,
      }
      const subCategory2: Category = {
        categoryId: categoryId,
        name: 'existing-category-name',
        label: 'existing-category-label',
        parentCategoryId: categoryId,
      }

      const state = createCategoryState({
        fetching: true,
        categories: new Map([
          [parentCategoryId, parentCategory],
          [categoryId, category],
          [subCategoryId1, subCategory1],
          [subCategoryId2, subCategory2],
        ]),
      })
      const expectedState = createCategoryState({
        fetching: false,
        categories: new Map([[parentCategoryId, { ...parentCategory, subCategoryIds: undefined }]]),
      })

      const action = removeCategory.success(categoryId)

      // when
      const nextState = categoryReducer(state, action)

      // then
      expect(nextState).toEqual(expectedState)
    })

    test('stops fetching and stores error on remove category failure', () => {
      // given
      const error = new Error()

      const state = createCategoryState({ fetching: true })
      const expectedState = createCategoryState({ fetching: false, error })

      const action = removeCategory.failure(error)

      // when
      const nextState = categoryReducer(state, action)

      // then
      expect(nextState).toEqual(expectedState)
    })

    test('stops fetching on remove category cancel', () => {
      // given
      const state = createCategoryState({ fetching: true })
      const expectedState = createCategoryState({ fetching: false })

      const action = removeCategory.cancel()

      // when
      const nextState = categoryReducer(state, action)

      // then
      expect(nextState).toEqual(expectedState)
    })
  })

  describe('clear category error', () => {
    test('clears error on clear category error', () => {
      // given
      const error = new Error()

      const state = createCategoryState({ error })
      const expectedState = createCategoryState({ error: undefined })

      const action = clearCategoryError()

      // when
      const nextState = categoryReducer(state, action)

      // then
      expect(nextState).toEqual(expectedState)
    })
  })
})
