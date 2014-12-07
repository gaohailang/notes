## module 'util'.
Use require('util') to access them.

util.format(format, [...])#
Returns a formatted string using the first argument as a printf-like format.
extra arguments are converted to strings with util.inspect() and these strings are concatenated, delimited by a space.

```js
util.format('%s:%s', 'foo', 'bar', 'baz'); // 'foo:bar baz'
```

util.log(string)#
Output with timestamp on stdout.

util.inspect(object, [options])#
Return a string representation of object, which is useful for debugging.

```js
console.log(util.inspect(util, {colors: true, depth: 5}));
```
