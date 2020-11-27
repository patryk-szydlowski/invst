/* eslint-disable @typescript-eslint/no-explicit-any,no-extend-native,@typescript-eslint/ban-ts-comment */

export const composeWithDevtools = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

export function configureDevtools(): void {
  if (composeWithDevtools) {
    // @ts-ignore
    Map.prototype.toJSON = function () {
      const obj: any = {}
      this.forEach((value, key) => (obj[key] = value))
      return obj
    }
  }
}
