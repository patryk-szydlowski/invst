import { Category, CategoryStateSlice } from 'features/category/types'
import { createCategoryId, createCategorySlice } from 'test/utils/category'

import {
  selectAllCategories,
  selectCategory,
  selectError,
  selectFetching,
  selectParentCategory,
  selectSubCategories,
} from './category.selectors'

describe('category selectors', () => {
  test('selects all categories', () => {
    // given
    const categoryId1 = createCategoryId(1)
    const categoryId2 = createCategoryId(2)
    const category1: Category = {
      categoryId: categoryId1,
      name: 'category-name-1',
      label: 'category-label-1',
    }
    const category2: Category = {
      categoryId: categoryId2,
      name: 'category-name-2',
      label: 'category-label-2',
    }
    const state = createCategorySlice({
      categories: new Map([
        [categoryId1, category1],
        [categoryId2, category2],
      ]),
    })

    // when
    const categories = selectAllCategories(state)

    // then
    expect(categories).toEqual([category1, category2])
  })

  test('selects category by id', () => {
    // given
    const categoryId = createCategoryId(1)
    const category: Category = {
      categoryId,
      name: 'category-name-1',
      label: 'category-label-1',
    }
    const state = createCategorySlice({
      categories: new Map([[categoryId, category]]),
    })

    // when
    const categoryOption = selectCategory(state)(categoryId)

    // then
    expect(categoryOption).toEqualSome(category)
  })

  test('selects parent category', () => {
    // given
    const parentCategoryId = createCategoryId(1)
    const categoryId = createCategoryId(2)
    const parentCategory: Category = {
      categoryId: parentCategoryId,
      name: 'parent-category-name',
      label: 'parent-category-label',
    }
    const category: Category = {
      categoryId,
      name: 'category-name',
      label: 'category-label',
      parentCategoryId,
    }
    const state: CategoryStateSlice = createCategorySlice({
      categories: new Map([
        [parentCategoryId, parentCategory],
        [categoryId, category],
      ]),
    })

    // when
    const parentCategoryOption = selectParentCategory(state)(category)

    // then
    expect(parentCategoryOption).toEqualSome(parentCategory)
  })

  test('selects sub-categories', () => {
    // given
    const categoryId = createCategoryId(1)
    const subCategoryId1 = createCategoryId(2)
    const subCategoryId2 = createCategoryId(3)
    const category: Category = {
      categoryId,
      name: 'category-name',
      label: 'category-label',
      subCategoryIds: [subCategoryId1, subCategoryId2],
    }
    const subCategory1: Category = {
      categoryId: subCategoryId1,
      name: 'sub-category-name-1',
      label: 'sub-category-label-1',
    }
    const subCategory2: Category = {
      categoryId: subCategoryId2,
      name: 'sub-category-name-2',
      label: 'sub-category-label-2',
    }
    const state = createCategorySlice({
      categories: new Map([
        [categoryId, category],
        [subCategoryId1, subCategory1],
        [subCategoryId2, subCategory2],
      ]),
    })

    // when
    const subCategoriesOption = selectSubCategories(state)(category)

    // then
    expect(subCategoriesOption).toEqualSome([subCategory1, subCategory2])
  })

  test('selects fetching', () => {
    // given
    const state = createCategorySlice({ fetching: true })

    // when
    const fetching = selectFetching(state)

    // then
    expect(fetching).toEqual(true)
  })

  test('selects error', () => {
    // given
    const error = new Error()
    const state = createCategorySlice({ error })

    // when
    const errorOption = selectError(state)

    // then
    expect(errorOption).toEqualSome(error)
  })
})
