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
Include the `ExterminateGlobals.js` file in your HTML and call `ExterminateGlobals.start()` before any other JavaScript code gets included or executed. Then call `ExterminateGlobals.stop();` after all JavaScript has finished executing (you can off course do that manually, from the console). This will then generate a nice report in your browser's console:

![ExterminateGlobals.JS-in-action](https://raw.github.com/janhancic/ExterminateGlobals.JS/master/misc/readme_screenshot.png "ExterminateGlobals.JS in action")

After that start hunting down your unwanted globals and exterminate them.

### What if I have known globals?
Not to worry, the `ExterminateGlobals.start()`, as it's first argument, accepts an array of names (strings) of known globals which will get ignored when generating the report.

### Can I use this to monitor any other object?
Why off course, just pass the object you want to monitor as the second argument to `ExterminateGlobals.start()`.

## License
Licensed under MIT. See `LICENSE.md` file for details.