describe( 'ExterminateGlobals.JS', function() {

	beforeEach( function () {
	} );

	it( 'has all the methods', function () {
		expect( window.ExterminateGlobals ).toBeDefined();
		expect( window.ExterminateGlobals.GlobalsCollector ).toBeDefined();
		expect( window.ExterminateGlobals.start ).toBeDefined();
		expect( window.ExterminateGlobals.stop ).toBeDefined();
		expect( window.ExterminateGlobals.collectMembers ).toBeUndefined();
	} );

	// test getters
	// test startCollecting
	// test collect
	// test print
	// test start
	// test end

} );