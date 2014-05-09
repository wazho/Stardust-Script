function GlobalValues() {
	this.size = 32 ;
	this.range = 8 ;
	this.length = 18 ;
	this.height = 14 ;
	this.customer_length = 15 ;
	this.customer_height = 5 ;
	this.textureSrc = "pic/map/texture/" ;
	this.objectSrc = "pic/map/object/" ;

	this.cacheTexture = new Array( texture_adding.length ) ;
	for ( i = 0 ; i < texture_adding.length ; i ++ )
		this.cacheTexture[i] = new createjs.Bitmap( this.textureSrc + texture_adding[i].file ) ;
	this.cacheObjects = new Array( object_adding.length ) ;
	for ( i = 0 ; i < object_adding.length ; i ++ )
		this.cacheObjects[i] = new createjs.Bitmap( this.objectSrc + object_adding[i].file ) ;
} // Tiled_Datastruct()

var G = new GlobalValues() ;