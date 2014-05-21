function NPC( MapControl, Name, grid, sheet, direction ) {
	this.OnCreate( MapControl, Name, grid, sheet, direction ) ;
	return this ;
} // NPC() 

// NPC character object is created.
NPC.prototype.OnCreate = function( MapControl, Name, grid, sheet, direction ) {
	var that = this ;
	// Size of sprite per sheet.
	this.spriteSize = 125 ;
	// Map back and map front are both in map controller.
	this.MapControlPointer = MapControl ;
	// NPC container created.
	CreateContainer() ;
	// Basic NPC info.
	AddingBasicInfo() ;
	// NPC's sprite.
	AddingSprite() ;
	// Shadow created.
	AddingShadow() ;
	// Window of conversation.
	AddingTalkWindow() ;
	// Name tag.
	AddingNametag() ;
	// Add NPC is passed by mouse.
	AddingMouseEvent() ;

	function CreateContainer() {
		that.container = new createjs.Container() ;
		that.container.regX = that.spriteSize / 2, that.container.regY = that.spriteSize / 2 ;
		that.container.length = that.spriteSize, that.container.height = that.spriteSize ;
		var realGrid = that.MapControlPointer.GetGrid( { x: grid.x, y: grid.y }, "virtual" ) ;
		that.container.x = realGrid.x + that.container.regX, that.container.y = realGrid.y + that.container.regY * 0.3 ;
	} // CreateContainer()
	function AddingBasicInfo() {
		that.container.name = Name ;
		that.container.type = "NPC" ;
		that.container.direction = direction ;
		that.container.sheet = sheet ;
		that.container.grid_x = grid.x, that.container.grid_y = grid.y ;
		// Adding to the map (in front od all map elements).
		that.MapControlPointer.container_front.addChild( that.container ) ;
	} // AddingBasicInfo()
	function AddingSprite() {
		that.sprite = new createjs.Sprite( SettingSprite( sheet.type, sheet.name ) ) ;
		that.sprite.regX = that.spriteSize / 2, that.sprite.regY = that.spriteSize / 2 ;
		that.container.addChild( that.sprite ) ;
		// Default the direction of this NPC.
		that.OnDirection( that.container.direction, "front" ) ;
	} // AddingSprite()
	function AddingShadow() {
		that.sprite.shadow = new createjs.Shadow( "#454", 5, 5, 5 ) ;
		that.shadowArea = new createjs.Shape() ;
		that.shadowArea.scaleY = 0.4 ;
		that.shadowArea.alpha = 0.3 ;
		that.shadowArea.graphics.f( "#000000" ).dc( 0, that.spriteSize / 2 / that.shadowArea.scaleY - 13, 25 ) ;
		that.container.addChildAt( that.shadowArea, 0 ) ;
	} // AddingShadow()
	function AddingTalkWindow() {
		that.talk = new createjs.Container() ;
		that.talk.regX = that.spriteSize / 2, that.talk.regY = that.spriteSize / 2 ;
		that.container.addChild( that.talk ) ;
		that.talk.bg = new createjs.Shape() ;
		that.talk.wd = new createjs.Text( "", "17px Courier New", "#FFF" ) ;
		that.talk.fadetime = 0 ;
		that.talk.addChild( that.talk.bg, that.talk.wd ) ;
	} // AddingTalkWindow()
	function AddingNametag() {
		that.nameTag = new createjs.Container() ;
		that.nameTag.regX = ( ( halfFullCheck( "half", Name ) * 1.03 + halfFullCheck( "full", Name ) * 1.71 ) * 10 ) / 2, that.nameTag.y = that.spriteSize / 2 + 10 ;
		that.container.addChild( that.nameTag ) ;
		that.nameTag.bg = new createjs.Text( Name, "17px Courier New", "#000" ) ;
		that.nameTag.bg.outline = 6 ;
		that.nameTag.wd = new createjs.Text( Name, "17px Courier New", "#FFF" ) ;
		that.nameTag.alpha = 0 ;
		that.nameTag.addChild( that.nameTag.bg, that.nameTag.wd ) ;
	} // AddingNametag()
	function AddingMouseEvent() {
		that.container.on( "mouseover", function() { 
			that.MapControlPointer.nowEventTrigger = that ; 
			createjs.Tween.get( that.nameTag )
			.to( { alpha: 1 } , 300 ) ;
		} ) ;
		that.container.on( "mouseout", function() { 
			that.MapControlPointer.nowEventTrigger = null ;
			createjs.Tween.get( that.nameTag )
			.to( { alpha: 0 } , 300 ) ;
		} ) ;
	} // AddingMouseEvent()
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
	this.talk.wd.x = 10, this.talk.wd.y = 5 ;
	this.talk.wd.alpha = 0.9 ;
	this.talk.x = 67 - chat_len / 2, this.talk.y = -15 ;
	createjs.Tween.get( that.talk )
	.to( { alpha: 0 } , 0 )
	.to( { alpha: 1 } , 300 ) ;
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
				createjs.Tween.get( that.talk )
				.to( { alpha: 0 } , 300 ) ;
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