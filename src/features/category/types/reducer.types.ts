import { Reducer } from 'common/types'

import { CategoryState } from './state.types'

export type CategoryReducer<A> = Reducer<CategoryState, A>
