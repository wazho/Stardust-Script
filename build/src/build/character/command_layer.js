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


	// this.character.head.graphics.f( "#FFE7CD" )
	// .mt(30,30).qt(30,0,45,0).lt(85,0).qt(100,0,100,30)
	// .lt(100,40).qt(100,50,85,50).lt(40,50).qt(30,47,30,40)
	// .qt(20,30,25,23).qt(33,22,30,30).cp() ;


	this.character = new createjs.Container() ;
	this.character.body = new createjs.Container() ;
	this.character.body.head = new createjs.Container() ;
	this.character.body.head.head = new createjs.Shape() ;
	this.character.body.head.eyes = new createjs.Shape() ;
	this.character.body.head.mouth = new createjs.Shape() ;

	this.character.body.head.head.graphics.f("#FFFFFF").s("#000000").dc(30,30,15) ;

	this.character.body.head.eyes.graphics.f("#000000").r(26,26,2,5) ;
	this.character.body.head.eyes.graphics.f("#000000").r(39,26,2,5) ;

	this.character.body.head.mouth.graphics.s("#000000")
	.mt(27,37).qt(32,42,39,38) ;


	this.character.body.head.addChild( this.character.body.head.head, this.character.body.head.eyes, this.character.body.head.mouth ) ;






	this.character.body.addChild( this.character.body.head ) ;

	this.character.addChild( this.character.body ) ;



	createjs.Tween.get( this.character.body.head, { loop: true } ).to( { rotation: 3 }, 500 ).to( { rotation: 0 }, 500 ) ;


	this.character.x = 200, this.character.y = 200 ;
	this.character.scaleX = this.character.scaleY = 2 ;






	this.box.addChild( this.character ) ;


} // OnCreate()