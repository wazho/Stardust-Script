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
	this.box.tool.x = 0, this.box.tool.y = 0 ;
	// Tools box switch container.
	this.box.tool.switcher = new createjs.Container() ;
	this.box.tool.switcher.x = 525, this.box.tool.switcher.y = 5 ;
	this.box.tool.addChild( this.box.tool.switcher ) ;
	this.box.tool.switcher.icon = new createjs.Bitmap( "pic/map_build/toolsbox.png" ) ;
	this.box.tool.switcher.icon.scaleX = this.box.tool.switcher.icon.scaleY = 0.45 ;
	this.box.tool.switcher.icon.x = 0, this.box.tool.switcher.icon.y = 0 ;
	this.box.tool.switcher.comment = new createjs.Text( "Tools\n  Box", "18px comic sans ms", "#FFFFFF" ) ;
	this.box.tool.switcher.comment.x = 60, this.box.tool.switcher.comment.y = 14 ;
	this.box.tool.switcher.open = false ;
	this.box.tool.switcher.addChild( this.box.tool.switcher.icon, this.box.tool.switcher.comment ) ;
	// Tools of tools box conatiner.
	this.box.tool.toolsbox = new createjs.Container() ;
	this.box.tool.toolsbox.x = 135, this.box.tool.toolsbox.y = -60 ;
	this.box.tool.addChild( this.box.tool.toolsbox ) ;
	this.box.tool.toolsbox.showObject = new createjs.Container() ;
	this.box.tool.toolsbox.showObject.bg = new createjs.Shape() ;
	this.box.tool.toolsbox.showObject.bg.graphics.f( "#000000" ).r( 0, 0, 120, 60 ) ;
	this.box.tool.toolsbox.showObject.bg.alpha = 0.01 ;
	this.box.tool.toolsbox.showObject.icon = new createjs.Bitmap( "pic/map_build/tools_object.png" ) ;
	this.box.tool.toolsbox.showObject.icon.scaleX = this.box.tool.toolsbox.showObject.icon.scaleY = 0.45 ;
	this.box.tool.toolsbox.showObject.icon.x = 0, this.box.tool.toolsbox.showObject.icon.y = 0 ;
	this.box.tool.toolsbox.showObject.comment = new createjs.Text( "Show\n Object", "14px comic sans ms", "#FFFFFF" ) ;
	this.box.tool.toolsbox.showObject.comment.x = 60, this.box.tool.toolsbox.showObject.comment.y = 25 ;
	this.box.tool.toolsbox.showObject.addChild( this.box.tool.toolsbox.showObject.bg, this.box.tool.toolsbox.showObject.icon, this.box.tool.toolsbox.showObject.comment ) ;
	this.box.tool.toolsbox.showLight = new createjs.Container() ;
	this.box.tool.toolsbox.showLight.bg = new createjs.Shape() ;
	this.box.tool.toolsbox.showLight.bg.graphics.f( "#000000" ).r( 120, 0, 120, 60 ) ;
	this.box.tool.toolsbox.showLight.bg.alpha = 0.01 ;
	this.box.tool.toolsbox.showLight.icon = new createjs.Bitmap( "pic/map_build/tools_light.png" ) ;
	this.box.tool.toolsbox.showLight.icon.scaleX = this.box.tool.toolsbox.showLight.icon.scaleY = 0.45 ;
	this.box.tool.toolsbox.showLight.icon.x = 120, this.box.tool.toolsbox.showLight.icon.y = 0 ;
	this.box.tool.toolsbox.showLight.comment = new createjs.Text( "Show\n Light", "14px comic sans ms", "#FFFFFF" ) ;
	this.box.tool.toolsbox.showLight.comment.x = 180, this.box.tool.toolsbox.showLight.comment.y = 25 ;
	this.box.tool.toolsbox.showLight.addChild( this.box.tool.toolsbox.showLight.bg, this.box.tool.toolsbox.showLight.icon, this.box.tool.toolsbox.showLight.comment ) ;
	this.box.tool.toolsbox.showGirds = new createjs.Container() ;
	this.box.tool.toolsbox.showGirds.bg = new createjs.Shape() ;
	this.box.tool.toolsbox.showGirds.bg.graphics.f( "#000000" ).r( 240, 0, 120, 60 ) ;
	this.box.tool.toolsbox.showGirds.bg.alpha = 0.01 ;
	this.box.tool.toolsbox.showGirds.icon = new createjs.Bitmap( "pic/map_build/tools_grid.png" ) ;
	this.box.tool.toolsbox.showGirds.icon.scaleX = this.box.tool.toolsbox.showGirds.icon.scaleY = 0.45 ;
	this.box.tool.toolsbox.showGirds.icon.x = 240, this.box.tool.toolsbox.showGirds.icon.y = 0 ;
	this.box.tool.toolsbox.showGirds.comment = new createjs.Text( "Show\n Grid", "14px comic sans ms", "#FFFFFF" ) ;
	this.box.tool.toolsbox.showGirds.comment.x = 300, this.box.tool.toolsbox.showGirds.comment.y = 25 ;
	this.box.tool.toolsbox.showGirds.addChild( this.box.tool.toolsbox.showGirds.bg, this.box.tool.toolsbox.showGirds.icon, this.box.tool.toolsbox.showGirds.comment ) ;
	this.box.tool.toolsbox.setCharacter = new createjs.Container() ;
	this.box.tool.toolsbox.setCharacter.bg = new createjs.Shape() ;
	this.box.tool.toolsbox.setCharacter.bg.graphics.f( "#000000" ).r( 360, 0, 120, 60 ) ;
	this.box.tool.toolsbox.setCharacter.bg.alpha = 0.01 ;
	this.box.tool.toolsbox.setCharacter.icon = new createjs.Bitmap( "pic/map_build/tools_character.png" ) ;
	this.box.tool.toolsbox.setCharacter.icon.scaleX = this.box.tool.toolsbox.setCharacter.icon.scaleY = 0.45 ;
	this.box.tool.toolsbox.setCharacter.icon.x = 360, this.box.tool.toolsbox.setCharacter.y = 0 ;
	this.box.tool.toolsbox.setCharacter.comment = new createjs.Text( "Set a\n Character", "14px comic sans ms", "#FFFFFF" ) ;
	this.box.tool.toolsbox.setCharacter.comment.x = 420, this.box.tool.toolsbox.setCharacter.comment.y = 25 ;
	this.box.tool.toolsbox.setCharacter.addChild( this.box.tool.toolsbox.setCharacter.bg, this.box.tool.toolsbox.setCharacter.icon, this.box.tool.toolsbox.setCharacter.comment ) ;
	this.box.tool.toolsbox.addChild( this.box.tool.toolsbox.showObject, this.box.tool.toolsbox.showLight, this.box.tool.toolsbox.showGirds, this.box.tool.toolsbox.setCharacter ) ; 
	// Adding switcher listenling events.
	this.box.tool.switcher.on( "click", function() {
		if ( ! that.box.tool.switcher.open ) {
			that.box.tool.switcher.open = true ;
			createjs.Tween.get( that.box.logo )
			.to( { alpha: 0 }, 300 ) ;
			createjs.Tween.get( that.box.tool.switcher )
			.to( { x: 15, alpha: 0.3 }, 1500, createjs.Ease.backInOut )
			.call( function() {
				createjs.Tween.get( that.box.tool.toolsbox )
				.to( { alpha: 0 }, 0 )
				.to( { y: 5, alpha: 1 }, 300 ) ;
			} )
			.to( { alpha: 1 }, 500 ) ;
		} // if
		else {
			that.box.tool.switcher.open = false ;
			createjs.Tween.get( that.box.logo )
			.to( { alpha: 1 }, 300 ) ;
			createjs.Tween.get( that.box.tool.switcher, createjs.Ease.elasticOut )
			.call( function() {
				createjs.Tween.get( that.box.tool.toolsbox )
				.to( { y: -60, alpha: 0 }, 300 ) ;
			} )
			.to( { x: 525 }, 500, createjs.Ease.elasticOut ) ;
		} // else
	} ) ;
	// Adding tools button listening events.
	this.box.tool.toolsbox.showObject.on( "click", function() {
		if ( that.material.box.selector.statusPage != 3 ) {
			that.box.mapbox.combineSeen = that.material.box.selector.statusPage ;
			that.box.mapbox.objects.visible = ( that.box.mapbox.objects.visible ) ? false : true ;
			that.box.mapbox.objects.bg.visible = false ;
		} // if
	} ) ;
	this.box.tool.toolsbox.showLight.on( "click", function() {
		if ( that.material.box.selector.statusPage != 4 ) {
			that.box.mapbox.combineSeen = that.material.box.selector.statusPage ;
			that.box.mapbox.light.visible = ( that.box.mapbox.light.visible ) ? false : true ;
			that.box.mapbox.light.bg.visible = false ;
		} // if
	} ) ;

	// Combine to see tiles, objects, light ... etc
	this.box.mapbox.combineSeen = 0 ;
	// Add to top container.
	this.box.addChild( this.box.mapbox, this.box.bg, this.box.logo, this.box.bar, this.box.tool ) ;
} // OnCreate()

// Create all elements of map box.
PreviewBox.prototype.OnTiledControl = function() {
	var that = this ;
	// Map box container.
	this.box.mapbox.bg = new createjs.Shape() ;
	this.box.mapbox.bg.graphics.f( "#FFFFFF" ).r( 0, 0, G.size * G.length, G.size * G.height ) ;
	this.box.mapbox.addChild( this.box.mapbox.bg ) ;
	// Create tiled map data struct.
	this.box.mapbox.tiled_data = OnCreateTiled( G.customer_length, G.customer_height ) ;
	// Map box tiled.
	this.box.mapbox.tiled = new createjs.Container() ;
	this.box.mapbox.tiled.x = 0, this.box.mapbox.tiled.y = 0 ;
	this.box.mapbox.tiled.mr = 0, this.box.mapbox.tiled.mc = 0 ;
	this.box.mapbox.addChild( this.box.mapbox.tiled ) ;
	// Create objects map data struct.
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
	// Create light map data struct.
	this.box.mapbox.light_data = new Array() ;
	// Map box light.
	this.box.mapbox.light = new createjs.Container() ;
	this.box.mapbox.light.visible = false ;
	this.box.mapbox.addChild( this.box.mapbox.light ) ;
	this.box.mapbox.light.bg = new createjs.Shape() ;
	this.box.mapbox.light.bg.graphics.f( "#000000" ).r( G.size * G.length / 2, G.size * G.height / 2, G.size * G.length, G.size * G.height ) ;
	this.box.mapbox.light.bg.regX = G.size * G.length / 2, this.box.mapbox.light.bg.regY = G.size * G.height / 2 ;
	this.box.mapbox.light.bg.alpha = 0.5 ;
	this.box.mapbox.light.addChild( this.box.mapbox.light.bg ) ;
	// Light listening events.
	this.box.mapbox.light.bg.on( "dblclick", function( evt ) { OnCreateLight( evt ) } ) ;
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
	this.material.box.selector.buttonA.on( "click", function( evt ) { createjs.Tween.get( this ).wait( 550 ).call( function() { that.box.mapbox.combineSeen = 0 ; TotalRefresh( that, that.box.mapbox.tiled.mr, that.box.mapbox.tiled.mc, -1, -1 ) ; } ) } ) ;
	this.material.box.selector.buttonB.on( "click", function( evt ) { createjs.Tween.get( this ).wait( 550 ).call( function() { that.box.mapbox.combineSeen = 0 ; TotalRefresh( that, that.box.mapbox.tiled.mr, that.box.mapbox.tiled.mc, -1, -1 ) ; } ) } ) ;
	this.material.box.selector.buttonC.on( "click", function( evt ) { createjs.Tween.get( this ).wait( 550 ).call( function() { that.box.mapbox.combineSeen = 0 ; TotalRefresh( that, that.box.mapbox.tiled.mr, that.box.mapbox.tiled.mc, -1, -1 ) ; } ) } ) ;
	this.material.box.selector.buttonD.on( "click", function( evt ) { createjs.Tween.get( this ).wait( 550 ).call( function() { that.box.mapbox.combineSeen = 0 ; TotalRefresh( that, that.box.mapbox.tiled.mr, that.box.mapbox.tiled.mc, -1, -1 ) ; } ) } ) ;
	this.material.box.selector.buttonE.on( "click", function( evt ) { createjs.Tween.get( this ).wait( 550 ).call( function() { that.box.mapbox.combineSeen = 0 ; TotalRefresh( that, that.box.mapbox.tiled.mr, that.box.mapbox.tiled.mc, -1, -1 ) ; } ) } ) ;
	this.material.box.selector.buttonF.on( "click", function( evt ) { createjs.Tween.get( this ).wait( 550 ).call( function() { that.box.mapbox.combineSeen = 0 ; TotalRefresh( that, that.box.mapbox.tiled.mr, that.box.mapbox.tiled.mc, -1, -1 ) ; } ) } ) ;

	// Replace all of this map box.
	function TotalRefresh( pt, mr, mc, s_row, s_column ) {
		// Condition of cancel slide.
		if ( ( mr < 0 || mc < 0 ) || mr >= G.customer_height || mc >= G.customer_length )
			return ;
		// Tiled refresh.
		if ( s_row != -1 && s_column != -1 ) {
			// This is just a single fresh.
			var row = s_row - mr, column = s_column - mc ;
			var index = row * ( ( G.length > ( G.customer_length - mc ) ) ? ( G.customer_length - mc ) : G.length ) + column ;
			pt.box.mapbox.tiled.removeChildAt( index ) ;
			pt.box.mapbox.tiled.addChildAt( SingleTileRefresh( row , column ).clone( true ), index ) ;
			pt.box.mapbox.tiled.getChildAt( index ).on( "click", function( evt ) { SingleTileReplace( pt, this ) ; } ) ;
		} // if
		else {
			// Initial must remove old tiled map.
			pt.box.mapbox.tiled.removeAllChildren() ;
			pt.box.mapbox.tiled.mr = mr, pt.box.mapbox.tiled.mc = mc ;
			for ( i = 0 ; i < G.height ; i ++ )
				for ( j = 0 ; j < G.length ; j ++ )
					if ( ( i + mr ) < G.customer_height && ( j + mc ) < G.customer_length )
						pt.box.mapbox.tiled.addChild( SingleTileRefresh( i , j ).clone( true ) ) ;
			// Add listening event.
			for ( i = 0 ; i < pt.box.mapbox.tiled.getNumChildren() ; i ++ )
				pt.box.mapbox.tiled.getChildAt( i ).on( "click", function( evt ) { SingleTileReplace( pt, this ) ; } ) ;
			// Combine to see tiles, objects, light ... etc.
			if ( pt.box.mapbox.combineSeen != pt.material.box.selector.statusPage ) {
				pt.box.mapbox.objects.visible = pt.box.mapbox.objects.bg.visible = ( pt.material.box.selector.statusPage == 3 ) ? true : false ;
				pt.box.mapbox.light.visible = pt.box.mapbox.light.bg.visible = ( pt.material.box.selector.statusPage == 4 ) ? true : false ;
			} // if
		} // else

		// Objects refresh.
		for ( i = 1 ; i < pt.box.mapbox.objects.getNumChildren() ; i ++ ) {
			pt.box.mapbox.objects.getChildAt( i ).x = pt.box.mapbox.objects.getChildAt( i ).storeX - mc * G.size ;
			pt.box.mapbox.objects.getChildAt( i ).y = pt.box.mapbox.objects.getChildAt( i ).storeY - mr * G.size ;
		} // for
		// Light refresh.
		for ( i = 1 ; i < pt.box.mapbox.light.getNumChildren() ; i ++ ) {
			pt.box.mapbox.light.getChildAt( i ).x = pt.box.mapbox.light.getChildAt( i ).storeX - mc * G.size ;
			pt.box.mapbox.light.getChildAt( i ).y = pt.box.mapbox.light.getChildAt( i ).storeY - mr * G.size ;
		} // for

		// Single tile for refreshing.
		function SingleTileRefresh( i, j ) {
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
		} // SingleTileRefresh()

		// Focus one tiled, let it replace new one.
		function SingleTileReplace( pt, singleTiled ) {
			// Get selected tiled map data.
			var select = pt.material.box.list.marked.name ;
			var row = Math.floor( singleTiled.name / G.length ) + pt.box.mapbox.tiled.mr ;
			var column = ( singleTiled.name % G.length ) + pt.box.mapbox.tiled.mc ;
			var rangeX = 0, rangeY = 0 ;
			if ( pt.material.box.selector.statusPage == 1 ) {
				// This's tiled map data has a range.
				if ( ( select - Math.floor( select ) ).toFixed( 4 ) != 0 ) {
					var range = Math.floor( ( select - Math.floor( select ) ).toFixed( 4 ) * 10000 ) ;
					var getX = Math.floor( range / 100 ), getY = range - getX * 100 ;
					var rangeX = ( ( getX >= 10 ) ? 1 : -1 ) * ( getX % 10 ) ;
					var rangeY = ( ( getY >= 10 ) ? 1 : -1 ) * ( getY % 10 ) ;
				} // if
				// Range tiled replace.
				var mapNumber = Math.floor( select / 100 ) ;
				var mapSrartIndex = ( select - Math.floor( select / 100 ) * 100 ).toFixed( 0 ) ;
				for ( y = rangeY ; ; ( y > 0 ) ? y -- : y ++ ) {
					for ( x = rangeX ; ; ( x > 0 ) ? x -- : x ++ ) {
						// Tilde map assign.
						if ( row + y >= 0 && column + x >= 0 && row + y < G.customer_height && column + x < G.customer_length ) {
							pt.box.mapbox.tiled_data[row+y][column+x].m = mapNumber ;
							pt.box.mapbox.tiled_data[row+y][column+x].i = Number( mapSrartIndex ) + x + ( G.range * y ) ;
							if ( ( row + y ) < ( G.height + pt.box.mapbox.tiled.mr ) && ( column + x ) < ( G.length + pt.box.mapbox.tiled.mc ) && ( row + y ) >= 0 && ( column + x ) >= 0 )
								TotalRefresh( pt, pt.box.mapbox.tiled.mr, pt.box.mapbox.tiled.mc, row + y, column + x ) ;
						} // if
						if ( x == 0 )
							break ;
					} // for
					if ( y == 0 )
						break ;
				} // for
			} // if
			else if ( pt.material.box.selector.statusPage == 2 ) {
				if ( select == "walkable" )
					pt.box.mapbox.tiled_data[row][column].w = 1 ;
				else if ( select == "unwalkable" )
					pt.box.mapbox.tiled_data[row][column].w = 0 ;	
				TotalRefresh( pt, pt.box.mapbox.tiled.mr, pt.box.mapbox.tiled.mc, row, column ) ;
			} // else if
		} // SingleTileReplace()	
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

		// Create tile map data struct.
		function TiledDatastruct() {
			// texture map number
			this.m = 0 ;
			// texture location index
			this.i = 0 ;
			// could walkable
			this.w = 1 ;
		} // Tiled_Datastruct()
	} // OnCreateTiled()

	// Create one object on mapbox.
	function OnCreateObject( evt ) {
		// Reject to put the object out of range.
		var mouseX = evt.stageX - that.box.mapbox.x, mouseY = evt.stageY - that.box.mapbox.y ;
		if ( mouseX > ( G.customer_length - that.box.mapbox.tiled.mc ) * G.size || mouseY > ( G.customer_height - that.box.mapbox.tiled.mr ) * G.size )
			return ;
		// Add the container for object on mapbox.
		var controller = new createjs.Container() ;
		controller.x = Math.ceil( mouseX ), controller.y = Math.ceil( mouseY ) ;
		controller.storeX = controller.x + that.box.mapbox.tiled.mc * G.size, controller.storeY = controller.y + that.box.mapbox.tiled.mr * G.size ;
		createjs.Tween.get( controller )
		.to( { alpha: 0, scaleX: 0, scaleY: 0 }, 0 )
		.call( function() { that.box.mapbox.objects.addChild( controller ) ; } )
		.to( { alpha: 1, scaleX: 1, scaleY: 1 }, 500 ) ;
		// Copy the selected object.
		controller.objects = that.material.box.list.objects.pic.clone( false ) ;
		controller.objects.x = controller.objects.regX, controller.objects.y = controller.objects.regY ;
		controller.objects.scaleX = controller.objects.scaleY = 1 ;
		controller.addChild( controller.objects ) ;
		// Object container assign the name (pic number).
		controller.name = controller.objects.name ;
		// Adjust the location of this container.
		controller.regX = controller.objects.regX, controller.regY = controller.objects.regY ;
		// Store to data.
		var index = that.box.mapbox.object_data.length ;
		that.box.mapbox.object_data[index] = new ObjectDatastruct() ;
		that.box.mapbox.object_data[index].n = controller.name ;
		that.box.mapbox.object_data[index].o = index ;
		that.box.mapbox.object_data[index].rx = controller.storeX ;
		that.box.mapbox.object_data[index].ry = controller.storeY ;
		that.box.mapbox.object_data[index].sx = controller.scaleX ;
		that.box.mapbox.object_data[index].sy = controller.scaleY ;
		// Get tools.
		controller.tools = that.GetToolsBox( controller, "object"  ) ;
		// Add controller listening events.
		that.ToolsBoxListener( controller, "object" ) ;

		// Create object map data struct.
		function ObjectDatastruct() {
			// object pic number
			this.n = 0 ;
			// object storage real x
			this.rx = 0 ;
			// object storage real y
			this.ry = 0 ;
			// object scale x
			this.sx = 1 ;
			// object scale y
			this.sy = 1 ;
		} // ObjectDatastruct()
	} // OnCreateObject()

	// Create one light on mapbox.
	function OnCreateLight( evt ) {
		// Reject to put the light out of range.
		var mouseX = evt.stageX - that.box.mapbox.x, mouseY = evt.stageY - that.box.mapbox.y ;
		if ( mouseX > ( G.customer_length - that.box.mapbox.tiled.mc ) * G.size || mouseY > ( G.customer_height - that.box.mapbox.tiled.mr ) * G.size )
			return ;
		// Add the container for light on mapbox.
		var controller = new createjs.Container() ;
		controller.x = Math.ceil( mouseX ), controller.y = Math.ceil( mouseY ) ;
		controller.storeX = controller.x + that.box.mapbox.tiled.mc * G.size, controller.storeY = controller.y + that.box.mapbox.tiled.mr * G.size ;
		createjs.Tween.get( controller )
		.to( { alpha: 0, scaleX: 0, scaleY: 0 }, 0 )
		.call( function() { that.box.mapbox.light.addChild( controller ) ; } )
		.to( { alpha: 1, scaleX: 1, scaleY: 1 }, 500 ) ;
		// Copy the selected light.
		controller.light = LightEffect( that.material.box.list.light.number ) ;
		controller.light.x = controller.light.regX, controller.light.y = controller.light.regY ;
		controller.light.scaleX = controller.light.scaleY = 1 ;
		controller.addChild( controller.light ) ;
		// Light container assign the name (pic number).
		controller.name = controller.light.name ;
		// Adjust the location of this container.
		controller.regX = controller.light.regX, controller.regY = controller.light.regY ;
		// Store to data.
		var index = that.box.mapbox.light_data.length ;
		that.box.mapbox.light_data[index] = new LightDatastruct() ;
		that.box.mapbox.light_data[index].n = controller.name ;
		that.box.mapbox.light_data[index].o = index ;
		that.box.mapbox.light_data[index].rx = controller.storeX ;
		that.box.mapbox.light_data[index].ry = controller.storeY ;
		that.box.mapbox.light_data[index].sx = controller.scaleX ;
		that.box.mapbox.light_data[index].sy = controller.scaleY ;
		// Get tools.
		controller.tools = that.GetToolsBox( controller, "light" ) ;
		// Add controller listening events.
		that.ToolsBoxListener( controller, "light" ) ;

		// Create light map data struct.
		function LightDatastruct() {
			// light light number
			this.n = 0 ;
			// light storage real x
			this.rx = 0 ;
			// light storage real y
			this.ry = 0 ;
			// light scale x
			this.sx = 1 ;
			// light scale y
			this.sy = 1 ;
		} // LightDatastruct()
	} // OnCreateLight()
} // OnTiledControl()

// Add tools box to one object. 
PreviewBox.prototype.GetToolsBox = function( controller, type ) {
	var that = this ;
	// Setting tools location.
	var tools = new createjs.Container() ;
	tools.alpha = 0 ;
	// Background.
	tools.bg = new createjs.Shape() ;
	tools.bg.graphics.f( "#AAAAAA" ).s( "#000000" ).r( 0, 0, controller.getBounds().width + 40, controller.getBounds().height + 40 ) ;
	tools.bg.alpha = 0 ;
	tools.regX = ( controller.getBounds().width + 40 ) / 2, tools.regY = ( controller.getBounds().height + 40 ) / 2 ;
	tools.x = tools.regX, tools.y = tools.regY ;
	// Cancel.
	tools.cancel = new createjs.Container() ;
	tools.cancel.icon = G.cacheObjectsController[0].clone( false ) ;
	tools.cancel.icon.regX = tools.cancel.icon.regY = tools.cancel.icon.getBounds().width / 2 ;
	tools.cancel.icon.scaleX = tools.cancel.icon.scaleY = 0.7 ;
	tools.cancel.bg = new createjs.Shape() ;
	tools.cancel.bg.graphics.f( "#FFFFFF" ).dc( 0, 0, 15 ) ;
	tools.cancel.bg.alpha = 0.5 ;
	tools.cancel.x = tools.regX, tools.cancel.y = tools.regY ;
	tools.cancel.oriX = tools.cancel.x, tools.cancel.oriY = tools.cancel.y ;
	tools.cancel.addChild( tools.cancel.bg, tools.cancel.icon ) ;
	tools.cancel.on( "click", function() {
		createjs.Tween.get( controller )
		.to( { alpha: 0, rotation: -360, scaleX: 0, scaleY: 0 }, 500 )
		.call( function() { 
			if ( type == "object" )
				that.box.mapbox.objects.removeChild( controller ) ;
			else if ( type == "light" )
				that.box.mapbox.light.removeChild( controller ) ;
		} ) ;
		createjs.Tween.get( controller.tools )
		.to( { alpha: 0, rotation: -360, scaleX: 0, scaleY: 0 }, 500 )
		.call( function() { that.box.mapbox.removeChild( controller.tools ) ; } ) ;
	} ) ;
	// Flip.
	tools.flip = new createjs.Container() ;
	tools.flip.icon = G.cacheObjectsController[1].clone( false ) ;
	tools.flip.icon.regX = tools.flip.icon.regY = tools.flip.icon.getBounds().width / 2 ;
	tools.flip.icon.scaleX = tools.flip.icon.scaleY = 0.7 ;
	tools.flip.bg = new createjs.Shape() ;
	tools.flip.bg.graphics.f( "#FFFFFF" ).dc( 0, 0, 15 ) ;
	tools.flip.bg.alpha = 0.5 ;
	tools.flip.x = tools.regX, tools.flip.y = tools.regY ;
	tools.flip.oriX = tools.flip.x, tools.flip.oriY = tools.flip.y ;
	tools.flip.addChild( tools.flip.bg, tools.flip.icon ) ;
	tools.flip.on( "click", function() {
		if ( type == "object" ) {
			// that.box.mapbox.object_data[controller.order].sx *= -1 ;
			createjs.Tween.get( controller.objects )
			.to( { scaleX: controller.objects.scaleX * -1 }, 100 ) ;
		} // if
		else if ( type == "light" ) {
			// that.box.mapbox.light_data[controller.order].sx *= -1 ;
			createjs.Tween.get( controller.light )
			.to( { scaleX: controller.light.scaleX * -1 }, 100 ) ;
		} // else if
	} ) ;
	// Up.
	tools.up = new createjs.Container() ;
	tools.up.icon = G.cacheObjectsController[2].clone( false ) ;
	tools.up.icon.regX = tools.up.icon.regY = tools.up.icon.getBounds().width / 2 ;
	tools.up.icon.scaleX = tools.up.icon.scaleY = 0.7 ;
	tools.up.bg = new createjs.Shape() ;
	tools.up.bg.graphics.f( "#FFFFFF" ).dc( 0, 0, 15 ) ;
	tools.up.bg.alpha = 0.5 ;
	tools.up.x = tools.regX, tools.up.y = tools.regY ;
	tools.up.oriX = tools.up.x, tools.up.oriY = tools.up.y ;
	tools.up.addChild( tools.up.bg, tools.up.icon ) ;
	tools.up.on( "click", function() {
		if ( type == "object" ) {
			var nowIndex = that.box.mapbox.objects.getChildIndex( controller ) ;
			if ( nowIndex >= that.box.mapbox.objects.getNumChildren() - 1 )
				return ;
			var temp = that.box.mapbox.object_data[nowIndex] ;
			that.box.mapbox.object_data[nowIndex] = that.box.mapbox.object_data[nowIndex-1] ;
			that.box.mapbox.object_data[nowIndex-1] = temp ;
		} // if
		else if ( type == "light" ) {
			var nowIndex = that.box.mapbox.light.getChildIndex( controller ) ;
			if ( nowIndex >= that.box.mapbox.light.getNumChildren() - 1 )
				return ;
			var temp = that.box.mapbox.light_data[nowIndex] ;
			that.box.mapbox.light_data[nowIndex] = that.box.mapbox.light_data[nowIndex-1] ;
			that.box.mapbox.light_data[nowIndex-1] = temp ;
		} // else if
		createjs.Tween.get( controller )
		.to( { alpha: 0.5 }, 300 )
		.call( function() {
			if ( type == "object" )
				that.box.mapbox.objects.addChildAt( controller, nowIndex + 1 ) ; 
			else if ( type == "light" )
				that.box.mapbox.light.addChildAt( controller, nowIndex + 1 ) ; 
		} )
		.to( { alpha: 1 }, 300 ) ;
	} ) ;
	// Down.
	tools.down = new createjs.Container() ;
	tools.down.icon = G.cacheObjectsController[3].clone( false ) ;
	tools.down.icon.regX = tools.down.icon.regY = tools.down.icon.getBounds().width / 2 ;
	tools.down.icon.scaleX = tools.down.icon.scaleY = 0.7 ;
	tools.down.bg = new createjs.Shape() ;
	tools.down.bg.graphics.f( "#FFFFFF" ).dc( 0, 0, 15 ) ;
	tools.down.bg.alpha = 0.5 ;
	tools.down.x = tools.regX, tools.down.y = tools.regY ;
	tools.down.oriX = tools.down.x, tools.down.oriY = tools.down.y ;
	tools.down.addChild( tools.down.bg, tools.down.icon ) ;
	tools.down.on( "click", function() {
		if ( type == "object" ) {
			var nowIndex = that.box.mapbox.objects.getChildIndex( controller ) ;
			if ( nowIndex < 2 )
				return ;
			var temp = that.box.mapbox.object_data[nowIndex-1] ;
			that.box.mapbox.object_data[nowIndex-1] = that.box.mapbox.object_data[nowIndex-2] ;
			that.box.mapbox.object_data[nowIndex-2] = temp ;
		} // if
		else if ( type == "light" ) {
			var nowIndex = that.box.mapbox.light.getChildIndex( controller ) 
			if ( nowIndex < 2 )
				return ;
			var temp = that.box.mapbox.light_data[nowIndex-1] ;
			that.box.mapbox.light_data[nowIndex-1] = that.box.mapbox.light_data[nowIndex-2] ;
			that.box.mapbox.light_data[nowIndex-2] = temp ;
		} // else if
		createjs.Tween.get( controller )
		.to( { alpha: 0.5 }, 300 )
		.call( function() {
			if ( type == "object" )
				that.box.mapbox.objects.addChildAt( controller, ( nowIndex > 1 ) ? ( nowIndex - 1 ) : 1 ) ;
			else if ( type == "light" )
				that.box.mapbox.light.addChildAt( controller, ( nowIndex > 1 ) ? ( nowIndex - 1 ) : 1 ) ;
		} )
		.to( { alpha: 1 }, 300 ) ;
	} ) ;
	// Zoom in.
	tools.zoom_in = new createjs.Container() ;
	tools.zoom_in.icon = G.cacheObjectsController[4].clone( false ) ;
	tools.zoom_in.icon.regX = tools.zoom_in.icon.regY = tools.zoom_in.icon.getBounds().width / 2 ;
	tools.zoom_in.icon.scaleX = tools.zoom_in.icon.scaleY = 0.7 ;
	tools.zoom_in.bg = new createjs.Shape() ;
	tools.zoom_in.bg.graphics.f( "#FFFFFF" ).dc( 0, 0, 15 ) ;
	tools.zoom_in.bg.alpha = 0.5 ;
	tools.zoom_in.x = tools.regX, tools.zoom_in.y = tools.regY ;
	tools.zoom_in.oriX = tools.zoom_in.x, tools.zoom_in.oriY = tools.zoom_in.y ;
	tools.zoom_in.addChild( tools.zoom_in.bg, tools.zoom_in.icon ) ;
	tools.zoom_in.on( "click", function() { 
		if ( type == "object" ) {
			// that.box.mapbox.object_data[controller.order].sx *= 1.05 ;
			// that.box.mapbox.object_data[controller.order].sy *= 1.05 ;
		} // if
		else if ( type == "light" ) {
			// that.box.mapbox.light_data[controller.order].sx *= 1.05 ;
			// that.box.mapbox.light_data[controller.order].sy *= 1.05 ;
		} // else if
		createjs.Tween.get( controller )
		.to( { scaleX: controller.scaleX * 1.05, scaleY: controller.scaleY * 1.05 }, 300 ) ;
		createjs.Tween.get( controller.tools )
		.to( { scaleX: controller.scaleX * 1.05, scaleY: controller.scaleY * 1.05 }, 300 ) ;
	} ) ;
	// Zoom out.
	tools.zoom_out = new createjs.Container() ;
	tools.zoom_out.icon = G.cacheObjectsController[5].clone( false ) ;
	tools.zoom_out.icon.regX = tools.zoom_out.icon.regY = tools.zoom_out.icon.getBounds().width / 2 ;
	tools.zoom_out.icon.scaleX = tools.zoom_out.icon.scaleY = 0.7 ;
	tools.zoom_out.bg = new createjs.Shape() ;
	tools.zoom_out.bg.graphics.f( "#FFFFFF" ).dc( 0, 0, 15 ) ;
	tools.zoom_out.bg.alpha = 0.5 ;
	tools.zoom_out.x = tools.regX, tools.zoom_out.y = tools.regY ;
	tools.zoom_out.oriX = tools.zoom_out.x, tools.zoom_out.oriY = tools.zoom_out.y ;
	tools.zoom_out.addChild( tools.zoom_out.bg, tools.zoom_out.icon ) ;
	tools.zoom_out.on( "click", function() { 
		if ( type == "object" ) {
			// that.box.mapbox.object_data[controller.order].sx *= 0.95 ;
			// that.box.mapbox.object_data[controller.order].sy *= 0.95 ;
		} // if
		else if ( type == "light" ) {
			// that.box.mapbox.light_data[controller.order].sx *= 0.95 ;
			// that.box.mapbox.light_data[controller.order].sy *= 0.95 ;
		} // else if
		createjs.Tween.get( controller )
		.to( { scaleX: controller.scaleX * 0.95, scaleY: controller.scaleY * 0.95 }, 300 ) ;
		createjs.Tween.get( controller.tools )
		.to( { scaleX: controller.scaleX * 0.95, scaleY: controller.scaleY * 0.95 }, 300 ) ;
	} ) ;
	// Total icon add to this container.
	tools.addChild( tools.bg, tools.cancel, tools.flip, tools.up, tools.down, tools.zoom_in, tools.zoom_out ) ;
	// Add to the top container.
	controller.addChild( tools ) ;
	return tools ;
} // GetToolsBox()

// Add objects be clicked that event listener.
PreviewBox.prototype.ToolsBoxListener = function( controller, type ) {
	var that = this ;
	// Add listening events.
	stage.enableMouseOver( 20 ) ;
	controller.on( "mousedown", function( evt ) {
		previous = { x: evt.stageX, y: evt.stageY } ;
		createjs.Tween.get( controller.tools ).to( { alpha: 1 }, 500 ) ;
		createjs.Tween.get( controller.tools.bg ).to( { alpha: 0.3 }, 0 ) ;
		// Tools has been put top of mapbox.
		that.box.mapbox.addChild( controller.tools ) ;
		controller.tools.x = controller.x, controller.tools.y = controller.y ;
		// Move bunttons.
		GoTo( controller.tools.cancel, controller.tools.up.oriX, 0 ) ;
		GoTo( controller.tools.flip, controller.tools.up.oriX, controller.getBounds().height + 40 ) ;
		GoTo( controller.tools.up, 0, controller.tools.up.oriY - 20 ) ;
		GoTo( controller.tools.down, 0, controller.tools.up.oriY + 20 ) ;
		GoTo( controller.tools.zoom_in, controller.getBounds().width + 40, controller.tools.up.oriY - 20 ) ;
		GoTo( controller.tools.zoom_out, controller.getBounds().width + 40, controller.tools.up.oriY + 20 ) ;
		
		function GoTo( object, x, y ) {
			createjs.Tween.get( object )
			.to( { x: x, y: y }, 500 ) ;
			createjs.Tween.get( object )
			.to( { rotation: 360 }, 500 ) ;
		} // GoBack()
	} ) ;
	controller.tools.on( "mousedown", function( evt ) {
		previous = { x: evt.stageX, y: evt.stageY } ;
	} ) ;
	controller.tools.on( "rollout", function( evt ) {
		createjs.Tween.get( controller.tools ).to( { alpha: 0 }, 300 ) ;
		// Buttons go back.
		GoBack( controller.tools.cancel ) ;
		GoBack( controller.tools.flip ) ;
		GoBack( controller.tools.up ) ;
		GoBack( controller.tools.down ) ;
		GoBack( controller.tools.zoom_in ) ;
		GoBack( controller.tools.zoom_out ) ;

		function GoBack( object ) {
			createjs.Tween.get( object )
			.to( { x: controller.tools.up.oriX, y: controller.tools.up.oriY }, 300 ) ;
			createjs.Tween.get( object )
			.to( { rotation: -360 }, 300 ) ;
		} // GoBack()
	} ) ;
	controller.on( "pressmove", function( evt ) { 
		ChangeGrid( evt ) ;
	} ) ;
	controller.tools.on( "pressmove", function( evt ) {
		ChangeGrid( evt ) ;
	} ) ;

	function ChangeGrid( evt ) {
		if ( type == "object" )
			var nowIndex = that.box.mapbox.objects.getChildIndex( controller ) - 1 ;
		else if ( type == "light" )
			var nowIndex = that.box.mapbox.light.getChildIndex( controller ) - 1 ;
		var difX = evt.stageX - previous.x, difY = evt.stageY - previous.y ;
		var boundX = ( G.customer_length - that.box.mapbox.tiled.mc ) * G.size, boundY = ( G.customer_height - that.box.mapbox.tiled.mr ) * G.size ;
		// Reject to put the object not out of range.
		if ( controller.x + difX >= 0 && controller.x + difX <= boundX )
			controller.x += difX, previous.x = evt.stageX, controller.tools.x = controller.x ;
		else if ( controller.x + difX < 0 )
			controller.x = 0, controller.tools.x = controller.x ;
		else if ( controller.x + difX > boundX )
			controller.x = boundX, controller.tools.x = controller.x ;
		controller.storeX = Math.ceil( controller.x + that.box.mapbox.tiled.mc * G.size ) ;
		if ( controller.y + difY >= 0 && controller.y + difY <= boundY )
			controller.y += difY, previous.y = evt.stageY, controller.tools.y = controller.y ;
		else if ( controller.y + difY < 0 )
			controller.y = 0, controller.tools.y = controller.y ;
		else if ( controller.y + difY > boundY )
			controller.y = boundY, controller.tools.y = controller.y ;
		controller.storeY = Math.ceil( controller.y + that.box.mapbox.tiled.mr * G.size ) ;
		if ( type == "object" ) {
			that.box.mapbox.object_data[nowIndex].rx = controller.storeX ;
			that.box.mapbox.object_data[nowIndex].ry = controller.storeY ;
		} // if
		else if ( type == "light" ) {
			that.box.mapbox.light_data[nowIndex].rx = controller.storeX ;
			that.box.mapbox.light_data[nowIndex].ry = controller.storeY ;
		} // else if
	} // ChangeGrid()
} // ToolsBoxListener()