/* eslint-disable jest/expect-expect */
import { switchMap } from 'rxjs/operators'
import { marbles } from 'rxjs-marbles'

import { Category, CategoryCreation } from 'features/category/types'
import { createCategoryId } from 'test/utils/category'

import { InMemoryCategoryService } from './in-memory.category-service'

describe('in memory category service', () => {
  test(
    'gets all categories created during initialization',
    marbles((context) => {
      // given
      const categoriesToCreate: CategoryCreation[] = [
        {
          name: 'category-name-1',
          label: 'category-label-1',
        },
        {
          name: 'category-name-2',
          label: 'category-label-2',
        },
        {
          name: 'category-name-3',
          label: 'category-label-3',
        },
      ]
      const expectedCategories: Category[] = categoriesToCreate.map((category, index) => ({
        categoryId: createCategoryId(index),
        ...category,
      }))

      const categoryService = new InMemoryCategoryService(categoriesToCreate)

      // when
      const categories = categoryService.getCategories()

      // then
      context.expect(categories).toBeObservable(context.cold('(a|)', { a: expectedCategories }))
    }),
  )

  test(
    'gets stored categories after category creation',
    marbles((context) => {
      // given
      const categoryToCreate: CategoryCreation = {
        name: 'category-name',
        label: 'category-label',
      }

      const expectedCategories: Category[] = [
        { categoryId: createCategoryId(0), ...categoryToCreate },
      ]

      const categoryService = new InMemoryCategoryService()

      // when
      const categoriesAfterCreation = categoryService
        .createCategory(categoryToCreate)
        .pipe(switchMap(() => categoryService.getCategories()))

      // then
      context
        .expect(categoriesAfterCreation)
        .toBeObservable(context.cold('(a|)', { a: expectedCategories }))
    }),
  )

  test(
    'gets stored categories after category removal',
    marbles((context) => {
      // given
      const categoryId = createCategoryId(0)
      const createdCategory: CategoryCreation = {
        name: 'category-name',
        label: 'category-label',
      }

      const categoryService = new InMemoryCategoryService([createdCategory])

      // when
      const categoriesAfterCreation = categoryService
        .removeCategory(categoryId)
        .pipe(switchMap(() => categoryService.getCategories()))

      // then
      context.expect(categoriesAfterCreation).toBeObservable(context.cold('(a|)', { a: [] }))
    }),
  )
})
