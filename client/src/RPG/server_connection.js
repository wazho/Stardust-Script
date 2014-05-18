function sendPlayerStateToServer() {
    var playerData = {
        x : 123
    } ;

    if ( socket )
    	socket.emit( 'playerMove', "~Move~" ) ;
} // sendPlayerStateToServer()