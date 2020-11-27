import { Eq, eqNumber as baseEq } from 'fp-ts/Eq'

export const eqNumber = <O extends number>(): Eq<O> => baseEq
