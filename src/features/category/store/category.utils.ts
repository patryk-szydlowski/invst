import * as A from 'fp-ts/Array'
import * as M from 'fp-ts/Map'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/pipeable'

import { Transformation } from 'common/types'
import { eqNumber } from 'common/utils'
import { Category, CategoryId } from 'features/category/types'

export function insertCategory(category: Category): Transformation<Map<CategoryId, Category>> {
  return (categories) =>
    M.insertAt(eqNumber<CategoryId>())(category.categoryId, category)(categories)
}

export function removeCategoryById(
  categoryId: CategoryId,
): Transformation<Map<CategoryId, Category>> {
  return (categories) =>
    pipe(
      O.fromNullable(categories.get(categoryId)),
      O.map((category) =>
        pipe(
          categories,
          removeCategoryFromParentSubCategories(category),
          removeCategoryAndSubCategories(category),
        ),
      ),
      O.getOrElse(() => categories),
    )
}

function removeCategoryFromParentSubCategories({
  categoryId,
  parentCategoryId,
}: Category): Transformation<Map<CategoryId, Category>> {
  return (categories) => {
    const eq = eqNumber<CategoryId>()
    const parentCategoryOption = pipe(
      O.fromNullable(parentCategoryId),
      O.chain((id) => O.fromNullable(categories.get(id))),
      O.map(({ subCategoryIds, ...parentCategory }) => ({
        ...parentCategory,
        subCategoryIds: pipe(
          O.fromNullable(subCategoryIds),
          O.map(A.filter((id) => !eq.equals(id, categoryId))),
          O.filter(A.isNonEmpty),
          O.getOrElse<CategoryId[] | undefined>(() => undefined),
        ),
      })),
    )

    return O.fold(
      () => categories,
      (category: Category) => M.insertAt(eq)(category.categoryId, category)(categories),
    )(parentCategoryOption)
  }
}

function removeCategoryAndSubCategories({
  categoryId,
  subCategoryIds,
}: Category): Transformation<Map<CategoryId, Category>> {
  return (categories) =>
    A.reduce(deleteCategory(categories, categoryId), deleteCategory)(subCategoryIds ?? [])
}

function deleteCategory(acc: Map<CategoryId, Category>, id: CategoryId): Map<CategoryId, Category> {
  return M.deleteAt(eqNumber<CategoryId>())(id)(acc)
}
