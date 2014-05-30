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


	this.character = new createjs.Container() ;
	this.character.head = new createjs.Shape() ;
	this.character.head.graphics.f( "#FFE7CD" )
	.mt(30,30).qt(30,0,45,0).lt(85,0).qt(100,0,100,30)
	.lt(100,40).qt(100,50,85,50).lt(40,50).qt(30,47,30,40)
	.qt(20,30,25,23).qt(33,22,30,30).cp() ;

	this.character.addChild( this.character.head ) ;


	this.character.x = 200, this.character.y = 200 ;
	this.character.scaleX = this.character.scaleY = 2 ;

	this.box.addChild( this.character ) ;


} // OnCreate()