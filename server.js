var express = require( 'express' ) ;
var app = express() ;
var server = require( 'http' ).createServer( app ) ;
var io = require( 'socket.io' ).listen( server, { log: false } ) ;

var port = 8001 ;

// Static files.
app.use( express.static( __dirname + "/client/css" ) ) ;
app.use( express.static( __dirname + "/client/pic" ) ) ;
app.use( express.static( __dirname + "/client/skin" ) ) ;
app.use( express.static( __dirname + "/client/sound" ) ) ;
app.use( express.static( __dirname + "/client/src" ) ) ;

// Server socket listener.
server.listen( port ) ;

// Send game index.html file.
app.get( '/', function ( req, res ) {
    res.sendfile( __dirname + '/client/game.html' ) ;
} ) ;

io.sockets.on( 'connection', function ( socket ) {
    socket.emit( 'clientConnect', { message: 'hi, you connect success!' } ) ;

    socket.on( 'clientConnect', function ( data ) {
        console.log( 'Got: ' + data.message ) ;
        socket.broadcast.emit( 'clientConnect', { message: data.message } ) ;
    } ) ;

    socket.on( 'playerMove', function ( data ) {
        socket.broadcast.emit( 'playerMove', { state: data } ) ;
    } ) ;
} ) ;