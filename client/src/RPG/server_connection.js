function sendPlayerStateToServer() {
    var playerData = {
        x : 123
    } ;
    console.log( "you are move." ) ;

    if ( socket )
    	socket.emit( 'playerMove', "~Move~" ) ;
} // sendPlayerStateToServer()