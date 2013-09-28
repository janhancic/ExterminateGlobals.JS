describe( 'ExterminateGlobals.JS', function() {

	beforeEach( function () {
		ExterminateGlobals.resetConvenienceFunctions();
	} );

	it( 'has all the methods', function () {
		expect( window.ExterminateGlobals ).toBeDefined();
		expect( window.ExterminateGlobals.GlobalsCollector ).toBeDefined();
		expect( window.ExterminateGlobals.startCollecting ).toBeDefined();
		expect( window.ExterminateGlobals.collect ).toBeDefined();
		expect( window.ExterminateGlobals.collectMembers ).toBeUndefined();
		// this will be only present in test mode
		expect( window.ExterminateGlobals.getHelperGlobalCollector ).toBeDefined();
		expect( window.ExterminateGlobals.setHelperGlobalCollector ).toBeDefined();
		expect( window.ExterminateGlobals.resetConvenienceFunctions ).toBeDefined();
	} );

	describe( 'GlobalsCollector', function () {
		describe( 'constructor', function () {
			it( 'adds "ExterminateGlobals" to the list of ignored keys', function () {
				var gc = new ExterminateGlobals.GlobalsCollector();

				expect( gc._ignoreKeys ).toEqual( [ 'ExterminateGlobals'] );
			} );

			it( 'creates a copy of ignored globals', function () {
				var ignoreKeys = [ 'ExterminateGlobals', 'foo' ];
				var gc = new ExterminateGlobals.GlobalsCollector( ignoreKeys );

				expect( gc._ignoreKeys ).not.toBe( ignoreKeys );
			} );
		} );

		describe( 'Getters', function () {
			it( 'getMonitoredObject() gets the correct monitored object', function () {
				var monitoredObject = { foo: 'bar' };
				var gc = new ExterminateGlobals.GlobalsCollector( [], monitoredObject );

				expect( gc.getMonitoredObject() ).toBe( monitoredObject );
			} );

			describe( 'getIgnoredKeys()', function () {
				it( 'gets the correct ignored keys', function () {
					var gc = new ExterminateGlobals.GlobalsCollector( [ 'foo', 'bar' ] );

					expect( gc.getIgnoredKeys() ).toEqual( [ 'foo', 'bar', 'ExterminateGlobals' ] );
				} );

				it( 'returns a copy of the list', function () {
					var dummyIgnored = [ 'foo', 'bar' ];
					var gc = new ExterminateGlobals.GlobalsCollector();
					gc._ignoreKeys = dummyIgnored;

					var returnedIgnored = gc.getIgnoredKeys();
					returnedIgnored.push( 'baz' );

					expect( gc.getIgnoredKeys() ).not.toBe( dummyIgnored );
				} );
			} );

			describe( 'getUnwantedGlobals()', function () {
				it( 'gets an empty array before collecting', function () {
					var gc = new ExterminateGlobals.GlobalsCollector();

					expect( gc.getUnwantedGlobals() ).toEqual( [] );
				} );

				it( 'returns a copy of the list', function () {
					var dummyUnwanted = [ 'foo', 'bar' ];
					var gc = new ExterminateGlobals.GlobalsCollector();
					gc._unwantedGlobals = dummyUnwanted;

					var returnedGlobals = gc.getUnwantedGlobals();
					returnedGlobals.push( 'baz' );

					expect( gc.getUnwantedGlobals() ).not.toBe( dummyUnwanted );
				} );
			} );
		} );

		describe( 'startCollecting() & collect()', function () {
			it( 'reports the globals correctly', function () {
				var target = { foo: 'bar' };
				var gc = new ExterminateGlobals.GlobalsCollector( [], target );
				gc.startCollecting();

				target.bla = 'fla';

				var collected = gc.collect();

				expect( collected ).toEqual( [ 'bla' ] );

			} );

			it( 'returns empty array if no unwanted globals', function () {
				var target = { foo: 'bar' };
				var gc = new ExterminateGlobals.GlobalsCollector( [], target );
				gc.startCollecting();

				var collected = gc.collect();

				expect( collected ).toEqual( [] );

			} );
		} );
	} );

	describe( 'convenience functions', function () {
		describe( 'startCollecting()', function () {
			it( 'creates a new instance of GlobalsCollector', function () {
				ExterminateGlobals.startCollecting();
				var res = ExterminateGlobals.getHelperGlobalCollector() instanceof ExterminateGlobals.GlobalsCollector;
				expect( res ).toBe( true );
			} );

			it( 'throws Error if called at inappropriate time', function () {
				ExterminateGlobals.startCollecting();
				expect( ExterminateGlobals.startCollecting ).toThrow();
			} );
		} );

		describe( 'collect()', function () {
			it( 'resets helper', function () {
				ExterminateGlobals.startCollecting();
				ExterminateGlobals.collect();
				expect( ExterminateGlobals.getHelperGlobalCollector() ).toBeNull();
			} );

			it( 'throws Error if called at inappropriate time', function () {
				expect( ExterminateGlobals.collect ).toThrow();
			} );
		} );
	} );

} );