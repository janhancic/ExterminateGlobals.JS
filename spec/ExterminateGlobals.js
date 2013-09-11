describe( 'ExterminateGlobals.JS', function() {

	it( 'has all the methods', function () {
		expect( window.ExterminateGlobals ).toBeDefined();
		expect( window.ExterminateGlobals.GlobalsCollector ).toBeDefined();
		expect( window.ExterminateGlobals.start ).toBeDefined();
		expect( window.ExterminateGlobals.stop ).toBeDefined();
		expect( window.ExterminateGlobals.collectMembers ).toBeUndefined();
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

		describe( 'startCollecting()', function () {
			it( 'todo', function () {
				expect( true ).toBe( true );
			} );
		} );

		describe( 'collect()', function () {
			it( 'todo', function () {
				expect( true ).toBe( true );
			} );
		} );

		describe( 'print()', function () {
			it( 'todo', function () {
				expect( true ).toBe( true );
			} );
		} );
	} );

	describe( 'convenience functions', function () {
		describe( 'start()', function () {
			it( 'todo', function () {
				expect( true ).toBe( true );
			} );
		} );

		describe( 'end()', function () {
			it( 'todo', function () {
				expect( true ).toBe( true );
			} );
		} );
	} );

} );