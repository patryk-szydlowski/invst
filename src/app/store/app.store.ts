import { applyMiddleware, compose, createStore as createReduxStore, Store } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import { provideAppModule as createAppModule } from 'app/module'

import { composeWithDevtools, configureDevtools } from './app.devtools'
import { appEpic } from './app.epic'
import { appReducer } from './app.reducer'

export function createStore(): Store {
  const appModule = createAppModule()

  const composeEnhancers = composeWithDevtools || compose
  configureDevtools()

  const epicMiddleware = createEpicMiddleware({
    dependencies: appModule,
  })

  const enhancers = composeEnhancers(applyMiddleware(epicMiddleware))

  const store = createReduxStore(appReducer, enhancers)

  epicMiddleware.run(appEpic)

  return store
}
