function PreviewBox() {
	this.OnCreate() ;
	return this ;
} // PreviewBox() 

// create container
PreviewBox.prototype.OnCreate = function() {
	// map preview box
	this.box = new createjs.Container() ;
	this.box.x = 0, this.box.y = 0 ;
	this.box.bg = new createjs.Shape() ;
	this.box.bg.graphics.beginFill( "#DDFFDD" ).drawRect( 0, 0, 650, 550 ) ;
	this.box.addChild( this.box.bg ) ;
	// map box
	this.box.mapbox = new createjs.Shape() ;
	this.box.mapbox.x = 50, this.box.mapbox.y = 50 ;
	this.box.mapbox.graphics.beginFill( "#BBDDAA" ).drawRect( 0, 0, 550, 450 ) ;
	this.box.addChild( this.box.mapbox ) ;
} // OnCreate()