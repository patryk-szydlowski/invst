import { Opaque } from 'ts-opaque'

export type CategoryId = Opaque<number, Category>

export type Category = {
  categoryId: CategoryId
  name: string
  label: string
  parentCategoryId?: CategoryId
  subCategoryIds?: CategoryId[]
}

export type CategoryCreation = {
  name: string
  label: string
  parentCategoryId?: CategoryId
}
