import { Option } from 'fp-ts/Option'

import { Category, CategoryId } from './domain.types'

export type AllCategoriesResolver = (categories: Map<CategoryId, Category>) => Category[]
export type CategoryResolver = (categoryId: CategoryId) => Option<Category>
export type ParentCategoryResolver = (category: Category) => Option<Category>
export type SubCategoriesResolver = (category: Category) => Option<Category[]>
