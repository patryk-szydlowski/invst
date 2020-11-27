import { InMemoryCategoryService } from 'features/category/services'
import { CategoryModule } from 'features/category/types'

export function provideCategoryModule(): CategoryModule {
  const categoryService = new InMemoryCategoryService()

  return { categoryService }
}
