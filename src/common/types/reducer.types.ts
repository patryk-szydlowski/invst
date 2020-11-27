import { PayloadAction, TypeConstant } from 'typesafe-actions'

export type Reducer<S, P> = <T extends TypeConstant>(state: S, action: PayloadAction<T, P>) => S
