import { Epic } from 'redux-observable'
import { Action } from 'typesafe-actions'

import { CategoryModule } from './module.types'
import { CategoryStateSlice } from './state.types'

export type CategoryEpic = Epic<Action, Action, CategoryStateSlice, CategoryModule>
