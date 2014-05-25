var NPC_Function_sage = function( that ) {
	that.OnTalk( that.container.name + ": God will bless you and me." ) ;
	that.OnCutin( "npc_texture/sage_l.png", 1 ) ;

	var checkTime = 100 ;
	async.series([
		// One
		function( callback ) {
			that._dialogNext = false ;
			setTimeout( function() {
				that.OnDialog( { first: "Hello." } ) ;
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
						that.OnDialog( { second: "Nice to meet you." } ) ;
					} // if
					else
						Loop( checkTime ) ;
				}, checkTime ) ;
			} // Loop()
			callback( null, 'two' ) ;
		},
		// Three
		function( callback ) {
			Loop( checkTime ) ;

			function Loop( checkTime ) {
				setTimeout( function() {
					if ( that._dialogNext ) {
						that._dialogNext = false ;
						that.OnDialog( { third: "其實我會說中文。" } ) ;
					} // if
					else
						Loop( checkTime ) ;
				}, checkTime ) ;
			} // Loop()
			callback( null, 'three' ) ;
		},
		// Four
		function( callback ) {
			Loop( checkTime ) ;

			function Loop( checkTime ) {
				setTimeout( function() {
					if ( that._dialogNext ) {
						that.OnWalk( { x: that.container.grid_x, y: that.container.grid_y + 1 } ) ;
					} // if
					else
						Loop( checkTime ) ;
				}, checkTime ) ;
			} // Loop()
			callback( null, 'four' ) ;
		},
		// Five
		function( callback ) {
			Loop( checkTime ) ;

			function Loop( checkTime ) {
				setTimeout( function() {
					if ( that._dialogNext ) {
						that._dialogNext = false ;
						that.OnDialog( { third: "I'm walking down one grid." } ) ;
					} // if
					else
						Loop( checkTime ) ;
				}, checkTime ) ;
			} // Loop()
			callback( null, 'five' ) ;
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