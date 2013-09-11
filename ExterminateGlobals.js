/**
 * A simple JS that helps you find unwanted globals.
 * @author Jan Hancic (@janhancic)
 * @copyright Jan Hancic 2013, released under the MIT 
 *  license.
 *  
 * @return {Object} The ExterminateGlobals.JS object.
 */
window.ExterminateGlobals = (function () {
	var egjs = {},
		helperGlobalCollector = null;

	/**
	 * Class that will 'monitor' an object for any unwanted globals 
	 *  that would get attached to the object between calls to the 
	 *  collect methods.
	 * @constructor
	 * @param {Array} ignoreKeys (optional) A list of keys to ignore,
	 *  you would put your known globals here.
	 * @param {Object} monitoredObject (optional) The object to monitor, 
	 *  defaults to `window`.
	 */
	var GlobalsCollector = function ( ignoreKeys, monitoredObject ) {
		this._ignoreKeys = ignoreKeys || [ 'ExterminateGlobals' ];
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
	 * @return {Array} A list of unwanted globals 
	 *  found on the monitored object. This is a 
	 *  list of member names (keys).
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
	 * @return {Object} Object that was passed to the 
	 *  constructor or `window` if none was provided.
	 */
	GlobalsCollector.prototype.getMonitoredObject = function () {
		return this._monitoredObject;
	};

	/**
	 * Returns the list of ignored members (keys) or 
	 *  'known globals'. The returned array will always 
	 *  contain at least one item: `ExterminateGlobals`.
	 * @return {Array} List of ignored keys.
	 */
	GlobalsCollector.prototype.getIgnoredKeys = function () {
		return this._ignoreKeys;
	};

	/**
	 * Uses the browser's console to output a report after 
	 *  the 'collection' process has finished.
	 */
	GlobalsCollector.prototype.print = function () {
		console.group( '==========> ExterminateGlobals.JS <==========' );

		console.log( 'Report for object: ', this._monitoredObject );

		if ( this._unwantedGlobals.length === 0 ) {
			console.info( 'No unwanted globals found! Nothing to exterminate :(' );
			console.groupEnd();
			return;
		}

		console.info( 'Found ' + this._unwantedGlobals.length + ' unwanted globals! Exterminate! Exterminate! Exterminate!' );

		console.info( 'List of unwanted globals:' );

		this._unwantedGlobals.forEach( function ( key ) {
			console.log( key + ':', this._monitoredObject[key] );
		}.bind( this ) );

		console.groupEnd();
	};

	/**
	 * This is a convenience function that will construct 
	 *  the `GlobalsCollector` class on your behalf and 
	 *  immediately start collecting the unwanted globals.
	 *
	 * @throws {Error} If this function is called before 
	 *  `stop()` is called (and `start()` was previously 
	 *  called).
	 */
	egjs.start = function ( ignoreKeys, monitoredObject ) {
		if ( helperGlobalCollector !== null ) {
			throw new Error( 'Globals collection already in progress. Call ExterminateGlobals.end() before calling ExterminateGlobals.start() again.' );
		}

		helperGlobalCollector = new GlobalsCollector( ignoreKeys, monitoredObject );
		helperGlobalCollector.startCollecting();
	};

	/**
	 * This is a convenience function that will stop the 
	 *  collection process and print out the report.
	 *
	 * @throws {Error} If this function is called before 
	 *  `start()` is.
	 */
	egjs.stop = function () {
		if ( helperGlobalCollector === null ) {
			throw new Error( 'Call ExterminateGlobals.start() before calling ExterminateGlobals.end().' );
		}

		helperGlobalCollector.collect();
		helperGlobalCollector.print();

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

	return egjs;
}() );
