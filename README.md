                        Exterminate Globals!
                       /
                  ___
          D>=G==='   '.
                |======|
                |======|
            )--/]IIIIII]
               |_______|
               C O O O D
              C O  O  O D
             C  O  O  O  D
             C__O__O__O__D
            [_____________]

# ExterminateGlobals.JS
Quickly discover if your JS code is leaking any unwanted globals (we all miss a `var` now and then).

## How to use
Include the `ExterminateGlobals.js` file in your HTML and call `ExterminateGlobals.startCollecting()` before any other JavaScript code gets included or executed. Then call `ExterminateGlobals.collect();` after all JavaScript has finished executing (you can of course do that manually, from the console). This will then generate a nice report in your browser's console:

![ExterminateGlobals.JS-in-action](https://raw.github.com/janhancic/ExterminateGlobals.JS/master/misc/readme_screenshot.png "ExterminateGlobals.JS in action")

After that start hunting down your unwanted globals and exterminate them.

### What if I have known globals?
Not to worry, the `ExterminateGlobals.startCollecting()`, as its first argument, accepts an array of names (strings) of known globals which will be ignored when generating the report.

### Can I use this to monitor any other object?
Why of course, just pass the object you want to monitor as the second argument to `ExterminateGlobals.startCollecting()`.

## Advanced usage
Besides `startCollecting()` and `collect()` the `ExterminateGlobals` also contains a constructor function `GlobalsCollector` (which the convenience functions startCollecting&collect use internally). This means you can monitor multiple objects at the same time or just obtain the list of unwanted globals as an array instead of printing everything out to the console.

Usage example:

```javascript
var globalsCollector = new ExterminateGlobals.GlobalsCollector( ['$', 'jQuery'], myObject);
globalsCollector.startCollecting();
// your code here
var unwantedGlobals = globalsCollector.collect();
globalsCollector.print(); // pass ExterminateGlobals.PRINT_COMPACT for more compact report
```

Look at the `ExterminateGlobals.js` file for full API documentation.

## Tests
[Jasmine](http://pivotal.github.io/jasmine/) is used for testing. To run the tests just load the `SpecRunner.html` file in your browser.

## Test report
Tests pass in the following browsers:
- Google Chrome v31.0.1636.0 dev, OS X
- Apple Safari v6.0.5, OS X
- Mozilla Firefox v24.0, OS X

## License
Licensed under MIT. See `LICENSE.md` file for details.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/janhancic/exterminateglobals.js/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
