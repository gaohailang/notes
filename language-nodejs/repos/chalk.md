# Chalk
termail string styling doen right

colors.js is currently the most popular string styling module, but it has serious deficiencies like extending String.prototype which causes all kinds of problems. 

```js
var ansiStyles = require('ansi-styles');
var defineProps = Object.defineProperties;
var chalk = module.exports;

var styles = (function () {
    var ret = {};

    ansiStyles.grey = ansiStyles.gray;

    Object.keys(ansiStyles).forEach(function (key) {
        ret[key] = {
            get: function () {
                this._styles.push(key);
                return this;
            }
        };
    });

    return ret;
})();

function init() {
    var ret = {};

    Object.keys(styles).forEach(function (name) {
        ret[name] = {
            get: function () {
                var obj = defineProps(function self() {
                    var str = [].slice.call(arguments).join(' ');

                    if (!chalk.enabled) {
                        return str;
                    }

                    return self._styles.reduce(function (str, name) {
                        var code = ansiStyles[name];
                        return str ? code.open + str + code.close : '';
                    }, str);
                }, styles);

                obj._styles = [];

                return obj[name];
            }
        };
    });

    return ret;
}

defineProps(chalk, init());

```



```js
var colors = require('./colors');
console.log('i like cake and pies'.underline.red) // outputs red underlined tex
console.log('OMG Rainbows!'.rainbow); // rainbow (ignores spaces)
```

```js
var chalk = require('chalk');

// style a string
console.log(  chalk.blue('Hello world!')  );

// combine styled and normal strings
console.log(  chalk.blue('Hello'), 'World' + chalk.red('!')  );

// compose multiple styles using the chainable API
console.log(  chalk.blue.bgRed.bold('Hello world!')  );

// nest styles
console.log(  chalk.red('Hello', chalk.underline.bgBlue('world') + '!')  );

// pass in multiple arguments
console.log(  chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz')  );

// theme
var error = chalk.bold.red;
console.log(err('Error!'))

// take adavantage with console.log string substitubtion
console.log(chalk.green('hello %s'), name)
```