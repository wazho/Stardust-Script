function NPC( MapControl, Name, grid, sheet, direction ) {
	this.OnCreate( MapControl, Name, grid, sheet, direction ) ;
	return this ;
} // NPC() 

// NPC character object is created.
NPC.prototype.OnCreate = function( MapControl, Name, grid, sheet, direction ) {
	var that = this ;
	// Magic Number !!
	this.spriteSize = 125 ;
	// Map back and map front are both in map controller.
	this.MapControlPointer = MapControl ;
	// NPC container created.
	this.container = new createjs.Container() ;
	this.container.regX = this.spriteSize / 2, this.container.regY = this.spriteSize / 2 ;
	this.container.length = this.spriteSize, this.container.height = this.spriteSize ;
	var realGrid = this.MapControlPointer.GetGrid( { x: grid.x, y: grid.y }, "virtual" ) ;
	this.container.x = realGrid.x + this.container.regX, this.container.y = realGrid.y + this.container.regY * 0.3 ;
	// Basic NPC info.
	this.container.name = Name ;
	this.container.type = "NPC" ;
	this.container.direction = direction ;
	this.container.sheet = sheet ;
	this.container.grid_x = grid.x, this.container.grid_y = grid.y ;
	// Adding to the map (in front od all map elements).
	this.MapControlPointer.container_front.addChild( this.container ) ;
	// NPC's sprite.
	this.sprite = new createjs.Sprite( SettingSprite( sheet.type, sheet.name ) ) ;
	this.sprite.regX = this.spriteSize / 2, this.sprite.regY = this.spriteSize / 2 ;
	this.container.addChild( this.sprite ) ;
	// Default the direction of this NPC.
	this.OnDirection( this.container.direction, "front" ) ;
	// Shadow created.
	this.sprite.shadow = new createjs.Shadow( "#454", 5, 5, 5 ) ;
	// Window of conversation.
	this.talk = new createjs.Container() ;
	this.talk.regX = this.spriteSize / 2, this.talk.regY = this.spriteSize / 2 ;
	this.container.addChild( this.talk ) ;
	this.talk.bg = new createjs.Shape() ;
	this.talk.wd = new createjs.Text( "", "17px Courier New", "#FFF" ) ;
	this.talk.fadetime = 0 ;
	this.talk.addChild( this.talk.bg, this.talk.wd ) ;


	this.container.on( "mouseover", function() { that.MapControlPointer.nowEventTrigger = that ; } ) ;
	this.container.on( "mouseout", function() { that.MapControlPointer.nowEventTrigger = null ; } ) ;
} // OnCreate()

// Clone the NPC. Except NPC's info isn's inherited, all for the script is inherited.
NPC.prototype.Clone = function( name, grid, direction ) {
	var clone = new NPC( this.MapControlPointer, name, grid, this.container.sheet, direction ) ;
	return clone ;
} // Clone()

// Rotate and change the sprite sheet.
NPC.prototype.OnDirection = function( direction, type ) {
	this.sprite.scaleX = ( direction != -1 ) ? ( ( direction > 0 && direction <= 4 ) ? -1 : 1 ) : direction ;
	this.direction = ( direction != -1 ) ? direction : this.direction ;
	this.sprite.gotoAndPlay( type ) ;
} // OnDirection()

// Character object show the window of conversation.
NPC.prototype.OnTalk = function( text ) {
	var that = this ;
	// Initial of the window.
	OffTalk( that, "now" ) ;
	// Get the text and check the half or full char.
	var chat_len = 20 + ( halfFullCheck( "half", text ) * 1.03 + halfFullCheck( "full", text ) * 1.71 ) * 10 ;
	// Set the status of window.
	this.talk.bg.alpha = 0.65 ;
	this.talk.bg.graphics.f( "#000" ).r( 0, 0, chat_len, 25 ) ;
	this.talk.wd.text = text ;
	this.talk.wd.x = 10, this.talk.wd.y = 6 ;
	this.talk.wd.alpha = 0.9 ;
	this.talk.x = 67 - chat_len / 2, this.talk.y = -15 ;
	// Fade animation.
	createjs.Tween.get( that.container )
	.call( function() { 
		OffTalk( that, "fade" ) ;
	} ) ;

	function OffTalk( pt, type ) {
		if ( type == "now" ) {
			pt.talk.wd.text = "" ;
			pt.talk.bg.graphics.c() ;
		} // if
		else if ( type == "fade" ) {
			pt.talk.fadetime += 3000 ;
			pt.TimeSleep( function() {
	 			pt.talk.wd.text = "" ;
				pt.talk.bg.graphics.c() ;
			} ) ;
		} // else if
	} // OffTalk()
} // OnTalk()

// Open a dialog for player's window.
NPC.prototype.OnDialog = function() {
	$( "#dialog_01" ).dialog( "open" ) ;
} // OnDialog()

// When NPC is clicked, it will be triggered.
NPC.prototype.OnTrigger = function() {
	var that = this ;
	this.OnTalk( "You click me. I'm " + that.container.name ) ;
} // OnTrigger()

// Sleeping function.
NPC.prototype.TimeSleep = function( func ) {
	var that = this ;
	setTimeout( function() {
		if ( that.talk.fadetime > 0 ) {
			that.talk.fadetime -= 1000 ;
			that.TimeSleep( func ) ;
		} // if
		else
			func() ;
	}, 1000 ) ;
} // TimeSleep()