/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/memoize-resolver
 */

export function resolver(
    selector?: (args: unknown[]) => unknown[]
): (...args: unknown[]) => string {
    selector = selector || (args => args);
    let id = 0;
    const map = new WeakMap<object, number>();
    return (...args) => args.map(arg => {
        if (arg && /^(function|object)$/.test(typeof arg)) {
            let argId = map.get(arg as object);
            if (!argId) {
                argId = ++id;
                map.set(arg as object, argId);
            }
            return `@${argId}`;
        }
        return JSON.stringify(arg);
    }).join(",");
}
