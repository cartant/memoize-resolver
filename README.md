# memoize-resolver

## What is it?

`memoize-resolver` is a general-purpose key resolver for use with a `memoize` implementation like the one in [Lodash](https://lodash.com/docs/#memoize).

## Why might you need it?

When you memoize a function that receives multiple arguments, by default only the first argument is used as the cache key.

The key resolver implemented in `memoize-resolver` will create a key that's generated from all of the arguments received by the memoized function.

# Install

Install the package using NPM:

```
npm install memoize-resolver --save
```

And import the function for use with TypeScript or ES2015:

```js
import { createResolver } from "memoize-resolver";
```

# Usage

To obtain a resolver that will create a key based upon each argument passed to the memoized function, call `createResolver` without arguments:

```js
const search = (center, distance) => { /* something expensive */ };
const resolver = createResolver();
const memoizedSearch = _.memoize(search, resolver);
```

To obtain a resolver that creates a key based upon a subset of the arguments passed to the memoized function, call `createResolver` and pass a selector:

```js
const search = (options) => { /* something expensive */ };
const resolver = createResolver(options => [options.center, options.distance]);
const memoizedSearch = _.memoize(search, resolver);
```

Here, the key will be based only on the `center` and `distance` properties, so repeated calls to `memoizedSearch({ center: 0, distance: 1 })` will return the memoized result - despite each call receiving a different object literal instance.