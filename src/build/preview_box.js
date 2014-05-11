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
	this.box.bg = new createjs.Bitmap( "pic/map_build/background.png" ) ;
	this.box.logo = new createjs.Bitmap( "pic/map_build/logo.png" ) ;
	this.box.logo.x = 15, this.box.logo.y = 15 ;
	// Map box and silde bar.
	this.box.mapbox = new createjs.Container() ;
	this.box.mapbox.x = 37, this.box.mapbox.y = 70 ;
	this.box.bar = new createjs.Container() ;
	this.OnTiledControl() ;
	// Map editor tools.
	this.box.tool = new createjs.Container() ;
	this.box.tool.x = 525, this.box.tool.y = 22 ;
	this.box.tool.backward = new createjs.Bitmap( "pic/map_build/movement_a.png" ) ;
	this.box.tool.backward.scaleX = this.box.tool.backward.scaleY = 0.3 ;
	this.box.tool.backward.x = 0, this.box.tool.backward.y = 0 ;
	this.box.tool.forward = new createjs.Bitmap( "pic/map_build/movement_b.png" ) ;
	this.box.tool.forward.scaleX = this.box.tool.forward.scaleY = 0.3 ;
	this.box.tool.forward.x = 50, this.box.tool.forward.y = 0 ;
	this.box.tool.addChild( this.box.tool.backward, this.box.tool.forward ) ;
	// Add to top container.
	this.box.addChild( this.box.mapbox, this.box.bg, this.box.logo, this.box.bar, this.box.tool ) ;
} // OnCreate()

// 
PreviewBox.prototype.OnTiledControl = function() {
	var that = this ;
	// Create tiled map data struct.
	this.box.mapbox.tiled_data = OnCreateTiled( G.customer_length, G.customer_height ) ;
	// Map box container.
	this.box.mapbox.bg = new createjs.Shape() ;
	this.box.mapbox.bg.graphics.f( "#FFFFFF" ).r( 0, 0, G.size * G.length, G.size * G.height ) ;
	this.box.mapbox.addChild( this.box.mapbox.bg ) ;
	// Map box tiled.
	this.box.mapbox.tiled = new createjs.Container() ;
	this.box.mapbox.tiled.x = 0, this.box.mapbox.tiled.y = 0 ;
	this.box.mapbox.tiled.mr = 0, this.box.mapbox.tiled.mc = 0 ;
	this.box.mapbox.addChild( this.box.mapbox.tiled ) ;




	// Create onjects map data struct.
	this.box.mapbox.object_data = new Array() ;




	// Map box objects.
	this.box.mapbox.objects = new createjs.Container() ;
	this.box.mapbox.objects.visible = false ;
	this.box.mapbox.addChild( this.box.mapbox.objects ) ;
	this.box.mapbox.objects.bg = new createjs.Shape() ;
	this.box.mapbox.objects.bg.graphics.f( "#0000FF" ).r( G.size * G.length / 2, G.size * G.height / 2, G.size * G.length, G.size * G.height ) ;
	this.box.mapbox.objects.bg.regX = G.size * G.length / 2, this.box.mapbox.objects.bg.regY = G.size * G.height / 2 ;
	this.box.mapbox.objects.bg.alpha = 0.1 ;
	this.box.mapbox.objects.addChild( this.box.mapbox.objects.bg ) ;
	// Objects listening events.
	this.box.mapbox.objects.bg.on( "dblclick", function( evt ) { OnCreateObject( evt ) } ) ;
	// Modify row, column for silde tiled map.
	TotalRefresh( this, 0, 0, -1, -1 ) ;
	// Slide bar create.
	this.box.bar.horizontal = new createjs.Container() ;
	this.box.bar.horizontal.x = 37, this.box.bar.horizontal.y = 525 ;
	this.box.bar.vertical = new createjs.Container() ;
	this.box.bar.vertical.x = 620, this.box.bar.vertical.y = 70 ;
	this.box.bar.addChild( this.box.bar.horizontal, this.box.bar.vertical ) ;
	this.box.bar.horizontal.left = new createjs.Bitmap( "pic/map_build/left.png" ) ;
	this.box.bar.horizontal.left.x = 0, this.box.bar.horizontal.left.y = -6 ;
	this.box.bar.horizontal.right = new createjs.Bitmap( "pic/map_build/right.png" ) ;
	this.box.bar.horizontal.right.x = 555, this.box.bar.horizontal.right.y = -6 ;
	this.box.bar.horizontal.addChild( this.box.bar.horizontal.left, this.box.bar.horizontal.right ) ;
	this.box.bar.vertical.up = new createjs.Bitmap( "pic/map_build/up.png" ) ;
	this.box.bar.vertical.up.x = -6, this.box.bar.vertical.up.y = 0 ;
	this.box.bar.vertical.down = new createjs.Bitmap( "pic/map_build/down.png" ) ;
	this.box.bar.vertical.down.x = -6, this.box.bar.vertical.down.y = 425 ;
	this.box.bar.vertical.addChild( this.box.bar.vertical.up, this.box.bar.vertical.down ) ;
	// Add listening events.
	this.box.bar.horizontal.left.on( "click", function( evt ) { TotalRefresh( that, that.box.mapbox.tiled.mr, that.box.mapbox.tiled.mc - 1, -1, -1 ) ; } ) ;
	this.box.bar.horizontal.right.on( "click", function( evt ) { TotalRefresh( that, that.box.mapbox.tiled.mr, that.box.mapbox.tiled.mc + 1, -1, -1 ) ; } ) ;
	this.box.bar.vertical.up.on( "click", function( evt ) { TotalRefresh( that, that.box.mapbox.tiled.mr - 1, that.box.mapbox.tiled.mc, -1, -1 ) ; } ) ;
	this.box.bar.vertical.down.on( "click", function( evt ) { TotalRefresh( that, that.box.mapbox.tiled.mr + 1, that.box.mapbox.tiled.mc, -1, -1 ) ; } ) ;
	// [Special] button - material box listening event added.
	this.material.box.selector.buttonA.on( "click", function( evt ) { createjs.Tween.get( this ).wait( 550 ).call( function() { TotalRefresh( that, that.box.mapbox.tiled.mr, that.box.mapbox.tiled.mc, -1, -1 ) ; } ) } ) ;
	this.material.box.selector.buttonB.on( "click", function( evt ) { createjs.Tween.get( this ).wait( 550 ).call( function() { TotalRefresh( that, that.box.mapbox.tiled.mr, that.box.mapbox.tiled.mc, -1, -1 ) ; } ) } ) ;
	this.material.box.selector.buttonC.on( "click", function( evt ) { createjs.Tween.get( this ).wait( 550 ).call( function() { TotalRefresh( that, that.box.mapbox.tiled.mr, that.box.mapbox.tiled.mc, -1, -1 ) ; } ) } ) ;
	this.material.box.selector.buttonD.on( "click", function( evt ) { createjs.Tween.get( this ).wait( 550 ).call( function() { TotalRefresh( that, that.box.mapbox.tiled.mr, that.box.mapbox.tiled.mc, -1, -1 ) ; } ) } ) ;
	this.material.box.selector.buttonE.on( "click", function( evt ) { createjs.Tween.get( this ).wait( 550 ).call( function() { TotalRefresh( that, that.box.mapbox.tiled.mr, that.box.mapbox.tiled.mc, -1, -1 ) ; } ) } ) ;
	this.material.box.selector.buttonF.on( "click", function( evt ) { createjs.Tween.get( this ).wait( 550 ).call( function() { TotalRefresh( that, that.box.mapbox.tiled.mr, that.box.mapbox.tiled.mc, -1, -1 ) ; } ) } ) ;

	// Replace all of this map box.
	function TotalRefresh( pt, mr, mc, s_row, s_column ) {
		// Condition of cancel slide.
		if ( ( mr < 0 || mc < 0 ) || mr >= G.customer_height || mc >= G.customer_length )
			return ;
		// Tiled refresh.
		if ( s_row != -1 && s_column != -1 ) {
			// This is just a single fresh.
			var row = s_row - mr, column = s_column - mc ;
			var index = row * ( ( G.length > G.customer_length ) ? G.customer_length : G.length ) + column ;
			pt.box.mapbox.tiled.removeChildAt( index ) ;
			pt.box.mapbox.tiled.addChildAt( SingleRefresh( row , column ).clone( true ), index ) ;
			pt.box.mapbox.tiled.getChildAt( index ).on( "click", function( evt ) { Refresh( pt, this ) ; } ) ;
		} // if
		else {
			// Initial must remove old tiled map.
			pt.box.mapbox.tiled.removeAllChildren() ;
			pt.box.mapbox.tiled.mr = mr, pt.box.mapbox.tiled.mc = mc ;
			for ( i = 0 ; i < G.height ; i ++ )
				for ( j = 0 ; j < G.length ; j ++ )
					if ( ( i + mr ) < G.customer_height && ( j + mc ) < G.customer_length )
						pt.box.mapbox.tiled.addChild( SingleRefresh( i , j ).clone( true ) ) ;
			// Add listening event.
			for ( i = 0 ; i < pt.box.mapbox.tiled.getNumChildren() ; i ++ )
				pt.box.mapbox.tiled.getChildAt( i ).on( "click", function( evt ) { Refresh( pt, this ) ; } ) ;

			pt.box.mapbox.objects.visible = ( pt.material.box.selector.statusPage == 3 ) ? true : false ;
		} // else
		// Objects refresh.
		for ( i = 1 ; i < pt.box.mapbox.objects.getNumChildren() ; i ++ ) {
			pt.box.mapbox.objects.getChildAt( i ).x = pt.box.mapbox.objects.getChildAt( i ).storeX - mc * G.size ;
			pt.box.mapbox.objects.getChildAt( i ).y = pt.box.mapbox.objects.getChildAt( i ).storeY - mr * G.size ;
		} // for

		// Single tile for refreshing.
		function SingleRefresh( i, j ) {
			var data = pt.box.mapbox.tiled_data[i+mr][j+mc] ;
			var row = Math.floor( data.i / G.range ) ;
			var column = data.i % G.range ;
			var singleTile = new createjs.Container() ;
			singleTile.pic = new createjs.Bitmap( G.textureSrc + data.m + ".png" ) ;
			singleTile.pic.sourceRect = new createjs.Rectangle( column * G.size, row * G.size, G.size, G.size ) ;
			// Mask for walkable / unwalkable.
			singleTile.mask = new createjs.Shape() ;
			if ( data.w == 1 )
				singleTile.mask.graphics.f( "#00FF00" ).r( 0, 0, G.size, G.size ) ;
			else
				singleTile.mask.graphics.f( "#FF0000" ).r( 0, 0, G.size, G.size ) ;
			singleTile.mask.alpha = 0.2 ;
			singleTile.mask.visible = ( pt.material.box.selector.statusPage == 2 ) ? true : false ;
			// Add to container.
			singleTile.addChild( singleTile.pic, singleTile.mask ) ;
			singleTile.name = i * G.length + j ;
			singleTile.x = j * G.size, singleTile.y = i * G.size ;
			return singleTile ;
		} // SingleRefresh()

		// Focus one tiled, let it replace new one.
		function Refresh( pt, singleTiled ) {
			// Get sileded tiled map data.
			var select = pt.material.box.list.marked.name ;
			var row = Math.floor( singleTiled.name / G.length ) + pt.box.mapbox.tiled.mr ;
			var column = ( singleTiled.name % G.length ) + pt.box.mapbox.tiled.mc ;
			if ( pt.material.box.selector.statusPage == 1 ) {
				var map = Math.floor( select / 100 ) ;
				var index = select - Math.floor( ( select / 100 ) ) * 100 ;
				// tilde map assign.
				pt.box.mapbox.tiled_data[row][column].m = map ;
				pt.box.mapbox.tiled_data[row][column].i = index ;
				TotalRefresh( pt, pt.box.mapbox.tiled.mr, pt.box.mapbox.tiled.mc, row, column ) ;
			} // if
			else if ( pt.material.box.selector.statusPage == 2 ) {
				if ( select == "walkable" )
					pt.box.mapbox.tiled_data[row][column].w = 1 ;
				else if ( select == "unwalkable" )
					pt.box.mapbox.tiled_data[row][column].w = 0 ;	
				TotalRefresh( pt, pt.box.mapbox.tiled.mr, pt.box.mapbox.tiled.mc, row, column ) ;
			} // else if
		} // Refresh()	
	} // TotalRefresh()

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
				tiled[i][j] = new TiledDatastruct() ;
		return tiled ;

		function TiledDatastruct() {
			// texture map number
			this.m = 0 ;
			// texture location index
			this.i = 0 ;
			// could walkable
			this.w = 1 ;
		} // Tiled_Datastruct()
	} // OnCreateTiled()

	function OnCreateObject( evt ) {
		// Reject to put the object out of range.
		var mouseX = evt.stageX - that.box.mapbox.x, mouseY = evt.stageY - that.box.mapbox.y ;
		if ( mouseX > ( G.customer_length - that.box.mapbox.tiled.mc ) * G.size || mouseY > ( G.customer_height - that.box.mapbox.tiled.mr ) * G.size )
			return ;
		// Add the container for object on mapbox.
		var controller = new createjs.Container() ;
		controller.x = Math.ceil( mouseX ), controller.y = Math.ceil( mouseY ) ;
		controller.storeX = controller.x + that.box.mapbox.tiled.mc * G.size, controller.storeY = controller.y + that.box.mapbox.tiled.mr * G.size ;
		that.box.mapbox.objects.addChild( controller ) ;
		// Copy the selected object.
		controller.objects = that.material.box.list.objects.pic.clone( false ) ;
		controller.objects.x = controller.objects.regX + 10, controller.objects.y = controller.objects.regY + 10 ;
		controller.objects.scaleX = controller.objects.scaleY = 1 ;
		controller.addChild( controller.objects ) ;
		// Object container assign the name (pic number).
		controller.name = controller.objects.name ;
		// Adjust the location of this container.
		controller.regX = controller.objects.regX + 10, controller.regY = controller.objects.regY + 10 ;
		controller.bg = new createjs.Shape() ;
		controller.bg.graphics.f( "#FF0000" ).s( "#000000" ).r( 0, 0, controller.getBounds().width + 20, controller.getBounds().height + 20 ) ;
		controller.bg.alpha = 0 ;
		// Store to data.
		var index = that.box.mapbox.object_data.length ;
		that.box.mapbox.object_data[index] = new ObjectDatastruct() ;
		that.box.mapbox.object_data[index].n = controller.name ;
		that.box.mapbox.object_data[index].o = that.box.mapbox.objects.getNumChildren() - 1 ;
		that.box.mapbox.object_data[index].rx = controller.storeX ;
		that.box.mapbox.object_data[index].ry = controller.storeY ;
		that.box.mapbox.object_data[index].s = controller.scaleX ;
		// Get tools.
		controller.tools = ToolsBox() ;

		// Add listening events.
		stage.enableMouseOver( 20 ) ;
		controller.on( "mousedown", function( evt ) {
			previous = { x: evt.stageX, y: evt.stageY } ;
			controller.bg.alpha = 0.3 ;
			controller.tools.alpha = 1 ;
			controller.tools.cancel.bg.alpha = controller.tools.flip.bg.alpha = controller.tools.up.bg.alpha = controller.tools.down.bg.alpha = controller.tools.zoom_in.bg.alpha = controller.tools.zoom_out.bg.alpha = 0.7 ;
		} ) ;
		controller.on( "rollout", function( evt ) {
			createjs.Tween.get( controller.bg ).to( { alpha: 0 }, 500 ) ;
			createjs.Tween.get( controller.tools ).to( { alpha: 0 }, 500 ) ;
		} ) ;
		controller.on( "pressmove", function( evt ) {
			var difX = evt.stageX - previous.x, difY = evt.stageY - previous.y ;
			// Reject to put the object not out of range.
			if ( controller.x + difX >= 0 && controller.x + difX <= ( G.customer_length - that.box.mapbox.tiled.mc ) * G.size ) {
				controller.x += difX ;
				controller.storeX = Math.ceil( controller.x + that.box.mapbox.tiled.mc * G.size ) ;
				previous.x = evt.stageX ;
			} // if
			if ( controller.y + difY >= 0 && controller.y + difY <= ( G.customer_height - that.box.mapbox.tiled.mr ) * G.size ) {
				controller.y += difY ;
				controller.storeY = Math.ceil( controller.y + that.box.mapbox.tiled.mr * G.size ) ;
				previous.y = evt.stageY ;
			} // if
		} ) ;

		function ToolsBox() {
			// Setting tools location.
			var tools = new createjs.Container() ;
			tools.alpha = 0 ;
			// Cancel.
			tools.cancel = new createjs.Container() ;
			tools.cancel.icon = G.cacheObjectsController[0].clone( false ) ;
			tools.cancel.icon.scaleX = tools.cancel.icon.scaleY = 0.15 ;
			tools.cancel.icon.x = controller.getBounds().width + 22, tools.cancel.y = 0 ;
			tools.cancel.bg = new createjs.Shape() ;
			tools.cancel.bg.graphics.f( "#FFFFFF" ).r( controller.getBounds().width + 21, 0, 22, 22 ) ;
			tools.cancel.addChild( tools.cancel.bg, tools.cancel.icon ) ;
			tools.cancel.on( "click", function(){ that.box.mapbox.objects.removeChild( controller ) ; } ) ;
			// Flip.
			tools.flip = new createjs.Container() ;
			tools.flip.icon = G.cacheObjectsController[1].clone( false ) ;
			tools.flip.icon.scaleX = tools.flip.icon.scaleY = 0.15 ;
			tools.flip.icon.x = controller.getBounds().width + 22, tools.flip.icon.y = 22 ;
			tools.flip.bg = new createjs.Shape() ;
			tools.flip.bg.graphics.f( "#FFFFFF" ).r( controller.getBounds().width + 21, 22, 22, 22 ) ;
			tools.flip.addChild( tools.flip.bg, tools.flip.icon ) ;
			tools.flip.on( "click", function(){ controller.objects.scaleX *= -1 ; } ) ;
			// Up.
			tools.up = new createjs.Container() ;
			tools.up.icon = G.cacheObjectsController[2].clone( false ) ;
			tools.up.icon.scaleX = tools.up.icon.scaleY = 0.15 ;
			tools.up.icon.x = -22, tools.up.icon.y = 1 ;
			tools.up.bg = new createjs.Shape() ;
			tools.up.bg.graphics.f( "#FFFFFF" ).r( -25, 0, 25, 22 ) ;
			tools.up.addChild( tools.up.bg, tools.up.icon ) ;
			tools.up.on( "click", function(){ that.box.mapbox.objects.addChild( controller ) ; } ) ;
			// Down.
			tools.down = new createjs.Container() ;
			tools.down.icon = G.cacheObjectsController[3].clone( false ) ;
			tools.down.icon.scaleX = tools.down.icon.scaleY = 0.15 ;
			tools.down.icon.x = -22, tools.down.icon.y = 23 ;
			tools.down.bg = new createjs.Shape() ;
			tools.down.bg.graphics.f( "#FFFFFF" ).r( -25, 22, 25, 22 ) ;
			tools.down.addChild( tools.down.bg, tools.down.icon ) ;
			tools.down.on( "click", function(){ that.box.mapbox.objects.addChildAt( controller, 1 ) ; } ) ;
			// Zoom in.
			tools.zoom_in = new createjs.Container() ;
			tools.zoom_in.icon = G.cacheObjectsController[4].clone( false ) ;
			tools.zoom_in.icon.scaleX = tools.zoom_in.icon.scaleY = 0.15 ;
			tools.zoom_in.icon.x = -22, tools.zoom_in.icon.y = 45 ;
			tools.zoom_in.bg = new createjs.Shape() ;
			tools.zoom_in.bg.graphics.f( "#FFFFFF" ).r( -25, 44, 25, 22 ) ;
			tools.zoom_in.addChild( tools.zoom_in.bg, tools.zoom_in.icon ) ;
			tools.zoom_in.on( "click", function(){ controller.scaleX *= 1.05, controller.scaleY *= 1.05 ; } ) ;
			// Zoom out.
			tools.zoom_out = new createjs.Container() ;
			tools.zoom_out.icon = G.cacheObjectsController[5].clone( false ) ;
			tools.zoom_out.icon.scaleX = tools.zoom_out.icon.scaleY = 0.15 ;
			tools.zoom_out.icon.x = -22, tools.zoom_out.icon.y = 67 ;
			tools.zoom_out.bg = new createjs.Shape() ;
			tools.zoom_out.bg.graphics.f( "#FFFFFF" ).r( -25, 66, 25, 22 ) ;
			tools.zoom_out.addChild( tools.zoom_out.bg, tools.zoom_out.icon ) ;
			tools.zoom_out.on( "click", function(){ controller.scaleX *= 0.95, controller.scaleY *= 0.95 ; } ) ;
			// Total icon add to this container.
			tools.addChild( tools.cancel, tools.flip, tools.up, tools.down, tools.zoom_in, tools.zoom_out ) ;
			// Add to the top container.
			controller.addChildAt( controller.bg, 0 ) ;
			controller.addChild( tools ) ;
			return tools ;
		} // ToolsBox()

		// Create object map data struct.
		function ObjectDatastruct() {
			// object pic number
			this.n = 0 ;
			// object order number
			this.o = 0 ;
			// object storage real x
			this.rx = 0 ;
			// object storage real y
			this.ry = 0 ;                            
			// object scale
			this.s = 1 ;
		} // Tiled_Datastruct()
	} // OnCreateObject()
} // OnTiledControl()