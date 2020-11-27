import { Observable } from 'rxjs'

import { Category, CategoryCreation, CategoryId } from './domain.types'

export type CategoryService = {
  getCategories(): Observable<Category[]>
  createCategory(categoryCreation: CategoryCreation): Observable<Category>
  removeCategory(categoryId: CategoryId): Observable<void>
}
