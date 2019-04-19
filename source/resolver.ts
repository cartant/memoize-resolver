/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/memoize-resolver
 */

export function createResolver<Args extends any[]>(
  selector: (...args: Args) => unknown[] = (...args) => args
): (...args: Args) => string {
  let counter = 0;
  const map = new WeakMap<object, string>();
  return (...args) =>
    selector(...args)
      .map(arg => {
        if (arg && /^(function|object)$/.test(typeof arg)) {
          let key = map.get(arg as object);
          if (!key) {
            key = `@${++counter}`;
            map.set(arg as object, key);
          }
          return key;
        }
        return JSON.stringify(arg);
      })
      .join(",");
}
