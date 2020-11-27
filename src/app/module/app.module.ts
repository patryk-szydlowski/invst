import { provideCategoryModule } from 'features/category/module'
import { CategoryModule } from 'features/category/types'

type AppModule = CategoryModule

export function provideAppModule(): AppModule {
  const categoryModule = provideCategoryModule()

  return {
    ...categoryModule,
  }
}
