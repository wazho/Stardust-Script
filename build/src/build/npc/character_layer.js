function CharacterLayer() {
	this.OnCreate() ;
	return this ;
} // CharacterLayer() 

// create container
CharacterLayer.prototype.OnCreate = function() {
	this.box = new createjs.Container() ;
	this.box.x = 0, this.box.y = 400 ;
	this.bg = new createjs.Shape() ;
	this.bg.graphics.f( "#22AA33" ).r( 0, 0, 400, 150 ) ;
	this.box.addChild( this.bg ) ;


} // OnCreate()