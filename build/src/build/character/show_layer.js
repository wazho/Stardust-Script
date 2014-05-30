function ShowLayer() {
	this.OnCreate() ;
	return this ;
} // ShowLayer() 

// create container
ShowLayer.prototype.OnCreate = function() {
	this.box = new createjs.Container() ;
	this.box.x = 0, this.box.y = 0 ;
	this.bg = new createjs.Shape() ;
	this.bg.graphics.f( "#AA0033" ).r( 0, 0, 400, 400 ) ;
	this.box.addChild( this.bg ) ;


} // OnCreate()