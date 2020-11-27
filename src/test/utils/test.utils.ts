import { ActionsObservable, StateObservable } from 'redux-observable'
import { Observable } from 'rxjs'
import { Opaque } from 'ts-opaque'
import { Action } from 'typesafe-actions'

export function actions<T extends Action>(action$: Observable<T>): ActionsObservable<T> {
  return action$ as ActionsObservable<T>
}

export function state<T>(state$: Observable<T>): StateObservable<T> {
  return state$ as StateObservable<T>
}

export function mockPartial<T>(full: T): (mock: Partial<T>) => T {
  return (mock) => ({ ...full, ...mock })
}

export function mockOpaque<K, T extends Opaque<K, unknown>>(): (value: K) => T {
  return (value) => value as T
}

export function mockSlice<T, S extends { [key: string]: T }>(
  key: keyof S,
  full: T,
): (mock: Partial<T>) => S {
  return (mock) => ({ [key]: mockPartial(full)(mock) } as S)
}
