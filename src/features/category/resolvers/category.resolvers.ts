import { sequence } from 'fp-ts/Array'
import { flow } from 'fp-ts/function'
import { chain, fromNullable, map, option } from 'fp-ts/Option'

import {
  AllCategoriesResolver,
  Category,
  CategoryId,
  CategoryResolver,
  ParentCategoryResolver,
  SubCategoriesResolver,
} from 'features/category/types'

export const allCategoriesResolver: AllCategoriesResolver = (categories) =>
  Array.from(categories.values())

export const categoryResolver = (categories: Map<CategoryId, Category>): CategoryResolver =>
  flow(getCategory(categories), fromNullable)

export const parentCategoryResolver = (getCategoryById: CategoryResolver): ParentCategoryResolver =>
  flow(extractParentCategory, fromNullable, chain(getCategoryById))

export const subCategoriesResolver = (getCategoryById: CategoryResolver): SubCategoriesResolver =>
  flow(
    extractSubCategories,
    fromNullable,
    map(getSubCategories(getCategoryById)),
    chain(sequence(option)),
  )

const extractParentCategory = ({ parentCategoryId }: Category) => parentCategoryId

const extractSubCategories = ({ subCategoryIds }: Category) => subCategoryIds

const getSubCategories = (getCategoryById: CategoryResolver) => (subCategoryIds: CategoryId[]) =>
  subCategoryIds.map(getCategoryById)

const getCategory = (categories: Map<CategoryId, Category>) => (categoryId: CategoryId) =>
  categories.get(categoryId)
