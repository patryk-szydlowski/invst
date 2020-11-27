import { Observable, of } from 'rxjs'

import { Category, CategoryCreation, CategoryId, CategoryService } from 'features/category/types'

export class InMemoryCategoryService implements CategoryService {
  private readonly categories: Map<CategoryId, Category> = new Map()
  private identifierCounter = 0

  constructor(categoriesToCreate?: CategoryCreation[]) {
    if (categoriesToCreate) {
      categoriesToCreate.forEach((categoryCreation) => this.addCategory(categoryCreation))
    }
  }

  getCategories(): Observable<Category[]> {
    return of(Array.from(this.categories.values()))
  }

  createCategory(categoryCreation: CategoryCreation): Observable<Category> {
    return of(this.addCategory(categoryCreation))
  }

  removeCategory(categoryId: CategoryId): Observable<void> {
    this.categories.delete(categoryId)
    return of(undefined)
  }

  private addCategory(categoryCreation: CategoryCreation): Category {
    const categoryId = this.identifierCounter as CategoryId
    const category: Category = { categoryId, ...categoryCreation }

    this.categories.set(categoryId, category)
    this.identifierCounter++

    return category
  }
}
