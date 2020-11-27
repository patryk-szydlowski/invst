import { combineEpics, Epic } from 'redux-observable'

import { categoryEpics } from 'features/category/store'

export const appEpic: Epic = combineEpics(...categoryEpics)
