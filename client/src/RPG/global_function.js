// Cache game data.

function cacheMapData() {
	$.getJSON( "_adding.json", function( data ) {
		var mapCount = data.file.length ;

		alert( "Total have : " + mapCount ) ;

		var cacheMapData = new Array(  ) ;
		$.getJSON( "1.json", function( data ) {
			alert( "My data: " + data.name ) ;
		} ) ;
	} ) ;


} // cacheMapData()


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