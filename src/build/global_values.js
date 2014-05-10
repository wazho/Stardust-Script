function GlobalValues() {
	this.size = 32 ;
	this.range = 8 ;
	this.length = 18 ;
	this.height = 14 ;
	this.customer_length = 20 ;
	this.customer_height = 13 ;
	this.textureSrc = "pic/map/texture/" ;
	this.objectSrc = "pic/map/object/" ;
	this.objectConSrc = "pic/map_build/" ;

	this.cacheTexture = new Array( texture_adding.length ) ;
	for ( i = 0 ; i < texture_adding.length ; i ++ )
		this.cacheTexture[i] = new createjs.Bitmap( this.textureSrc + texture_adding[i].file ) ;
	this.cacheObjects = new Array( object_adding.length ) ;
	for ( i = 0 ; i < object_adding.length ; i ++ ) {
		this.cacheObjects[i] = new createjs.Bitmap( this.objectSrc + object_adding[i].file ) ;
		this.cacheObjects[i].name = ( i + 1 ) ;
	} // for
	this.cacheObjectsController = new Array( 6 ) ;
	this.cacheObjectsController[0] = new createjs.Bitmap( this.objectConSrc + "object_cancel.png" ) ;
	this.cacheObjectsController[1] = new createjs.Bitmap( this.objectConSrc + "object_flip.png" ) ;
	this.cacheObjectsController[2] = new createjs.Bitmap( this.objectConSrc + "object_up.png" ) ;
	this.cacheObjectsController[3] = new createjs.Bitmap( this.objectConSrc + "object_down.png" ) ;
	this.cacheObjectsController[4] = new createjs.Bitmap( this.objectConSrc + "object_zoom_in.png" ) ;
	this.cacheObjectsController[5] = new createjs.Bitmap( this.objectConSrc + "object_zoom_out.png" ) ;
} // Tiled_Datastruct()

var G = new GlobalValues() ;