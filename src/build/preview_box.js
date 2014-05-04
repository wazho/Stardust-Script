function PreviewBox( material ) {
	this.OnCreate( material ) ;
	return this ;
} // PreviewBox() 

// create container
PreviewBox.prototype.OnCreate = function( material ) {
	// Map preview box.
	this.material = material ;
	this.box = new createjs.Container() ;
	this.box.x = 0, this.box.y = 0 ;
	this.box.bg = new createjs.Shape() ;
	this.box.bg.graphics.f( "#DDFFDD" ).r( 0, 0, 650, 550 ) ;
	this.box.addChild( this.box.bg ) ;
	// Map box.
	this.box.mapbox = new createjs.Container() ;
	this.box.mapbox.x = 37, this.box.mapbox.y = 70 ;
	this.box.mapbox.bg = new createjs.Shape() ;
	this.box.mapbox.bg.graphics.f( "#BBDDAA" ).r( 0, 0, 576, 448 ) ;
	this.box.mapbox.addChild( this.box.mapbox.bg ) ;
	this.OnTiledControl() ;
	// Map silde bar.
	this.box.bar = new createjs.Container() ;
	this.box.bar.horizontal = new createjs.Container() ;
	this.box.bar.horizontal.x = 37, this.box.bar.horizontal.y = 525 ;
	this.box.bar.vertical = new createjs.Container() ;
	this.box.bar.vertical.x = 620, this.box.bar.vertical.y = 70 ;
	this.box.bar.addChild( this.box.bar.horizontal, this.box.bar.vertical ) ;
	this.box.bar.horizontal.bg = new createjs.Shape() ;
	this.box.bar.horizontal.bg.graphics.f( "#88FFAA" ).r( 0, 0, 576, 12 ) ;
	this.box.bar.horizontal.addChild( this.box.bar.horizontal.bg ) ;
	this.box.bar.vertical.bg = new createjs.Shape() ;
	this.box.bar.vertical.bg.graphics.f( "#88FFAA" ).r( 0, 0, 12, 448 ) ;
	this.box.bar.vertical.addChild( this.box.bar.vertical.bg ) ;
	// Map editor tools.
	this.box.tool = new createjs.Container() ;
	this.box.tool.x = 37, this.box.tool.y = 15 ;
	this.box.tool.bg = new createjs.Shape() ;
	this.box.tool.bg.graphics.f( "#AAFFBB" ).r( 0, 0, 576, 40 ) ;
	this.box.tool.addChild( this.box.tool.bg ) ;
	// Add to top container.
	this.box.addChild( this.box.mapbox, this.box.bar, this.box.tool ) ;
} // OnCreate()

// 
PreviewBox.prototype.OnTiledControl = function() {
	var that = this ;
	var G = new GlobalValues() ;
	// Create tiled map data struct.
	var tiled = this.box.mapbox.tiled_data = OnCreateTiled( G.customer_length, G.customer_height ) ;

	for ( i = 0 ; i < G.customer_height ; i ++ )
		for ( j = 0 ; j < G.customer_length ; j ++ )
			console.log( "row:" + i + " column:" + j + "  map:" + tiled[i][j].map + "  index:" + tiled[i][j].index + "  walkable:" + tiled[i][j].walkable ) ;




	// Map box tiled.
	this.box.mapbox.tiled = new createjs.Container() ;
	this.box.mapbox.tiled.x = 0, this.box.mapbox.tiled.y = 0 ;
	this.box.mapbox.addChild( this.box.mapbox.tiled ) ;
	for ( i = 0 ; i < G.height ; i ++ )
		for ( j = 0 ; j < G.length ; j ++ ) {
			this.box.mapbox.tiled.single = new createjs.Container() ;
			this.box.mapbox.tiled.single.pic = new createjs.Bitmap( G.src + "0.png" ) ;
			this.box.mapbox.tiled.single.pic.sourceRect = new createjs.Rectangle( 0, 0, G.size, G.size ) ;
			this.box.mapbox.tiled.single.addChild( this.box.mapbox.tiled.single.pic ) ;
			this.box.mapbox.tiled.single.name = i * length + j ;
			this.box.mapbox.tiled.single.x = j * G.size, this.box.mapbox.tiled.single.y = i * G.size ;
			this.box.mapbox.tiled.addChild( this.box.mapbox.tiled.single.clone( true ) ) ;
		} // for
	// Add listening event.
	for ( i = 0 ; i < G.length * G.height ; i ++ )
		this.box.mapbox.tiled.getChildAt( i ).on( "click", function( evt ) { SingleRefresh( that, this ) ; } ) ;


	// Number of map : Math.floor( select / 100 )
	// Index of tiled : select - Math.floor( select / 100 ) * 100
	function SingleRefresh( pt, tiled ) {
		if ( pt.material.box.selector.statusPage == 1 ) {
			var select = pt.material.box.list.marked.name ;
			var map = Math.floor( select / 100 ) ;
			var index = select - Math.floor( ( select / 100 ) ) * 100 ;
			tiled.removeAllChildren() ;
			tiled.pic = new createjs.Bitmap( G.src + map + ".png" ) ;
			tiled.pic.sourceRect = new createjs.Rectangle( ( G.index % G.range ) * G.size, ( Math.floor( G.index / G.range ) ) * G.size, G.size, G.size ) ;
			tiled.addChild( tiled.pic ) ;
		} // if
		else if ( pt.material.box.selector.statusPage == 2 ) {

		} // else if
		else if ( pt.material.box.selector.statusPage == 3 ) {

		} // else if
		else if ( pt.material.box.selector.statusPage == 4 ) {

		} // else if
		else if ( pt.material.box.selector.statusPage == 5 ) {

		} // else if
	} // SingleRefresh()

	//
	function SildeControl( pt, tiled ) {




	} // SildeControl()

	// Create tiled map data struct.
	function OnCreateTiled( length, height ) {
		// Assign row number for array memory.
		var tiled = new Array( height ) ;
		// Assign column number for array memory.
		for ( i = 0 ; i < height ; i ++ )
			tiled[i] = new Array( length ) ;
		// Data structure created.
		for ( i = 0 ; i < height ; i ++ )
			for ( j = 0 ; j < length ; j ++ )
				tiled[i][j] = new Tiled_Datastruct() ;
		return tiled ;

		function Tiled_Datastruct() {
			this.map = 0 ;
			this.index = -1 ;
			this.walkable = 1 ;
		} // Tiled_Datastruct()
	} // OnCreateTiled()
} // OnTiledControl()