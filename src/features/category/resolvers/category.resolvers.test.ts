import { Category } from 'features/category/types'
import { createCategoryId } from 'test/utils/category'

import {
  allCategoriesResolver,
  categoryResolver,
  parentCategoryResolver,
  subCategoriesResolver,
} from './category.resolvers'

describe('category resolvers', () => {
  describe('all categories resolver', () => {
    test('returns all categories', () => {
      // given
      const categoryId = createCategoryId(1)
      const category: Category = {
        categoryId,
        name: 'category-name',
        label: 'category-label',
      }
      const categoriesMap = new Map([[categoryId, category]])

      // when
      const categories = allCategoriesResolver(categoriesMap)

      // then
      expect(categories).toEqual([category])
    })
  })

  describe('category resolver', () => {
    test('returns option containing an existing category when category exists by id', () => {
      // given
      const categoryId = createCategoryId(1)
      const category: Category = {
        categoryId,
        name: 'category-name',
        label: 'category-label',
      }
      const categories = new Map([[categoryId, category]])
      const resolver = categoryResolver(categories)

      // when
      const categoryOption = resolver(categoryId)

      // then
      expect(categoryOption).toEqualSome(category)
    })

    test('returns empty option when category does not exist by id', () => {
      // given
      const existingCategoryId = createCategoryId(1)
      const nonExistingCategoryId = createCategoryId(2)
      const existingCategory: Category = {
        categoryId: existingCategoryId,
        name: 'category-name',
        label: 'category-label',
      }
      const categories = new Map([[existingCategoryId, existingCategory]])
      const resolver = categoryResolver(categories)

      // when
      const categoryOption = resolver(nonExistingCategoryId)

      // then
      expect(categoryOption).toBeNone()
    })
  })

  describe('parent category resolver', () => {
    test('returns option containing parent category when parent category exists by id', () => {
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
      const categories = new Map([
        [parentCategoryId, parentCategory],
        [categoryId, category],
      ])
      const resolver = parentCategoryResolver(categoryResolver(categories))

      // when
      const parentCategoryOption = resolver(category)

      // then
      expect(parentCategoryOption).toEqualSome(parentCategory)
    })

    test('returns empty option when parent category does not exist by id', () => {
      // given
      const parentCategoryId = createCategoryId(1)
      const categoryId = createCategoryId(2)
      const category: Category = {
        categoryId,
        name: 'category-name',
        label: 'category-label',
        parentCategoryId,
      }
      const categories = new Map([[categoryId, category]])
      const resolver = parentCategoryResolver(categoryResolver(categories))

      // when
      const parentCategoryOption = resolver(category)

      // then
      expect(parentCategoryOption).toBeNone()
    })

    test('returns empty option when category has no parent category', () => {
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
      }
      const categories = new Map([
        [parentCategoryId, parentCategory],
        [categoryId, category],
      ])
      const resolver = parentCategoryResolver(categoryResolver(categories))

      // when
      const parentCategoryOption = resolver(category)

      // then
      expect(parentCategoryOption).toBeNone()
    })
  })

  describe('sub categories resolver', () => {
    test('returns option containing sub-categories when sub-categories exist by id', () => {
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
      const categories = new Map([
        [categoryId, category],
        [subCategoryId1, subCategory1],
        [subCategoryId2, subCategory2],
      ])
      const resolver = subCategoriesResolver(categoryResolver(categories))

      // when
      const subCategoriesOption = resolver(category)

      // then
      expect(subCategoriesOption).toEqualSome([subCategory1, subCategory2])
    })

    test('returns empty option when not every sub-category exists by id', () => {
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
      const categories = new Map([
        [categoryId, category],
        [subCategoryId1, subCategory1],
      ])
      const resolver = subCategoriesResolver(categoryResolver(categories))

      // when
      const subCategoriesOption = resolver(category)

      // then
      expect(subCategoriesOption).toBeNone()
    })

    test('returns empty option when category has no sub-categories', () => {
      // given
      const categoryId = createCategoryId(1)
      const subCategoryId1 = createCategoryId(2)
      const subCategoryId2 = createCategoryId(3)
      const category: Category = {
        categoryId,
        name: 'category-name',
        label: 'category-label',
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
      const categories = new Map([
        [categoryId, category],
        [subCategoryId1, subCategory1],
        [subCategoryId2, subCategory2],
      ])
      const resolver = subCategoriesResolver(categoryResolver(categories))

      // when
      const subCategoriesOption = resolver(category)

      // then
      expect(subCategoriesOption).toBeNone()
    })
  })
})
