/**
 * A simple JS that helps you find unwanted globals.
 * 
 * @return {Object} The ExterminateGlobals.JS object.
 */
window.ExterminateGlobals = (function () {
	var egjs = {},
		helperGlobalCollector = null;

	var GlobalsCollector = function ( ignoreKeys, monitoredObject ) {
		this._ignoreKeys = ignoreKeys || [ 'ExterminateGlobals' ];
		this._monitoredObject = monitoredObject || window;

		if ( this._ignoreKeys.indexOf( 'ExterminateGlobals' ) === -1 ) {
			this._ignoreKeys.push( 'ExterminateGlobals' );
		}

		this._startGlobals = [];
	};

	GlobalsCollector.prototype.startCollecting = function () {
		this._startGlobals = collectMembers( this._ignoreKeys, this._monitoredObject );
	};

	GlobalsCollector.prototype.collect = function () {
		var endGlobals = collectMembers( this._ignoreKeys, this._monitoredObject ),
			numOfUnknownGlobals = endGlobals.length - this._startGlobals.length,
			unknownGlobals;

		if ( numOfUnknownGlobals === 0 ) {
			return [];
		}

		unknownGlobals = endGlobals.filter( function ( key ) {
			if ( this._startGlobals.indexOf( key ) === -1 )  {
				return true; // a unknown global found!
			} else {
				return false;
			}
		}.bind( this ) );

		return unknownGlobals;
	};

	GlobalsCollector.prototype.getMonitoredObject = function () {
		return this._monitoredObject;
	};

	GlobalsCollector.prototype.getIgnoredKeys = function () {
		return this._ignoreKeys;
	};

	GlobalsCollector.print = function ( collectedGlobals, monitoredObject ) {
		console.group( '==========> ExterminateGlobals.JS <==========' );

		console.log( 'Report for object: ', monitoredObject );

		if ( collectedGlobals.length === 0 ) {
			console.info( 'No unknown globals found! Nothing to exterminate :(' );
			console.groupEnd();
			return;
		}

		console.info( 'Found ' + collectedGlobals.length + ' unknown globals! Exterminate! Exterminate! Exterminate!' );

		console.info( 'List of unknown globals:' );

		collectedGlobals.forEach( function ( key ) {
			console.log( key + ':', monitoredObject[key] );
		} );

		console.groupEnd();
	};

	/**
	 * Start monitoring the `monitorObject` for unwanted globals.
	 * 
	 * @param {Array} ignoreKeys (optional) A list of keys to ignore,
	 *  you would put your known globals here.
	 * @param {Object} monitorObject (optional) The object to monitor, 
	 *  defaults to `window`
	 */
	egjs.start = function ( ignoreKeys, monitoredObject ) {
		if ( helperGlobalCollector !== null ) {
			throw new Error( 'Globals collection already in progress. Call ExterminateGlobals.end() before calling ExterminateGlobals.start() again.' );
		}

		helperGlobalCollector = new GlobalsCollector( ignoreKeys, monitoredObject );
		helperGlobalCollector.startCollecting();
	};

	/**
	 * Stops the monitoring and reports (to console) any found globals.
	 */
	egjs.stop = function () {
		if ( helperGlobalCollector === null ) {
			throw new Error( 'Call ExterminateGlobals.start() before calling ExterminateGlobals.end().' );
		}

		var collectedGlobals = helperGlobalCollector.collect();

		GlobalsCollector.print( collectedGlobals, helperGlobalCollector.getMonitoredObject() );

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