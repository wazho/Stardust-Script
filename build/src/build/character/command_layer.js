function CommandLayer() {
	this.OnCreate() ;
	return this ;
} // CommandLayer() 

// create container
CommandLayer.prototype.OnCreate = function() {
	this.box = new createjs.Container() ;
	this.box.x = 400, this.box.y = 0 ;
	this.bg = new createjs.Shape() ;
	this.bg.graphics.f( "#115599" ).r( 0, 0, 600, 550 ) ;
	this.box.addChild( this.bg ) ;

	sheet = Preload() ;

	this.box.addChild( Player1() ) ;
	this.box.addChild( Player3() ) ;
	this.box.addChild( Player4() ) ;
	this.box.addChild( Player2() ) ;

	function Player1() {
		var character = new createjs.Container() ;

		character.body = new createjs.Container() ;
		character.body.sprite = new createjs.Sprite( sheet.bodySpriteSheet ) ;
		character.body.regX = 125 / 2, character.body.regY = 125 ;
		character.body.x = 0, character.body.y = 125 ;

		character.body.addChild( character.body.sprite ) ;
		character.addChild( character.body ) ;

		character.hair = new createjs.Container() ;
		character.hair.sprite = new createjs.Sprite( sheet.hairSpriteSheet ) ;
		character.hair.regX = Math.ceil( 75 / 2 ), character.hair.regY = 75 ;
		character.hair.x = 0, character.hair.y = 60 ;

		character.hair.addChild( character.hair.sprite ) ;
		character.addChild( character.hair ) ;

		character.body.sprite.gotoAndPlay( "sit_A" ) ;
		character.hair.sprite.gotoAndPlay( "stable_B" ) ;
		character.hair.y += 27 ;

		character.x = 0, character.y = 0 ;
		character.scaleX = character.scaleY = 2 ;

		createjs.Tween.get( character.body, { loop: true } ).to( { scaleY: 0.97 }, 1500 ).to( { scaleY: 1 }, 1500 ) ;
		createjs.Tween.get( character.hair, { loop: true } ).to( { y: character.hair.y + 4 }, 1500 ).to( { y: character.hair.y }, 1500 ) ;
		createjs.Tween.get( character, { loop: true } ).wait( 1500 )
		.call( function() { character.body.sprite.gotoAndPlay( ( Math.random() > 0.5 ) ? "sit_A" : "sit_B" ) ; } )
		.call( function() { character.hair.sprite.gotoAndPlay( ( Math.random() > 0.5 ) ? "stable_A" : "stable_B" ) ; } ) ;

		return character ;
	} // Player1()

	function Player2() {
		var character = new createjs.Container() ;

		character.body = new createjs.Container() ;
		character.body.sprite = new createjs.Sprite( sheet.bodySpriteSheet ) ;
		character.body.regX = 125 / 2, character.body.regY = 125 ;
		character.body.x = 0, character.body.y = 125 ;

		character.body.addChild( character.body.sprite ) ;
		character.addChild( character.body ) ;

		character.hair = new createjs.Container() ;
		character.hair.sprite = new createjs.Sprite( sheet.hairSpriteSheet ) ;
		character.hair.regX = Math.ceil( 75 / 2 ), character.hair.regY = 75 ;
		character.hair.x = 0, character.hair.y = 60 ;

		character.hair.addChild( character.hair.sprite ) ;
		character.addChild( character.hair ) ;

		character.body.sprite.gotoAndPlay( "walk_C" ) ;
		character.hair.sprite.gotoAndPlay( "stable_C" ) ;

		character.x = 700, character.y = 350 ;
		character.scaleX = character.scaleY = 2 ;

		createjs.Tween.get( character.body, { loop: true } ).to( { scaleY: 0.97 }, 1500 ).to( { scaleY: 1 }, 1500 ) ;
		createjs.Tween.get( character.hair, { loop: true } ).to( { y: character.hair.y + 4 }, 1500 ).to( { y: character.hair.y }, 1500 ) ;
		createjs.Tween.get( character, { loop: true } ).to( { x: -500 }, 5000 ) ;

		return character ;
	} // Player2()

	function Player3() {
		var character = new createjs.Container() ;

		character.body = new createjs.Container() ;
		character.body.sprite = new createjs.Sprite( sheet.bodySpriteSheet ) ;
		character.body.regX = 125 / 2, character.body.regY = 125 ;
		character.body.x = 0, character.body.y = 125 ;

		character.body.addChild( character.body.sprite ) ;
		character.addChild( character.body ) ;

		character.hair = new createjs.Container() ;
		character.hair.sprite = new createjs.Sprite( sheet.hairSpriteSheet ) ;
		character.hair.regX = Math.ceil( 75 / 2 ), character.hair.regY = 75 ;
		character.hair.x = 0, character.hair.y = 60 ;

		character.hair.addChild( character.hair.sprite ) ;
		character.addChild( character.hair ) ;

		character.body.sprite.gotoAndPlay( "walk_C" ) ;
		character.hair.sprite.gotoAndPlay( "stable_C" ) ;

		character.x = -100, character.y = 0 ;
		character.scaleX = character.scaleY = 2 ;

		createjs.Tween.get( character.body, { loop: true } ).to( { scaleY: 0.97 }, 1500 ).to( { scaleY: 1 }, 1500 ) ;
		createjs.Tween.get( character.hair, { loop: true } ).to( { y: character.hair.y + 4 }, 1500 ).to( { y: character.hair.y }, 1500 ) ;
		createjs.Tween.get( character, { loop: true } )
		.call( function() { character.body.sprite.gotoAndPlay( "walk_C" ) ; } )
		.call( function() { character.hair.sprite.gotoAndPlay( "stable_C" ) ; } )
		.to( { x: -300 }, 2000 )
		.call( function() { character.body.sprite.gotoAndPlay( "walk_A" ) ; } )
		.call( function() { character.hair.sprite.gotoAndPlay( "stable_A" ) ; } )
		.to( { y: 150 }, 2000 )
		.call( function() { character.body.sprite.gotoAndPlay( "walk_C" ) ; } )
		.call( function() { character.hair.sprite.gotoAndPlay( "stable_C" ) ; } )
		.call( function() { character.scaleX *= -1 ; } )
		.to( { x: -100 }, 2000 )
		.call( function() { character.body.sprite.gotoAndPlay( "walk_E" ) ; } )
		.call( function() { character.hair.sprite.gotoAndPlay( "stable_E" ) ; } )
		.call( function() { character.scaleX *= -1 ; } )
		.to( { y: 0 }, 2000 ) ;

		return character ;
	} // Player3()

	function Player4() {
		var character = new createjs.Container() ;

		character.body = new createjs.Container() ;
		character.body.sprite = new createjs.Sprite( sheet.bodySpriteSheet ) ;
		character.body.regX = 125 / 2, character.body.regY = 125 ;
		character.body.x = 0, character.body.y = 125 ;

		character.body.addChild( character.body.sprite ) ;
		character.addChild( character.body ) ;

		character.hair = new createjs.Container() ;
		character.hair.sprite = new createjs.Sprite( sheet.hairSpriteSheet ) ;
		character.hair.regX = Math.ceil( 75 / 2 ), character.hair.regY = 75 ;
		character.hair.x = 0, character.hair.y = 60 ;

		character.hair.addChild( character.hair.sprite ) ;
		character.addChild( character.hair ) ;

		character.body.sprite.gotoAndPlay( "walk_C" ) ;
		character.hair.sprite.gotoAndPlay( "stable_C" ) ;

		character.x = 700, character.y = 0 ;
		character.scaleX = character.scaleY = 2 ;

		createjs.Tween.get( character.body, { loop: true } ).to( { scaleY: 0.97 }, 1500 ).to( { scaleY: 1 }, 1500 ) ;
		createjs.Tween.get( character.hair, { loop: true } ).to( { y: character.hair.y + 4 }, 1500 ).to( { y: character.hair.y }, 1500 ) ;
		createjs.Tween.get( character, { loop: true } )
		.call( function() { character.body.sprite.gotoAndPlay( "walk_B" ) ; } )
		.call( function() { character.hair.sprite.gotoAndPlay( "stable_B" ) ; } )
		.to( { x: 100, y: 200 }, 2000 )
		.call( function() { character.body.sprite.gotoAndPlay( "stand_A" ) ; } )
		.wait( 2000 )
		.call( function() { character.body.sprite.gotoAndPlay( "walk_E" ) ; } )
		.call( function() { character.hair.sprite.gotoAndPlay( "stable_E" ) ; } )
		.to( { y: 0 }, 2000 )
		.call( function() { character.body.sprite.gotoAndPlay( "stand_E" ) ; } )
		.wait( 500 )
		.call( function() { character.body.sprite.gotoAndPlay( "sit_A" ) ; } )
		.call( function() { character.hair.sprite.gotoAndPlay( "stable_B" ) ; } )
		.call( function() { character.hair.sprite.y += 27, character.scaleX *= -1 ; } )
		.wait( 2000 )
		.call( function() { character.body.sprite.gotoAndPlay( "stand_A" ) ; } )
		.call( function() { character.hair.sprite.gotoAndPlay( "stable_A" ) ; } )
		.call( function() { character.hair.sprite.y -= 27, character.scaleX *= -1 ; } )
		.wait( 500 )
		.call( function() { character.body.sprite.gotoAndPlay( "walk_B" ) ; } )
		.call( function() { character.hair.sprite.gotoAndPlay( "stable_B" ) ; } )
		.call( function() { character.scaleX *= -1 ; } )
		.to( { x: 700, y: 300 }, 2000 )
		.call( function() { character.scaleX *= -1 ; } ) ;

		return character ;
	} // Player4()

	function Preload() {
		var bodySpriteSheet = new createjs.SpriteSheet( {
			"images": ["pic/character/character_basic.png"],
			"frames": { "width": 125, "height": 125, "regX": 0, "regY": 0, "count": 62 },
			"animations": {
				"stand_A": { "frames": [0], "speed": 1 },
				"stand_B": { "frames": [1], "speed": 1 },
				"stand_C": { "frames": [2], "speed": 1 },
				"stand_D": { "frames": [3], "speed": 1 },
				"stand_E": { "frames": [4], "speed": 1 },
				"sit_A": { "frames": [9], "speed": 1 },
				"sit_B": { "frames": [10], "speed": 1 },
				"sit_C": { "frames": [11], "speed": 1 },
				"sit_D": { "frames": [12], "speed": 1 },
				"sit_E": { "frames": [13], "speed": 1 },
				"walk_A": { "frames": [18,19,20,21,22,23,24,25], "speed": 0.13 },
				"walk_B": { "frames": [27,28,29,30,31,32,33,34], "speed": 0.13 },
				"walk_C": { "frames": [36,37,38,39,40,41,42,43], "speed": 0.13 },
				"walk_D": { "frames": [45,46,47,48,49,50,51,52], "speed": 0.13 },
				"walk_E": { "frames": [54,55,56,57,58,59,60,61], "speed": 0.13 }
			}
		} ) ;
		
		var hairSpriteSheet = new createjs.SpriteSheet( {
			"images": ["pic/character/character_hair_basic.png"],
			"frames": { "width": 75, "height": 75, "regX": 0, "regY": 0, "count": 15 },
			"animations": {
				"stable_A": { "frames": [0], "speed": 1 },
				"stable_B": { "frames": [1], "speed": 1 },
				"stable_C": { "frames": [2], "speed": 1 },
				"stable_D": { "frames": [3], "speed": 1 },
				"stable_E": { "frames": [4], "speed": 1 }
			}
		} ) ;

		return { "bodySpriteSheet": bodySpriteSheet, "hairSpriteSheet": hairSpriteSheet } ;
	} // Preload

} // OnCreate()