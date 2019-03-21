/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/memoize-resolver
 */

export function createResolver(
    selector: (...args: any[]) => unknown[] = (...args) => args
): (...args: any[]) => string {
    let lastId = 0;
    const map = new WeakMap<object, number>();
    return (...args) => selector(...args).map(arg => {
        if (arg && /^(function|object)$/.test(typeof arg)) {
            let argId = map.get(arg as object);
            if (!argId) {
                argId = ++lastId;
                map.set(arg as object, argId);
            }
            return `@${argId}`;
        }
        return JSON.stringify(arg);
    }).join(",");
}
