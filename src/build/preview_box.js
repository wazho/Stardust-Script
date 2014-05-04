function PreviewBox( material ) {
	this.OnCreate( material ) ;
	return this ;
} // PreviewBox() 

// create container
PreviewBox.prototype.OnCreate = function( material ) {
	var that = this ;
	this.material = material ;
	// Map preview box.
	this.box = new createjs.Container() ;
	this.box.x = 0, this.box.y = 0 ;
	this.box.bg = new createjs.Bitmap( "pic/map_build/background.jpg" ) ;
	this.box.logo = new createjs.Bitmap( "pic/map_build/logo.png" ) ;
	this.box.logo.x = 15, this.box.logo.y = 15 ;
	this.box.addChild( this.box.bg, this.box.logo ) ;
	// Map box and silde bar.
	this.box.mapbox = new createjs.Container() ;
	this.box.mapbox.x = 37, this.box.mapbox.y = 70 ;
	this.box.bar = new createjs.Container() ;
	this.OnTiledControl() ;
	// Map editor tools.
	this.box.tool = new createjs.Container() ;
	this.box.tool.x = 15, this.box.tool.y = 15 ;
	// Add to top container.
	this.box.addChild( this.box.mapbox, this.box.bar, this.box.tool ) ;
} // OnCreate()

// 
PreviewBox.prototype.OnTiledControl = function() {
	var that = this ;
	var G = new GlobalValues() ;
	// Create tiled map data struct.
	var tiled = this.box.mapbox.tiled_data = OnCreateTiled( G.customer_length, G.customer_height ) ;
	// Map box container.
	this.box.mapbox.bg = new createjs.Shape() ;
	this.box.mapbox.bg.graphics.f( "#FFFFFF" ).r( 0, 0, 576, 448 ) ;
	this.box.mapbox.addChild( this.box.mapbox.bg ) ;
	// Map box tiled.
	this.box.mapbox.tiled = new createjs.Container() ;
	this.box.mapbox.tiled.x = 0, this.box.mapbox.tiled.y = 0 ;
	this.box.mapbox.tiled.mr = 0, this.box.mapbox.tiled.mc = 0 ;
	this.box.mapbox.addChild( this.box.mapbox.tiled ) ;
	// Modify row, column for silde tiled map.
	TotalRefresh( this, 0, 0 ) ;
	// Slide bar create.
	this.box.bar.horizontal = new createjs.Container() ;
	this.box.bar.horizontal.x = 37, this.box.bar.horizontal.y = 525 ;
	this.box.bar.vertical = new createjs.Container() ;
	this.box.bar.vertical.x = 620, this.box.bar.vertical.y = 70 ;
	this.box.bar.addChild( this.box.bar.horizontal, this.box.bar.vertical ) ;
	this.box.bar.horizontal.bg = new createjs.Shape() ;
	this.box.bar.horizontal.bg.graphics.f( "#88FFAA" ).r( 0, 0, 576, 12 ) ;
	this.box.bar.horizontal.left = new createjs.Shape() ;
	this.box.bar.horizontal.left.graphics.f( "#FF0000" ).dc( 8, 5, 13 ) ;
	this.box.bar.horizontal.right = new createjs.Shape() ;
	this.box.bar.horizontal.right.graphics.f( "#FF0000" ).dc( 570, 5, 13 ) ;
	this.box.bar.horizontal.addChild( this.box.bar.horizontal.bg, this.box.bar.horizontal.left, this.box.bar.horizontal.right ) ;
	this.box.bar.vertical.bg = new createjs.Shape() ;
	this.box.bar.vertical.bg.graphics.f( "#88FFAA" ).r( 0, 0, 12, 448 ) ;
	this.box.bar.vertical.up = new createjs.Shape() ;
	this.box.bar.vertical.up.graphics.f( "#FF0000" ).dc( 6, 7, 13 ) ;
	this.box.bar.vertical.down = new createjs.Shape() ;
	this.box.bar.vertical.down.graphics.f( "#FF0000" ).dc( 6, 438, 13 ) ;
	this.box.bar.vertical.addChild( this.box.bar.vertical.bg, this.box.bar.vertical.up, this.box.bar.vertical.down ) ;
	// Add listening events.
	this.box.bar.horizontal.left.on( "click", function( evt ) { TotalRefresh( that, that.box.mapbox.tiled.mr, that.box.mapbox.tiled.mc - 1 ) ; } ) ;
	this.box.bar.horizontal.right.on( "click", function( evt ) { TotalRefresh( that, that.box.mapbox.tiled.mr, that.box.mapbox.tiled.mc + 1 ) ; } ) ;
	this.box.bar.vertical.up.on( "click", function( evt ) { TotalRefresh( that, that.box.mapbox.tiled.mr - 1, that.box.mapbox.tiled.mc ) ; } ) ;
	this.box.bar.vertical.down.on( "click", function( evt ) { TotalRefresh( that, that.box.mapbox.tiled.mr + 1, that.box.mapbox.tiled.mc ) ; } ) ;
	// [Special] button - material box listening event added.
	this.material.box.selector.buttonA.on( "click", function( evt ) { TotalRefresh( that, that.box.mapbox.tiled.mr, that.box.mapbox.tiled.mc ) ; } ) ;
	this.material.box.selector.buttonB.on( "click", function( evt ) { TotalRefresh( that, that.box.mapbox.tiled.mr, that.box.mapbox.tiled.mc ) ; } ) ;
	this.material.box.selector.buttonC.on( "click", function( evt ) { TotalRefresh( that, that.box.mapbox.tiled.mr, that.box.mapbox.tiled.mc ) ; } ) ;
	this.material.box.selector.buttonD.on( "click", function( evt ) { TotalRefresh( that, that.box.mapbox.tiled.mr, that.box.mapbox.tiled.mc ) ; } ) ;
	this.material.box.selector.buttonE.on( "click", function( evt ) { TotalRefresh( that, that.box.mapbox.tiled.mr, that.box.mapbox.tiled.mc ) ; } ) ;
	this.material.box.selector.buttonF.on( "click", function( evt ) { TotalRefresh( that, that.box.mapbox.tiled.mr, that.box.mapbox.tiled.mc ) ; } ) ;

	// Replace all of this map box.
	function TotalRefresh( pt, mr, mc ) {
		if ( mr >= G.customer_height || mc >= G.customer_length || mr < 0 || mc < 0 )
		 	return ;
		// Initial must remove old tiled map.
		pt.box.mapbox.tiled.removeAllChildren() ;
		pt.box.mapbox.tiled.mr = mr, pt.box.mapbox.tiled.mc = mc ;
		for ( i = 0 ; i < G.height ; i ++ )
			for ( j = 0 ; j < G.length ; j ++ ) {
				if ( ( i + mr ) < G.customer_height && ( j + mc ) < G.customer_length ) {
					var data = tiled[i+mr][j+mc] ;
					var row = Math.floor( data.index / G.range ) ;
					var column = data.index % G.range ;
					pt.box.mapbox.tiled.single = new createjs.Container() ;
					pt.box.mapbox.tiled.single.pic = new createjs.Bitmap( G.src + data.map + ".png" ) ;
					pt.box.mapbox.tiled.single.pic.sourceRect = new createjs.Rectangle( column * G.size, row * G.size, G.size, G.size ) ;
					// Mask for walkable / unwalkable.
					pt.box.mapbox.tiled.single.mask = new createjs.Shape() ;
					if ( data.walkable == 1 )
						pt.box.mapbox.tiled.single.mask.graphics.f( "#00FF00" ).r( 0, 0, G.size, G.size ) ;
					else
						pt.box.mapbox.tiled.single.mask.graphics.f( "#FF0000" ).r( 0, 0, G.size, G.size ) ;
					pt.box.mapbox.tiled.single.mask.alpha = 0.2 ;
					pt.box.mapbox.tiled.single.mask.visible = ( pt.material.box.selector.statusPage == 2 ) ? true : false ;
					// Add to container.
					pt.box.mapbox.tiled.single.addChild( pt.box.mapbox.tiled.single.pic, pt.box.mapbox.tiled.single.mask ) ;
					pt.box.mapbox.tiled.single.name = i * G.length + j ;
					pt.box.mapbox.tiled.single.x = j * G.size, pt.box.mapbox.tiled.single.y = i * G.size ;
					pt.box.mapbox.tiled.addChild( pt.box.mapbox.tiled.single.clone( true ) ) ;
				} // if
			} // for
		// Add listening event.
		for ( i = 0 ; i < pt.box.mapbox.tiled.getNumChildren() ; i ++ )
			pt.box.mapbox.tiled.getChildAt( i ).on( "click", function( evt ) { SingleRefresh( pt, this ) ; } ) ;
	} // TotalRefresh()

	// Focus one tiled, let it replace new one.
	function SingleRefresh( pt, singleTiled ) {
		// Get sileded tiled map data.
		var select = pt.material.box.list.marked.name ;
		var row = Math.floor( singleTiled.name / G.length ) + pt.box.mapbox.tiled.mr ;
		var column = ( singleTiled.name % G.length ) + pt.box.mapbox.tiled.mc ;
		if ( pt.material.box.selector.statusPage == 1 ) {
			var map = Math.floor( select / 100 ) ;
			var index = select - Math.floor( ( select / 100 ) ) * 100 ;
			// tilde map assign.
			tiled[row][column].map = map ;
			tiled[row][column].index = index ;
		} // if
		else if ( pt.material.box.selector.statusPage == 2 ) {
			if ( select == "walkable" )
				tiled[row][column].walkable = 1 ;
			else if ( select == "unwalkable" )
				tiled[row][column].walkable = 0 ;
		} // else if
		else if ( pt.material.box.selector.statusPage == 3 ) {

		} // else if
		else if ( pt.material.box.selector.statusPage == 4 ) {

		} // else if
		else if ( pt.material.box.selector.statusPage == 5 ) {

		} // else if
		// Redraw.
		TotalRefresh( pt, pt.box.mapbox.tiled.mr, pt.box.mapbox.tiled.mc ) ;
	} // SingleRefresh()

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
			this.index = 0 ;
			this.walkable = 1 ;
		} // Tiled_Datastruct()
	} // OnCreateTiled()
} // OnTiledControl()
