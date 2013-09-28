/**
 * A simple JS that helps you find unwanted globals.
 * @author Jan Hancic (@janhancic)
 * @copyright Jan Hancic 2013, released under the MIT license.
 * @version 2.0.0
 *  
 * @return {Object} The ExterminateGlobals.JS object.
 */
window.ExterminateGlobals = (function () {
	var egjs = {},
		helperGlobalCollector = null,
		testMode = false;

	if ( window.ExterminateGlobals != null && window.ExterminateGlobals.TEST_MODE ) {
		testMode = true;
	}

	/**
	 * Print the full report including variable contents.
	 */
	egjs.PRINT_FULL = 'full';

	/**
	 * Don't print variable contents, just a list of unwanted globals.
	 */
	egjs.PRINT_COMPACT = 'compatc';

	/**
	 * Class that will 'monitor' an object for any unwanted globals that would get attached to the object between calls 
	 *  to the collect methods.
	 * @constructor
	 * @param {Array} ignoreKeys (optional) A list of keys to ignore, you would put your known globals here.
	 * @param {Object} monitoredObject (optional) The object to monitor, defaults to `window`.
	 */
	var GlobalsCollector = function ( ignoreKeys, monitoredObject ) {
		if ( ignoreKeys != null ) {
			this._ignoreKeys = ignoreKeys.slice();
		} else {
			this._ignoreKeys = [];
		}

		this._monitoredObject = monitoredObject || window;

		if ( this._ignoreKeys.indexOf( 'ExterminateGlobals' ) === -1 ) {
			this._ignoreKeys.push( 'ExterminateGlobals' );
		}

		this._startGlobals = [];
		this._unwantedGlobals = [];
	};

	/**
	 * Starts the 'collection' process.
	 */
	GlobalsCollector.prototype.startCollecting = function () {
		this._startGlobals = [];
		this._unwantedGlobals = [];

		this._startGlobals = collectMembers( this._ignoreKeys, this._monitoredObject );
	};

	/**
	 * Stops the 'collection' process.
	 * @return {Array} A list of unwanted globals found on the monitored object. This is a list of member names (keys).
	 */
	GlobalsCollector.prototype.collect = function () {
		var endGlobals = collectMembers( this._ignoreKeys, this._monitoredObject ),
			numOfUnwantedGlobals = endGlobals.length - this._startGlobals.length;

		if ( numOfUnwantedGlobals === 0 ) {
			return [];
		}

		this._unwantedGlobals = endGlobals.filter( function ( key ) {
			if ( this._startGlobals.indexOf( key ) === -1 )  {
				return true; // a unwanted global found!
			} else {
				return false;
			}
		}.bind( this ) );

		return this._unwantedGlobals;
	};

	/**
	 * Returns the object that this instance is monitoring.
	 * @return {Object} Object that was passed to the constructor or `window` if none was provided.
	 */
	GlobalsCollector.prototype.getMonitoredObject = function () {
		return this._monitoredObject;
	};

	/**
	 * Returns the list of ignored members (keys) or 'known globals'. The returned array will always contain at least 
	 *  one item: `ExterminateGlobals`.
	 * @return {Array} List of ignored keys.
	 */
	GlobalsCollector.prototype.getIgnoredKeys = function () {
		return this._ignoreKeys.slice();
	};

	/**
	 * Returns the collected list of unwanted globals.
	 * @return {Array} List of unwanted globals.
	 */
	GlobalsCollector.prototype.getUnwantedGlobals = function () {
		return this._unwantedGlobals.slice();
	};

	/**
	 * Uses the browser's console to output a report after the 'collection' process has finished.
	 * @param {String} printMode How to print the unwanted globals. Possible values are `ExterminateGlobals.PRINT_FULL` 
	 *  (default) or `ExterminateGlobals.PRINT_COMPACT`.
	 */
	GlobalsCollector.prototype.print = function ( printMode ) {
		printMode = printMode || egjs.PRINT_FULL;

		console.group( '==========> ExterminateGlobals.JS <==========' );

		console.log( 'Report for object: ', this._monitoredObject );

		if ( this._unwantedGlobals.length === 0 ) {
			console.info( 'No unwanted globals found! Nothing to exterminate :(' );
			console.groupEnd();
			return;
		}

		console.info(
			'Found ' + this._unwantedGlobals.length + ' unwanted globals! Exterminate! Exterminate! Exterminate!'
		);

		console.info( 'List of unwanted globals:' );

		this._unwantedGlobals.forEach( function ( key ) {
			if ( printMode === egjs.PRINT_FULL) {
				console.log( key + ':', this._monitoredObject[key] );
			} else {
				console.log( key );
			}
		}.bind( this ) );

		console.groupEnd();
	};

	/**
	 * This is a convenience function that will construct the `GlobalsCollector` class on your behalf and immediately 
	 *  start collecting the unwanted globals.
	 * 
	 * @throws {Error} If this function is called before `ExterminateGlobals.collect()` is called (and 
	 *  `ExterminateGlobals.startCollecting()` was previously called).
	 */
	egjs.startCollecting = function ( ignoreKeys, monitoredObject ) {
		if ( helperGlobalCollector !== null ) {
			var errorMsg = 'Globals collection already in progress. Call ExterminateGlobals.collect() before calling ';
			errorMsg += 'ExterminateGlobals.startCollecting() again.'
			throw new Error( errorMsg );
		}

		helperGlobalCollector = new GlobalsCollector( ignoreKeys, monitoredObject );
		helperGlobalCollector.startCollecting();
	};

	/**
	 * This is a convenience function that will stop the collection process and print out the report.
	 * @param {String} printMode Optional print mode to use.
	 * @throws {Error} If this function is called before `ExterminateGlobals.startCollecting()` is.
	 */
	egjs.collect = function ( printMode ) {
		if ( helperGlobalCollector === null ) {
			throw new Error( 'Call ExterminateGlobals.startCollecting() before calling ExterminateGlobals.collect().' );
		}

		helperGlobalCollector.collect();
		helperGlobalCollector.print( printMode );

		helperGlobalCollector = null;
	};

	/** @private */
	function collectMembers ( ignoreKeys, monitoredObject ) {
		var memberKeys = Object.keys( monitoredObject );

		memberKeys = memberKeys.filter( function ( key ) {
			if ( ignoreKeys.indexOf( key ) === -1 ) {
				return true;
			} else {
				return false; // ignore this member as it's a know global
			}
		} );

		return memberKeys;
	};

	egjs.GlobalsCollector = GlobalsCollector;

	if ( testMode === true ) {
		egjs.getHelperGlobalCollector = function () {
			return helperGlobalCollector;
		};

		egjs.setHelperGlobalCollector = function ( newValue ) {
			helperGlobalCollector = newValue;
		};

		egjs.resetConvenienceFunctions = function () {
			helperGlobalCollector = null;
		};
	}

	return egjs;
}() );
