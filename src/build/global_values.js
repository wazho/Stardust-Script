function GlobalValues() {
	this.size = 32 ;
	this.range = 8 ;
	this.length = 18 ;
	this.height = 14 ;
	this.customer_length = 70 ;
	this.customer_height = 50 ;
	this.textureSrc = "pic/map/texture/" ;
	this.objectSrc = "pic/map/object/" ;
	this.objectConSrc = "pic/map_build/" ;
	// Sample.
	this.sampleSheet = new createjs.SpriteSheet( {
		"images": ["pic/map_build/cover_sample.png"], 
		"frames": { "width": 125, "height": 125, "regX": 63, "regY": 63, "count": 8 },
		"animations": { "walk": { "frames": [0,1,2,3,4,5,6,7], "speed": 0.3 } }
	} ) ;
	this.cacheSample = new createjs.Sprite( this.sampleSheet ) ;
	// Texture.
	this.cacheTexture = new Array( texture_adding.length ) ;
	for ( i = 0 ; i < texture_adding.length ; i ++ )
		this.cacheTexture[i] = new createjs.Bitmap( this.textureSrc + texture_adding[i].file ) ;
	// Objects.
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
	// Light.
	this.lightAmount = 2 ;

} // Tiled_Datastruct()

var G = new GlobalValues() ;