window.ExterminateGlobals = (function () {
	var app = {},
		_monitorObject,
		_ignoreKeys;

	/**
	 * Start monitoring the `monitorObject` for unwanted globals.
	 * 
	 * @param {Object} monitorObject (optional) The object to monitor, 
	 *  defaults to `window`
	 * @param {Array} ignoreKeys (optional) A list of keys to ignore,
	 *  you would put your known globals here.
	 */
	app.start = function ( monitorObject, ignoreKeys ) {
		_monitorObject = monitorObject || window;
		_ignoreKeys = ignoreKeys || [];
	};

	/**
	 * Stops the monitoring and reports (to console) any found globals.
	 */
	app.stop = function () {

	};

	return app;
}() );