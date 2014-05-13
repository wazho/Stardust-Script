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

	return effectContainer ;

	function RandomRange( range ) { return Math.random() * range ; }
	function RandomTime( base, time ) { return base + Math.random() * time ; }
} // LightEffect()