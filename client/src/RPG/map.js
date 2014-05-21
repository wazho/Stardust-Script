function Main_Map( map_num, len, hei, switch_debug ) {
	var that = this ;
	// 背景建立
	this.backgorond = new createjs.Container() ;
	// Now trigger event like 'NPC'.
	this.nowEventTrigger = null ;
	// 容器建立(前端與後端)
	this.container_front = new createjs.Container() ;
	this.container_back = new createjs.Container() ;
	this.container_front.name = 'Map_front', this.container_back.name = 'Map_back' ;
	this.container_front.length = this.container_back.length = len ;
	this.container_front.height = this.container_back.height = hei ;
	// 坐標網格建立
	this.mapNum = map_num ;
	this.grid = new createjs.Container() ;
	this.grid.size = this.DrawMap( map_num ) ;
	this.grid.x_max = Math.ceil( this.container_front.length / this.grid.size ) ;
	this.grid.y_max = Math.ceil( this.container_front.height / this.grid.size ) ;
	this.GridCreate( switch_debug ) ;
	this.container_back.addChild( this.grid ) ;

	this.trim = { x: 0, y: 0 } ;

	// 地圖網格上物件管理
	this.controlContainer = new createjs.Container() ;

	this.selectGrid = new createjs.Shape() ;
	this.selectGrid.graphics.f( "#00FF00" )
		.moveTo(0,0).lineTo(10,0).lineTo(10,3).lineTo(3,3).lineTo(3,10).lineTo(0,10).lineTo(0,0)
		.moveTo(32,0).lineTo(32,10).lineTo(29,10).lineTo(29,3).lineTo(22,3).lineTo(22,0).lineTo(32,0)
		.moveTo(0,32).lineTo(10,32).lineTo(10,29).lineTo(3,29).lineTo(3,22).lineTo(0,22).lineTo(0,32)
		.moveTo(32,32).lineTo(22,32).lineTo(22,29).lineTo(29,29).lineTo(29,22).lineTo(32,22).lineTo(32,32) ;
	this.selectGrid.cache( 0, 0, 32, 32 ) ;
	this.selectGrid.alpha = 0.5 ;
	this.container_back.addChild( this.selectGrid ) ;

	stage.on( "stagemousemove", function( evt ) {
		var grid = that.GetGrid( { x: evt.stageX, y: evt.stageY }, "real" ) ;
		that.selectGrid.x = ( that.trim.x + grid.x - 1 ) * that.grid.size ;
		that.selectGrid.y = ( that.trim.y + grid.y - 1 ) * that.grid.size ;
	} ) ;

	stage.enableMouseOver( 20 ) ;
} // Main_Map())

// // 地圖網格上物件管理, 依照名稱取得物件
// Main_Map.prototype.GetObjectbyName = function( name ) {
// 	var object_list = this.controlContainer ;
// 	var result_list = new createjs.Container() ;
// 	for ( i = 0 ; i < object_list.getNumChildren() ; i ++ ) {
// 		object = object_list.getChildAt( i ) ;
// 		if ( object.name == name )
// 			result_list.addChild( object.Clone() ) ;
// 	} // for
// 	return result_list ;
// } // GetObjectbyName()

// // 地圖網格上物件管理, 依照地圖坐標
// Main_Map.prototype.GetObjectbyGrid = function( x, y ) {
// 	var object_list = this.controlContainer ;
// 	var result_list = new createjs.Container() ;
// 	for ( i = 0 ; i < object_list.getNumChildren() ; i ++ ) {
// 		object = object_list.getChildAt( i ) ;
// 		if ( object.container.grid_x == x && object.container.grid_y == y )
// 			result_list.addChild( object.Clone() ) ;
// 	} // for
// 	return result_list ;
// } // GetObjectbyGrid()

// // 除錯模式, 畫格建立顯示
Main_Map.prototype.GridCreate = function( switch_debug ) {
	this.debug_mode = new createjs.Shape() ;
	this.debug_mode.alpha = 0.1 ;
	for ( i = 0 ; i < ( this.container_front.length / this.grid.size ) ; i ++ )
		for ( j = 0 ; j < ( this.container_front.height / this.grid.size ) ; j ++ )
			this.debug_mode.graphics.f( "#FFF" ).r( ( ( ( i + j ) % 2 ) ?              0 : this.grid.size ) + this.grid.size * i, this.grid.size * j, this.grid.size, this.grid.size ),
			this.debug_mode.graphics.f( "#000" ).r( ( ( ( i + j ) % 2 ) ? this.grid.size :              0 ) + this.grid.size * i, this.grid.size * j, this.grid.size, this.grid.size ) ;
	if ( switch_debug )
		this.grid.addChild( this.debug_mode ) ;
} // GridCreate()

// type'real'    -> real coordinate to virtual grid
// type'virtual' -> virtual grid to real coordinate 
Main_Map.prototype.GetGrid = function( grid, type ) {
	var x = ( type == 'real' ) ? ( Math.ceil( this.grid.x_max - Math.abs( this.container_front.length - grid.x ) / this.grid.size ) ) : ( ( grid.x - 0.5 ) * this.grid.size ) ;
	var y = ( type == 'real' ) ? ( Math.ceil( this.grid.y_max - Math.abs( this.container_front.height - grid.y ) / this.grid.size ) ) : ( ( grid.y - 0.5 ) * this.grid.size ) ;
	return { x: x, y: y } ;
} // GetGrid()

// 漂浮物件建立
Main_Map.prototype.Float_Object = function( type, start_x, start_y, end_x, end_y, alpha, random_jitter, speed ) {
	var image_file = new Image() ;
	image_file.src = "cloud.png" ;
	this.image = new createjs.Bitmap( image_file ) ;
	this.image.x = start_x, this.image.y = start_y ;
	this.image.alpha = 0.5 ;

	// this.container.addChild( this.image ) ;
	// createjs.Tween.get( image, { loop: true } ).to( { x: start_x + ( end_x - start_x ) / 3, y: end_y + this.GetRand( random_jitter ) }, speed )
	// 					.to( { x: start_x + ( end_x - start_x ) / 3 * 2, y: end_y + this.GetRand( random_jitter ) }, speed )
	// 					.to( { x: end_x, y: end_y + this.GetRand( random_jitter ) }, speed ) ;

	// GetRand : function( random_jitter ) {
	// 	return ( random_jitter * 2 * Math.random() - random_jitter ) ;
	// } // GetRand()
} // Float_Object()

// DrawMap
Main_Map.prototype.DrawMap = function( index ) {
	var mapPixel = cacheMapData.map[index].tilePixel ;
	var mapName = cacheMapData.map[index].name ;
	var mapLength = cacheMapData.map[index].length, mapHeight = cacheMapData.map[index].height ;
	var mapTile = cacheMapData.map[index].tileData ;
	var mapObject = cacheMapData.map[index].objectData ;
	console.log( "Now Loading map: " + mapName + " (" + mapLength + "*" + mapHeight + ")" ) ;

	var map = new createjs.Container() ;

	for ( row = 0 ; row < mapHeight ; row ++ )
		for ( column = 0 ; column < mapLength ; column ++ ) {
			var tileIndex_row = Math.floor( mapTile[row][column].i / ( 256 / mapPixel ) ) ;
			var tileIndex_column = mapTile[row][column].i % ( 256 / mapPixel ) ;
			var tile = G.cacheTile[mapTile[row][column].m].clone( false ) ;
			tile.sourceRect = new createjs.Rectangle( mapPixel * tileIndex_column, mapPixel * tileIndex_row, mapPixel, mapPixel ) ;
			tile.cache( 0, 0, mapPixel, mapPixel ) ;
			tile.x = mapPixel * column, tile.y = mapPixel * row ;
			this.container_back.addChild( tile ) ;
		} // for
	for ( count = 0 ; count < mapObject.length ; count ++ ) {
		var object = G.cacheObject[mapObject[count].n-1].clone( false ) ;
		object.x = mapObject[count].rx, object.y = mapObject[count].ry ;
		object.scaleX = mapObject[count].sx, object.scaleY = mapObject[count].sy ;
		object.regX = object.getBounds().width / 2, object.regY = object.getBounds().height / 2 ; 
		this.container_front.addChild( object ) ;
	} // for

	return mapPixel ;
} // DrawMap()

// Main_Map - MapMove
// When the player clicked any grid if wanna to move the character.
// The character need to keep on the center, so map need to move.
// parameter(start) : start grid, there are x, y virtual grid (index starts from 1). 
// parameter(end) : end grid, there are x, y virtual grid (index starts from 1). 
Main_Map.prototype.MapMove = function( start, end ) {
	var that = this ;
	// Get this map data that player exists.
	var mapTile = cacheMapData.map[this.mapNum].tileData ;
	// Reject the bound of map, player cursor clicked the bound of map.
	if ( end.x <= 0 || end.y <= 0 || end.x > mapTile[0].length || end.y > mapTile.length )
		return false ;
	// First to check this end grid is walkable or not.
	// If it's walkable, then move the map to center.
	var ifWalkable = mapTile[end.y-1][end.x-1].w ;
	if ( ifWalkable == 1 ) {
		// Checking the route is exist or not.
		if ( ! A_Start_Algorithm( start, end ) )
			return false ;
		// Compute the distance between center.
		var distanceX = end.x - this.trim.x - 16, distanceY = end.y - this.trim.y - 11 ;
		// Trim the distance about cursor of the map .
		this.trim.x += distanceX, this.trim.y += distanceY ;
		var timeDelay = Math.abs( distanceX ) + Math.abs( distanceY ) ;
		createjs.Tween.get( this.container_back ).to( { x: this.container_back.x - distanceX * this.grid.size, y: this.container_back.y - distanceY * this.grid.size }, 100 * timeDelay ) ;
		createjs.Tween.get( this.container_front ).to( { x: this.container_back.x - distanceX * this.grid.size, y: this.container_back.y - distanceY * this.grid.size }, 100 * timeDelay ) ;
	} // if

	return ( ifWalkable == 1 ) ? true : false ;

	function A_Start_Algorithm( start, end ) {
		// Copy the 'w' element of mapTile array to aStarTile array.
		var aStarTile = TwoD_Array( mapTile.length, mapTile[0].length ) ;
		for ( i = 0 ; i < mapTile.length ; i ++ )
			for ( j = 0 ; j < mapTile[0].length ; j ++ )
				aStarTile[i][j] = new AStarTileDatastruct( mapTile[i][j].w ) ;
		// Functions make them shorter.
		var	abs = Math.abs ;
		var	max = Math.max ;
		var	pow = Math.pow ;
		var	sqrt = Math.sqrt ;

		// ~~~~~~~~~~

		console.log( aStarTile[end.y-2][end.x-2].walkable, aStarTile[end.y-2][end.x-1].walkable, aStarTile[end.y-2][end.x].walkable ) ;
		console.log( aStarTile[end.y-1][end.x-2].walkable, 9, aStarTile[end.y-1][end.x].walkable ) ;
		console.log( aStarTile[end.y][end.x-2].walkable, aStarTile[end.y][end.x-1].walkable, aStarTile[end.y][end.x].walkable ) ;


		console.log( start.x + "," + start.y + " to " + end.x + "," + end.y ) ;

		return true ;

		function AStarTileDatastruct( walk ){
			this.walkable = walk ;
			this.g = 0 ;
			this.h = 0 ;
			this.f = 0 ;
		} // AStarTileDatastruct()
	} // A_Start_Algorithm()
} // MapMove

