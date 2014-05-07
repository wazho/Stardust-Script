function GlobalValues() {
	this.size = 32 ;
	this.range = 8 ;
	this.length = 18 ;
	this.height = 14 ;
	this.customer_length = 0 ;
	this.customer_height = 0 ;
	this.textureSrc = "pic/map/texture/" ;
	this.objectSrc = "pic/map/object/" ;


	var preload = new createjs.LoadQueue() ;
	preload.addEventListener( "fileload", handleFileComplete ) ;
	for ( i = 1 ; i < 10 ; i ++ )
		new createjs.Bitmap( 'pic/map/object/' + i + '.png' ) ;
	function handleFileComplete( event ) {
		document.body.appendChild( event.result ) ;
	}
} // Tiled_Datastruct()

var G = new GlobalValues() ;