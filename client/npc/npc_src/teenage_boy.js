var NPC_Function_teenage_boy = function( that ) {
	that.OnCutin( "npc_texture/teenage_boy_l.png", 1 ) ;

	var checkTime = 100 ;
	async.series([
		// One
		function( callback ) {
			that._dialogNext = false ;
			setTimeout( function() {
				that.OnDialog( { first: "Hi...", second: "Today is a good day." } ) ;
				callback( null, 'one' ) ;
			}, 0 ) ;
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