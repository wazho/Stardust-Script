function Main_Map( mapNum, canvasSize, switchDebug ) {
	var that = this ;
	// Now trigger event when player select the object like 'NPC' (NPC container pointer).
	this.nowEventTrigger = null ;
	// Containes create. Front: objects, characters ; Back: floor texture.
	CreateContainer() ;
	// Create the virtual grid system.
	CreateGridSystem() ;
	// Trim the grids to keep on center view of players.
	this.trim = { x: 0, y: 0 } ;
	// Cursor of grid. When the mouse moving, it will follow.
	AddingFollowingCursor() ;

	function CreateContainer() {
		that.container_front = new createjs.Container() ;
		that.container_back = new createjs.Container() ;
		that.container_front.name = mapNum + "(Map front)", that.container_back.name = mapNum + "(Map back)" ;
		that.container_front.length = that.container_back.length = canvasSize.length ;
		that.container_front.height = that.container_back.height = canvasSize.height ;
	} // CreateContainer()
	function CreateGridSystem() {
		that.mapNum = mapNum ;
		that.grid = new createjs.Container() ;
		that.grid.size = that.DrawMap( mapNum ) ;
		that.grid.maxX = Math.ceil( that.container_front.length / that.grid.size ) ;
		that.grid.maxY = Math.ceil( that.container_front.height / that.grid.size ) ;
		that.DebugMode( switchDebug ) ;
		that.container_back.addChild( that.grid ) ;
	} // CreateGridSystem()
	function AddingFollowingCursor() {
		that.selectGrid = new createjs.Shape() ;
		that.selectGrid.graphics.f( "#00FF00" )
			.moveTo(0,0).lineTo(10,0).lineTo(10,3).lineTo(3,3).lineTo(3,10).lineTo(0,10).lineTo(0,0)
			.moveTo(32,0).lineTo(32,10).lineTo(29,10).lineTo(29,3).lineTo(22,3).lineTo(22,0).lineTo(32,0)
			.moveTo(0,32).lineTo(10,32).lineTo(10,29).lineTo(3,29).lineTo(3,22).lineTo(0,22).lineTo(0,32)
			.moveTo(32,32).lineTo(22,32).lineTo(22,29).lineTo(29,29).lineTo(29,22).lineTo(32,22).lineTo(32,32) ;
		that.selectGrid.cache( 0, 0, 32, 32 ) ;
		that.selectGrid.alpha = 0.5 ;
		that.container_back.addChild( that.selectGrid ) ;
		FollowingListener() ;

		function FollowingListener() {
			stage.enableMouseOver( 20 ) ;
			stage.on( "stagemousemove", function( evt ) {
				var grid = that.GetGrid( { x: evt.stageX, y: evt.stageY }, "real" ) ;
				that.selectGrid.x = ( that.trim.x + grid.x - 1 ) * that.grid.size ;
				that.selectGrid.y = ( that.trim.y + grid.y - 1 ) * that.grid.size ;
			} ) ;
		} // FollowingListener()
	} // AddingFollowingCursor()
} // Main_Map())

// Debug mode. Draw the block of grids.
Main_Map.prototype.DebugMode = function( switchDebug ) {
	this.debug_mode = new createjs.Shape() ;
	this.debug_mode.alpha = 0.1 ;
	for ( i = 0 ; i < ( this.container_front.length / this.grid.size ) ; i ++ )
		for ( j = 0 ; j < ( this.container_front.height / this.grid.size ) ; j ++ )
			this.debug_mode.graphics.f( "#FFF" ).r( ( ( ( i + j ) % 2 ) ?              0 : this.grid.size ) + this.grid.size * i, this.grid.size * j, this.grid.size, this.grid.size ),
			this.debug_mode.graphics.f( "#000" ).r( ( ( ( i + j ) % 2 ) ? this.grid.size :              0 ) + this.grid.size * i, this.grid.size * j, this.grid.size, this.grid.size ) ;
	if ( switchDebug )
		this.grid.addChild( this.debug_mode ) ;
} // DebugMode()

// type'real'    -> real coordinate to virtual grid
// type'virtual' -> virtual grid to real coordinate 
Main_Map.prototype.GetGrid = function( grid, type ) {
	var x = ( type == 'real' ) ? ( Math.ceil( this.grid.maxX - Math.abs( this.container_front.length - grid.x ) / this.grid.size ) ) : ( ( grid.x - 0.5 ) * this.grid.size ) ;
	var y = ( type == 'real' ) ? ( Math.ceil( this.grid.maxY - Math.abs( this.container_front.height - grid.y ) / this.grid.size ) ) : ( ( grid.y - 0.5 ) * this.grid.size ) ;
	return { x: x, y: y } ;
} // GetGrid()

// Draw the map.
// Back part is drawing the floor texture.
// Front part is putting the objects, characters.
Main_Map.prototype.DrawMap = function( index ) {
	var mapPixel = cacheMapData.map[index].tilePixel ;
	var mapName = cacheMapData.map[index].name ;
	var mapLength = cacheMapData.map[index].length, mapHeight = cacheMapData.map[index].height ;
	var mapTile = cacheMapData.map[index].tileData ;
	var mapObject = cacheMapData.map[index].objectData ;
	console.log( "Now Loading map: " + mapName + " (" + mapLength + "*" + mapHeight + ")" ) ;

	var map = new createjs.Container() ;
	// Back of map that there is texture.
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
	// Front of map that there are objects.
	for ( count = 0 ; count < mapObject.length ; count ++ ) {
		var object = G.cacheObject[mapObject[count].n-1].clone( false ) ;
		object.x = mapObject[count].rx, object.y = mapObject[count].ry ;
		object.regX = object.getBounds().width / 2, object.regY = object.getBounds().height / 2 ; 
		object.scaleX = mapObject[count].sx, object.scaleY = mapObject[count].sy ;
		this.container_front.addChild( object ) ;
		// Get each division range of objects, then trim to really center y of objects.
		var objectDivi = G.cacheObjectDivi[mapObject[count].n-1] ;
		var objectHeight = object.getBounds().height * object.scaleY ;
		object.y = Math.floor( object.y - objectHeight / 2 + objectHeight * objectDivi ) ;
		object.regY = object.regY - object.getBounds().height / 2 + object.getBounds().height * objectDivi ;
	} // for
	// Resorting of objects.
	for ( m = this.container_front.getNumChildren() ; m > 0 ; m -- )
		for ( n = 0 ; n < m - 1 ; n ++ )
			if ( this.container_front.getChildAt( n ).y > this.container_front.getChildAt( n + 1 ).y ) 
				this.container_front.swapChildren( this.container_front.getChildAt( n ), this.container_front.getChildAt( n + 1 ) ) ;
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

		// console.log( aStarTile[end.y-2][end.x-2].walkable, aStarTile[end.y-2][end.x-1].walkable, aStarTile[end.y-2][end.x].walkable ) ;
		// console.log( aStarTile[end.y-1][end.x-2].walkable, 9, aStarTile[end.y-1][end.x].walkable ) ;
		// console.log( aStarTile[end.y][end.x-2].walkable, aStarTile[end.y][end.x-1].walkable, aStarTile[end.y][end.x].walkable ) ;


		// console.log( start.x + "," + start.y + " to " + end.x + "," + end.y ) ;

		return true ;

		function AStarTileDatastruct( walk ){
			this.walkable = walk ;
			this.g = 0 ;
			this.h = 0 ;
			this.f = 0 ;
		} // AStarTileDatastruct()
	} // A_Start_Algorithm()
} // MapMove

