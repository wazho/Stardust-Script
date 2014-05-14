function LightEffect( effect_num ) {
	var effectContainer = new createjs.Container() ;
	if ( effect_num == 1 ) {
		effectContainer.regX = 150, effectContainer.regY = 100 ;
		effectContainer.setBounds( 0, 0, 300, 200 ) ;
		for ( i = 0 ; i < 30 ; i ++ ) {
			var grain = new createjs.Shape() ;
			grain.graphics.f( "#FFFFFF" ).drawPolyStar( 0, 0, 10, 10, 0.6, -90 ) ;
			effectContainer.addChild( grain ) ;
			grain.x = 150, grain.y = 0 ;
			grain.alpha = 0 ;
			createjs.Tween.get( grain, { loop: true } )
			.wait( RandomTime( 200, 2000 ) )
			.to( { alpha: 0.5 }, 0 )
			.to( { x: RandomRange( 300 ), y: 200, alpha: 0, rotation: 360 }, 2000 ) ;
		} // for
	} // if
	else if ( effect_num == 2 ) {
		effectContainer.regX = 100, effectContainer.regY = 100 ;
		effectContainer.setBounds( 0, 0, 200, 200 ) ;
		for ( i = 0 ; i < 15 ; i ++ ) {
			var grain = new createjs.Shape() ;
			grain.graphics.f( "#FFFFFF" ).drawPolyStar( 0, 0, 10, 10, 0.6, -90 ) ;
			effectContainer.addChild( grain ) ;
			grain.x = RandomRange( 200 ), grain.y = 0 ;
			grain.alpha = 0 ;
			createjs.Tween.get( grain, { loop: true } )
			.wait( RandomTime( 200, 2000 ) )
			.to( { alpha: 0.5 }, 0 )
			.to( { y: 200, alpha: 0, rotation: 360 }, 2000 ) ;
		} // for
	} // else if
	else if ( effect_num == 3 ) {
		effectContainer.regX = 50, effectContainer.regY = 100 ;
		effectContainer.setBounds( 0, 0, 100, 200 ) ;
		for ( i = 0 ; i < 75 ; i ++ ) {
			var grain = new createjs.Shape() ;
			grain.graphics.f( "#FFFFFF" ).r( 0, 0, 1, 12 ) ;
			effectContainer.addChild( grain ) ;
			grain.x = RandomRange( 100 ), grain.y = 0 ;
			grain.alpha = 0 ;
			createjs.Tween.get( grain, { loop: true } )
			.wait( RandomTime( 200, 2000 ) )
			.to( { alpha: 0.7 }, 0 )
			.to( { y: 200, alpha: 0.3 }, 2000 ) ;
		} // for
	} // else if
	else if ( effect_num == 4 ) {
		effectContainer.regX = 60, effectContainer.regY = 15 ;
		effectContainer.setBounds( 0, 0, 120, 30 ) ;
		for ( i = 0 ; i < 85 ; i ++ ) {
			var grain = new createjs.Shape() ;
			grain.graphics.f( "#FFFFFF" ).r( 0, 0, 1, 4 ) ;
			effectContainer.addChild( grain ) ;
			grain.x = RandomRange( 120 ), grain.y = 30 ;
			grain.alpha = 0 ;
			createjs.Tween.get( grain, { loop: true } )
			.wait( RandomTime( 200, 1200 ) )
			.to( { alpha: 0.7 }, 0 )
			.to( { y: 0, alpha: 0.3, rotation: 720 }, 1200 ) ;
		} // for
	} // else if

	return effectContainer ;

	function RandomRange( range ) { return Math.random() * range ; }
	function RandomTime( base, time ) { return base + Math.random() * time ; }
} // LightEffect()