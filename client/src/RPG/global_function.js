function GlobalValues() {
	this.tileSrc = "map_texture/texture/" ;
	this.objectSrc = "map_texture/object/" ;

	// Texture.
	this.cacheTile = new Array( texture_adding.length ) ;
	this.cacheTile[0] = new createjs.Bitmap( this.tileSrc + "0.png" ) ;
	for ( i = 0 ; i < texture_adding.length ; i ++ )
		this.cacheTile[i+1] = new createjs.Bitmap( this.tileSrc + texture_adding[i].file ) ;
	// Objects.
	this.cacheObject = new Array( object_adding.length ) ;
	this.cacheObjectDivi = new Array( object_adding.length ) ;
	for ( i = 0 ; i < object_adding.length ; i ++ ) {
		this.cacheObject[i] = new createjs.Bitmap( this.objectSrc + object_adding[i].file ) ;
		this.cacheObject[i].name = object_adding[i].file ;
		this.cacheObjectDivi[i] = object_adding[i].divi ;
	} // for
} // GlobalValues()

var G = new GlobalValues() ;


// Key event listening.

var KEYCODE_ENTER = 13 ;
var KEYCODE_SPACE = 32 ;
var KEYCODE_UP = 38 ;
var KEYCODE_LEFT = 37 ;
var KEYCODE_RIGHT = 39 ;
var KEYCODE_DOWN = 40 ;
var KEYCODE_Q = 81 ;
var KEYCODE_W = 87 ;
var KEYCODE_A = 65 ;
var KEYCODE_D = 68 ;
var KEYCODE_S = 83 ;
var KEYCODE_Z = 90 ;
var KEYCODE_X = 88 ;

var pressed = [] ;
	
document.onkeydown = handleKeyDown ;
document.onkeyup = handleKeyUp ;

function handleKeyDown( e ) {
	// console.log( "pressed:" + e.keyCode ) ;
	pressed[e.keyCode] = true ;
} // handleKeyDown()

function handleKeyUp( e ) {
	// console.log( "released:" + e.keyCode ) ;
	pressed[e.keyCode] = false ;
} // handleKeyUp()

function tick( event ) {
	fpsLabel.text = Math.round( createjs.Ticker.getMeasuredFPS() ) + " fps" ;
	stage.update() ;
} // tick()

// 半形全形判斷
function halfFullCheck( type, text ) { 
	var arr = ( type == "half" ) ? text.match( /[\x00-\xff]/g ) : text.match( /[^\x00-\xff]/g ) ; 
	return ( arr ) ? arr.length : 0 ;
} // halfFullCheck

function GetDistance( x1, y1, x2, y2 ) {
    var xs = x1 - x2 ;
    xs = xs * xs;
    var ys = y1 - y2 ;
    ys = ys * ys ;

    return Math.sqrt( xs + ys );
} // GetDistance()

function TwoD_Array( row, column ) {
	var array = new Array( row ) ;
	for ( i = 0 ; i < row ; i ++ )
		array[i] = new Array( column ) ;
	
	return array ;
} // TwoD_Array()