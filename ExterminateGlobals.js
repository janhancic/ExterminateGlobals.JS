/**
 * A simple JS that helps you find unwanted globals.
 * 
 * @return {Object} The ExterminateGlobals.JS object.
 */
window.ExterminateGlobals = (function () {
	var app = {},
		_monitorObject,
		_ignoreKeys,
		_startGlobals;

	/**
	 * Start monitoring the `monitorObject` for unwanted globals.
	 * 
	 * @param {Array} ignoreKeys (optional) A list of keys to ignore,
	 *  you would put your known globals here.
	 * @param {Object} monitorObject (optional) The object to monitor, 
	 *  defaults to `window`
	 */
	app.start = function ( ignoreKeys, monitorObject ) {
		_ignoreKeys = ignoreKeys || [ 'ExterminateGlobals' ];
		_monitorObject = monitorObject || window;

		if ( _ignoreKeys.indexOf( 'ExterminateGlobals' ) === -1 ) {
			_ignoreKeys.push( 'ExterminateGlobals' );
		}

		_startGlobals = _collectMembers();
	};

	/**
	 * Stops the monitoring and reports (to console) any found globals.
	 */
	app.stop = function () {
		var endGlobals = _collectMembers(),
			numOfUnknownGlobals = endGlobals.length - _startGlobals.length,
			unknownGlobals,
			tableData = [];

		console.group( '==========> ExterminateGlobals.JS <==========' );

		if ( numOfUnknownGlobals === 0 ) {
			console.info( 'No unknown globals found! Nothing to exterminate :(' );
			console.groupEnd();
			return;
		}

		console.info( 'Found ' + numOfUnknownGlobals + ' unknown globals! Exterminate! Exterminate! Exterminate!' );

		unknownGlobals = endGlobals.filter( function ( key ) {
			if ( _startGlobals.indexOf( key ) === -1 )  {
				return true; // a unknown global found!
			} else {
				return false;
			}
		} );

		console.info( '' );
		console.info( 'List of unknown globals: ' + unknownGlobals.join( ', ' ) );

		console.groupEnd();
	};

	/** @private */
	function _collectMembers () {
		var memberKeys = Object.keys( _monitorObject );

		memberKeys = memberKeys.filter( function ( key ) {
			if (_ignoreKeys.indexOf( key ) === -1 ) {
				return true;
			} else {
				return false; // ignore this member as it's a know global
			}
		} );

		return memberKeys;
	};

	return app;
}() );