function PreviewBox() {
	this.OnCreate() ;
	return this ;
} // PreviewBox() 

// create container
PreviewBox.prototype.OnCreate = function() {
	// Map preview box.
	this.box = new createjs.Container() ;
	this.box.x = 0, this.box.y = 0 ;
	this.box.bg = new createjs.Shape() ;
	this.box.bg.graphics.f( "#DDFFDD" ).r( 0, 0, 650, 550 ) ;
	this.box.addChild( this.box.bg ) ;
	// Map box.
	this.box.mapbox = new createjs.Container() ;
	this.box.mapbox.x = 37, this.box.mapbox.y = 50 ;
	this.box.mapbox.bg = new createjs.Shape() ;
	this.box.mapbox.bg.graphics.f( "#BBDDAA" ).r( 0, 0, 576, 448 ) ;
	this.box.mapbox.addChild( this.box.mapbox.bg ) ;
	this.OnTiledControl() ;

	this.box.addChild( this.box.mapbox ) ;
} // OnCreate()


PreviewBox.prototype.OnTiledControl = function() {
	var that = this ;
	var size = 64, length = 9, height = 7 ;
	var src = "pic/map/texture/" ;
	// Map box tiled.
	this.box.mapbox.tiled = new createjs.Container() ;
	this.box.mapbox.tiled.x = 0, this.box.mapbox.tiled.y = 0 ;
	this.box.mapbox.addChild( this.box.mapbox.tiled ) ;
	this.box.mapbox.tiled.pic = new createjs.Bitmap( src + "0.png" ) ;
	for ( i = 0 ; i < height ; i ++ )
		for ( j = 0 ; j < length ; j ++ ) {
			this.box.mapbox.tiled.pic.sourceRect = new createjs.Rectangle( 0, 0, size, size ) ;
			this.box.mapbox.tiled.pic.name = i * length + j ;
			this.box.mapbox.tiled.pic.x = j * size, this.box.mapbox.tiled.pic.y = i * size ;
			this.box.mapbox.tiled.addChild( this.box.mapbox.tiled.pic.clone( false ) ) ;
		} // for
	// Add listening event.
	for ( i = 0 ; i < length * height ; i ++ )
		this.box.mapbox.tiled.getChildAt( i ).on( "click", function( evt ) { Refresh( that, this ) ; } ) ;


	function Refresh( pt, tiled ) {
		console.log( tiled.name ) ;

		//tiled = new createjs.Bitmap( src + "1.png" ) ;
		tiled.sourceRect = new createjs.Rectangle( 64, 64, size, size ) ;

		// Refresh canvas.
		stage.update() ;
	} // Refresh()
} // OnTiledControl()