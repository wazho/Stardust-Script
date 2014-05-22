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


} // OnCreate()