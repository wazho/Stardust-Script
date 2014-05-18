function Main_Map( map_num, len, hei, switch_debug ) {
	var that = this ;
	// 背景建立
	this.backgorond = new createjs.Container() ;
	// 容器建立(前端與後端)
	this.container_front = new createjs.Container() ;
	this.container_back = new createjs.Container() ;
	this.container_front.name = 'Map_front', this.container_back.name = 'Map_back' ;
	this.container_front.length = this.container_back.length = len ;
	this.container_front.height = this.container_back.height = hei ;
	// 坐標網格建立
	this.grid = new createjs.Container() ;
	this.grid.size = this.DrawMap( map_num ) ;
	this.grid.x_max = Math.ceil( this.container_front.length / this.grid.size ) ;
	this.grid.y_max = Math.ceil( this.container_front.height / this.grid.size ) ;
	this.GridCreate( switch_debug ) ;
	this.container_back.addChild( this.grid ) ;

	this.trim_x = 0, this.trim_y = 0 ;

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
		that.selectGrid.x = ( that.trim_x + that.GetGrid( evt.stageX, 'x', 'real' ) - 1 ) * that.grid.size ;
		that.selectGrid.y = ( that.trim_y + that.GetGrid( evt.stageY, 'y', 'real' ) - 1 ) * that.grid.size ;
	} ) ;
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
Main_Map.prototype.GetGrid = function( grid, select, type ) {
	if ( select == 'x' )
		return ( ( type == 'real' ) ? ( Math.ceil( this.grid.x_max - Math.abs( this.container_front.length - grid ) / this.grid.size ) ) : ( ( grid - 0.5 ) * this.grid.size ) ) ;
	else if ( select == 'y' )
		return ( ( type == 'real' ) ? ( Math.ceil( this.grid.y_max - Math.abs( this.container_front.height - grid ) / this.grid.size ) ) : ( ( grid - 0.5 ) * this.grid.size ) ) ;
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

Main_Map.prototype.MapMove = function( x, y, speed ) {
	var that = this ;
	var mapTile = cacheMapData.map[0].tileData ;
	// Reject the bound of map.
	if ( x <= 0 || y <= 0 || x > mapTile[0].length || y > mapTile.length )
		return false ;
	var ifWalkable = mapTile[y-1][x-1].w ;
	// Move the map to center.
	if ( ifWalkable == 1 ) {
		// Compute the distance between center.
		var distanceX = x - this.trim_x - 16, distanceY = y - this.trim_y - 11 ;
		// Trim the distance about cursor of the map .
		this.trim_x += distanceX, this.trim_y += distanceY ;
		var timeDelay = Math.abs( distanceX ) + Math.abs( distanceY ) ;
		createjs.Tween.get( this.container_back ).to( { x: this.container_back.x - distanceX * this.grid.size, y: this.container_back.y - distanceY * this.grid.size }, 100 * timeDelay ) ;
		createjs.Tween.get( this.container_front ).to( { x: this.container_back.x - distanceX * this.grid.size, y: this.container_back.y - distanceY * this.grid.size }, 100 * timeDelay ) ;
	} // if

	console.log( "(" + x + "," + y + ") Can" + ( ( ifWalkable == 0 ) ? "not" : "" ) + " walk." ) ;

	return ( ifWalkable == 1 ) ? true : false ;
} // MapMove

