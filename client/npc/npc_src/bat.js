var NPC_Function_bat = function( that ) {
	that.OnTalk( that.container.name + ": You click me." ) ;

	var checkTime = 100 ;
	async.series([
		// One
		function( callback ) {
			that._dialogNext = false ;
			setTimeout( function() {
				that.OnDialog( { first: "Welcome to the world.", second: "You can along this road,", third: "then you will see the village." } ) ;
				callback( null, 'one' ) ;
			}, 0 ) ;
		},
		// Two
		function( callback ) {
			Loop( checkTime ) ;

			function Loop( checkTime ) {
				setTimeout( function() {
					if ( that._dialogNext ) {
						that._dialogNext = false ;
						that.OnDialog( { first: "I must go now, see you." } ) ;
					} // if
					else
						Loop( checkTime ) ;
				}, checkTime ) ;
			} // Loop()
			callback( null, 'two' ) ;
		},
		// Four
		function( callback ) {
			Loop( checkTime ) ;

			function Loop( checkTime ) {
				setTimeout( function() {
					if ( that._dialogNext ) {
						that.OnWalk( { x: that.container.grid_x - 10, y: that.container.grid_y - 5 } ) ;
					} // if
					else
						Loop( checkTime ) ;
				}, checkTime ) ;
			} // Loop()
			callback( null, 'four' ) ;
		},
		// Good bye
		function( callback ) {
			Loop( checkTime ) ;

			function Loop( checkTime ) {
				setTimeout( function() {
					if ( that._dialogNext ) {
						that._dialogNext = false ;
						that.triggerInit() ;
					} // if
					else
						Loop( checkTime ) ;
				}, checkTime ) ;
			} // Loop()
			callback( null, 'end' ) ;
		}
	], function( err, results ) {
		console.log( "callback: " + results + " (" + err + ")" ) ;
	});
} // Function()