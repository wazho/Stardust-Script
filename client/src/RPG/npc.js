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
			if ( that.MapControlPointer.nowEventTrigger != "TriggerNow" )
				that.MapControlPointer.nowEventTrigger = that ; 
			createjs.Tween.get( that.nameTag )
			.to( { alpha: 1 } , 300 ) ;
		} ) ;
		that.container.on( "mouseout", function() { 
			if ( that.MapControlPointer.nowEventTrigger != "TriggerNow" )
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
			TimeSleep( function() { createjs.Tween.get( that.talk ).to( { alpha: 0 } , 300 ) ; } ) ;
		} // else if

		function TimeSleep( func ) {
			setTimeout( function() {
				if ( that.talk.fadetime > 0 ) {
					that.talk.fadetime -= 1000 ;
					TimeSleep( func ) ;
				} // if
				else
					func() ;
			}, 1000 ) ;
		} // TimeSleep()
	} // OffTalk()
} // OnTalk()

// Assign the NPC walking.
NPC.prototype.OnWalk = function( grid ) {
	var that = this ;

	Start( that ) ; 

	function Start() {
		// Virtual grid system.
		var gridSize = that.MapControlPointer.grid.size ;
		var startGrid = { x: that.container.grid_x, y: that.container.grid_y } ;
		var endGrid = { x: grid.x, y: grid.y } ;
		var realGrid = that.MapControlPointer.GetGrid( { x: endGrid.x, y: endGrid.y }, "virtual" ) ;
		createjs.Tween.get( that.container ).to( { x: realGrid.x + that.container.regX, y: realGrid.y + that.container.regY * 0.3 }, 1000 ) ;
		that.container.grid_x = endGrid.x, that.container.grid_y = endGrid.y ;
	} // Start()
} // OnWalk()

// Assign the NPC to grid.
NPC.prototype.OnMove = function( grid ) {
	var that = this ;
	Start( this ) ; 

	function Start() {
		// Virtual grid system.
		var endGrid = { x: grid.x, y: grid.y } ;
		var realGrid = that.MapControlPointer.GetGrid( { x: endGrid.x, y: endGrid.y }, "virtual" ) ;
		that.container.x = realGrid.x + that.container.regX, that.container.y = realGrid.y + that.container.regY * 0.3 ;
		that.container.grid_x = endGrid.x, that.container.grid_y = endGrid.y ;
	} // Start()
} // OnWalk()

NPC.prototype._dialogNext = false ;

// Open a dialog for player's window.
NPC.prototype.OnDialog = function( text ) {
	var that = this ;

	Start( this ) ;
	return true ;

	function Start( pt ) {
		var that = pt ;
		// Initial of dialog.
		if ( ! dialog.getChildByName( "dialog_window" ) )
			var container = FirstCreate() ;
		else
			var container = Refresh() ;

		// Part of text Line.
		var textLine = new createjs.Container() ;
		textLine.name = "text_line" ;
		textLine.x = 30, textLine.y = 20 ;
		textLine.text1 = AddingTextLine( text.first, 0, 0, "20px Courier New", 5 ) ;
		textLine.text2 = AddingTextLine( text.second, 0, 30, "20px Courier New", 5 ) ;
		textLine.text3 = AddingTextLine( text.third, 0, 60, "20px Courier New", 5 ) ;
		textLine.addChild( textLine.text1, textLine.text2, textLine.text3 ) ;
		container.addChild( textLine ) ;

		function FirstCreate() {
			// Create a container of dialog.
			var container = new createjs.Container() ;
			container.name = "dialog_window" ;
			container.x = 300, container.y = that.MapControlPointer.container_front.height - 160 ;
			// Part of dialog window.
			var dialogWindow_top = RadiusRect( 0, 0, 630, 150, 20, "#000", 0.5 ) ;
			var dialogWindow_btm = RadiusRect_3( 0, 115, 630, 35, 20, "#CCC", 0.5 ) ;
			// Part of name tag.
			var Name = that.container.name ;
			var nameLength = ( ( halfFullCheck( "half", Name ) * 1.12 + halfFullCheck( "full", Name ) * 1.88 ) * 27 ) / 2 ;
			var nameTag = new createjs.Container() ;
			nameTag.name = "tag_name" ;
			nameTag.x = 0, nameTag.y = -40 ;
			nameTag.bg = RadiusRect_2( 0, 0, nameLength + 40, 40, 20, "#000", 0.5 ) ;
			nameTag.nameWord = AddingTextLine( Name, ( nameLength + 40 ) / 2, 10, "25px Courier New", 6 ) ; ;
			nameTag.nameWord.regX = ( ( halfFullCheck( "half", Name ) * 1.0 + halfFullCheck( "full", Name ) * 1.7 ) * 15 ) / 2 ;
			nameTag.addChild( nameTag.bg, nameTag.nameWord ) ;
			createjs.Tween.get( nameTag ).to( { x: ( 315 - ( nameLength + 40 ) / 2 ) }, 1000 ) ;
			// Part of next page.
			var nextPage = new createjs.Container() ;
			nextPage.name = "next_page" ;
			nextPage.button = AddingTextLine( "Next >>", 530, 122, "25px Comic Sans MS", 6 ) ;
			nextPage.addChild( nextPage.button ) ;
			nextPage.button.on( "click", function() { 
				that._dialogNext = true ;
				return ;
			} ) ;
			// Part of cancel page.
			var cancelPage = new createjs.Container() ;
			cancelPage.name = "cancel_page" ;
			cancelPage.button = AddingTextLine( "Cancel", 35, 122, "25px Comic Sans MS", 6 ) ;
			cancelPage.addChild( cancelPage.button ) ;
			cancelPage.on( "click", function() { 
				that.trigegrInit() ;
			} ) ;
			// All adding to the top container.
			container.addChild( dialogWindow_top, dialogWindow_btm, nameTag, nextPage, cancelPage ) ;
			dialog.addChild( container ) ;
			createjs.Tween.get( container )
			.to( { alpha: 0 }, 0 )
			.to( { alpha: 1 }, 500 ) ;
			return container ;
		} // FirstCreate()
		function Refresh() {
			var container = dialog.getChildByName( "dialog_window" ) ;
			var textLine = container.getChildByName( "text_line" ) ;
			container.removeChild( textLine ) ;
			return container ;
		} // Refresh()
		function AddingTextLine( str, x, y, font, outline ) {
			var text = new createjs.Container() ;
			text.x = x, text.y = y ;
			text.bg = new createjs.Text( str, font, "#000" ) ;
			text.bg.outline = outline ;
			text.wd = new createjs.Text( str, font, "#FFF" ) ;
			text.addChild( text.bg, text.wd ) ;
			return text ;
		} // AddingTextLine()

		function RadiusRect( x, y, w, h, radius, color, alpha ) {
			var context = new createjs.Shape() ;
			var r = x + w, b = y + h ;
			context.graphics.f( color ).moveTo( x + radius, y )
			.lineTo( r - radius, y ).quadraticCurveTo( r, y, r, y + radius )
			.lineTo( r, y + h - radius ).quadraticCurveTo( r, b, r - radius, b )
			.lineTo( x + radius, b ).quadraticCurveTo( x, b, x, b - radius )
			.lineTo( x, y + radius ).quadraticCurveTo( x, y, x + radius, y ) ;
			context.alpha = alpha ;
			return context ;
		} // RadiusRect()
		function RadiusRect_2( x, y, w, h, radius, color, alpha ) {
			var context = new createjs.Shape() ;
			var r = x + w, b = y + h ;
			context.graphics.f( color ).moveTo( x + radius, y )
			.lineTo( r - radius, y ).quadraticCurveTo( r, y, r, y + radius )
			.lineTo( r, y + h - radius ).quadraticCurveTo( r, b, r + radius, b )
			.lineTo( x - radius, b ).quadraticCurveTo( x, b, x, b - radius )
			.lineTo( x, y + radius ).quadraticCurveTo( x, y, x + radius, y ) ;
			context.alpha = alpha ;
			return context ;
		} // RadiusRect_2()
		function RadiusRect_3( x, y, w, h, radius, color, alpha ) {
			var context = new createjs.Shape() ;
			var r = x + w, b = y + h ;
			context.graphics.f( color ).moveTo( x + radius, y )
			.lineTo( r, y ).quadraticCurveTo( r, y, r, y + radius )
			.lineTo( r, y + h - radius ).quadraticCurveTo( r, b, r - radius, b )
			.lineTo( x + radius, b ).quadraticCurveTo( x, b, x, b - radius )
			.lineTo( x, y ).quadraticCurveTo( x, y, x + radius, y ) ;
			context.alpha = alpha ;
			return context ;
		} // RadiusRect_3()
	} // Start()
} // OnDialog()

// Cutin a picture media in npc framework.
// parameter(src) : file where is it.
// parameter(location) : where is this picture put on this stage.
NPC.prototype.OnCutin = function( src, location ) {
	var that = this ;
	// Initial of dialog.
	dialog.removeAllChildren() ;
	var container = new createjs.Container() ;
	container.name = "cutin_pic" ;
	var pic = new createjs.Bitmap( src ) ;
	container.addChild( pic ) ;
	dialog.addChild( container ) ;
	if ( location == 1 )
		container.x = 0, container.y = 150 ;
	createjs.Tween.get( container )
	.to( { alpha: 0 }, 0 )
	.to( { alpha: 1 }, 500 ) ;
} // OnCutin()

// When NPC is clicked, it will be triggered.
NPC.prototype.OnTrigger = function() {
	var that = this ;
	this.MapControlPointer.nowEventTrigger = "TriggerNow" ;
	// Cammand start.
	this.OnTalk( that.container.name + ": You click me." ) ;
	this.OnCutin( "npc/sage_l.png", 1 ) ;

	async.series([
		// One
		function( callback ) {
	        that._dialogNext = false ;
        	setTimeout( function() {
				that.OnDialog( { first: "Hello." } ) ;
				callback( null, 'one' ) ;
        	}, 0 ) ;
		},
		// Two
		function( callback ) {
			var checkTime = 300 ;
			Loop( checkTime ) ;

			function Loop( checkTime ) {
	        	setTimeout( function() {
	        		if ( that._dialogNext ) {
	        			that._dialogNext = false ;
						that.OnDialog( { second: "你好。" } ) ;
	        		} // if
					else
						Loop( checkTime ) ;
	    		}, checkTime ) ;
	        } // Loop()
			callback( null, 'two' ) ;
		},
		// Three
		function( callback ) {
			var checkTime = 300 ;
			Loop( checkTime ) ;

			function Loop( checkTime ) {
	        	setTimeout( function() {
	        		if ( that._dialogNext ) {
	        			that._dialogNext = false ;
						that.OnDialog( { third: "嗨。" } ) ;
	        		} // if
					else
						Loop( checkTime ) ;
	    		}, checkTime ) ;
	        } // Loop()
			callback( null, 'three' ) ;
		},
		// Four
		function( callback ) {
			var checkTime = 300 ;
			Loop( checkTime ) ;

			function Loop( checkTime ) {
	        	setTimeout( function() {
	        		if ( that._dialogNext ) {
						that.OnWalk( { x: that.container.grid_x + 3, y: that.container.grid_y } ) ;
	        		} // if
					else
						Loop( checkTime ) ;
	    		}, checkTime ) ;
	        } // Loop()
			callback( null, 'four' ) ;
		},
		// Five
		function( callback ) {
			var checkTime = 300 ;
			Loop( checkTime ) ;

			function Loop( checkTime ) {
	        	setTimeout( function() {
	        		if ( that._dialogNext ) {
	        			that._dialogNext = false ;
						that.OnDialog( { third: "第四句話，第五步驟。" } ) ;
	        		} // if
					else
						Loop( checkTime ) ;
	    		}, checkTime ) ;
	        } // Loop()
			callback( null, 'three' ) ;
		}
	], function( err, results ) {
		console.log( "callback: " + results + " (" + err + ")" ) ;
	});

	// this.OnDialog( { first: "Hello.", second: "你好。", third: "こんにちは." } ) ;
	// this.OnDialog( { first: "Second." } ) ;
	// this.OnDialog( { first: "        Third." } ) ;
	// this.OnDialog( { first: "               Fourth." } ) ;
	// this.OnWalk( { x: this.container.grid_x + 3, y: this.container.grid_y } ) ;
	// this.OnWalk( { x: this.container.grid_x, y: this.container.grid_y - 3 } ) ;


	// Example:
	// this.OnTalk( that.container.name + ": You click me." ) ;
	// this.OnCutin( "npc/sage_l.png", 1 ) ;
	// this.OnMove( { x: 1, y: 1 } ) ;
	// this.OnWalk( { x: this.container.grid_x + 1, y: this.container.grid_y } ) ;

	this.trigegrInit = function TriggerInit() {
		createjs.Tween.get( dialog )
		.to( { alpha: 0 }, 300 )
		.to( { alpha: 1 }, 0 )
		.call( function() {
			that.MapControlPointer.nowEventTrigger = null ;
			dialog.removeAllChildren() ;	
		} ) ;
	} // TriggerInit()


} // OnTrigger()
