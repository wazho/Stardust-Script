function Main_Map( map_num, len, hei, switch_debug ) {
	// 背景建立
	this.backgorond = new createjs.Bitmap( "pic/map/map_" + map_num + ".jpg" ) ;
	// 容器建立(前端與後端)
	this.container_front = new createjs.Container() ;
	this.container_back = new createjs.Container() ;
	this.container_front.name = 'Map_front', this.container_back.name = 'Map_back' ;
	this.container_front.length = this.container_back.length = len ;
	this.container_front.height = this.container_back.height = hei ;
	// 坐標網格建立
	this.grid = new createjs.Container() ;
	this.grid.size = 50 ;
	this.grid.x_max = Math.ceil( this.container_front.length / this.grid.size ) ;
	this.grid.y_max = Math.ceil( this.container_front.height / this.grid.size ) ;
	this.GridCreate( switch_debug ) ;
	this.container_back.addChild( this.grid ) ;
	// 地圖網格上物件管理
	this.controlContainer = new createjs.Container() ;
} // Main_Map()

// 地圖網格上物件管理, 更新物件
Main_Map.prototype.UpdateObject = function( object ) {
	this.controlContainer.addChild( object ) ;
} // UpdateObject()

// 地圖網格上物件管理, 依照名稱取得物件
Main_Map.prototype.GetObjectbyName = function( name ) {
	var object_list = this.controlContainer ;
	var result_list = new createjs.Container() ;
	for ( i = 0 ; i < object_list.getNumChildren() ; i ++ ) {
		object = object_list.getChildAt( i ) ;
		if ( object.name == name )
			result_list.addChild( object ) ;
	} // for
	return result_list ;
} // GetObjectbyName()

// 地圖網格上物件管理, 依照地圖坐標
Main_Map.prototype.GetObjectbyGrid = function( x, y ) {
	var object_list = this.controlContainer ;
	var result_list = new createjs.Container() ;
	for ( i = 0 ; i < object_list.getNumChildren() ; i ++ ) {
		object = object_list.getChildAt( i ) ;
		if ( object.container.grid_x == x && object.container.grid_y == y )
			result_list.addChild( object ) ;
	} // for
	return result_list ;
} // GetObjectbyGrid()

// 除錯模式, 畫格建立顯示
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
		return ( ( type == 'real' ) ? ( Math.ceil( Math.abs( this.container_front.height - grid ) / this.grid.size ) ) : ( this.container_front.height - ( grid - 0.5 ) * this.grid.size ) ) ;
} // GetGrid()

// 漂浮物件建立
Main_Map.prototype.Float_Object = function( type, start_x, start_y, end_x, end_y, alpha, random_jitter, speed ) {
	var image_file = new Image() ;
	image_file.src = "pic/cloud.png" ;
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
}

