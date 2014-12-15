function Character( MapControl, Name, LifeBar, grid, Speed, sheet, direction, active ) {
	this.OnCreate( MapControl, Name, LifeBar, grid, Speed, sheet, direction, active ) ;
	this.MapControlPointer.container_front.addChild( this.container ) ;
	// Move to assign location.
	this.OnMove( { x: grid.x, y: grid.y }, 0 ) ;
	// Resort order.
	this.resortingOrder() ;
	return this ;
} // Character() 

// 角色建立
Character.prototype.OnCreate = function( MapControl, Name, LifeBar, grid, Speed, sheet, direction, active ) {
	var that = this ;
	// Magic Number !!
	this.spriteSize = 125 ;
	this.effectSpriteSize = 200 ;
	// Self or not
	this.active = active ;
	// Map back and map front are both in map controller.
	this.MapControlPointer = MapControl ;
	// Character container created.
	CreateContainer() ;
	// Basic character info.
	AddingBasicInfo() ;
	// Character's sprite.
	AddingSprite() ;
	// Shadow created.
	AddingShadow() ;
	// Window of conversation.
	AddingTalkWindow() ;
	// Character's life bar.
	AddingLifeBar() ;
	// Character's effect of buff or nerf.
	AddingEffectContainer() ;
	// Start listening.
	ListenerStart() ;

	function CreateContainer() {
		that.container = new createjs.Container() ;
		that.container.name = Name ;
		that.container.regX = that.spriteSize / 2, that.container.regY = that.spriteSize / 2 ;
		that.container.length = that.spriteSize, that.container.height = that.spriteSize ;
		// that.container.x = that.MapControlPointer.GetGrid( { x: 16, y: 11 }, "virtual" ).x + that.container.regX ;
		// that.container.y = that.MapControlPointer.GetGrid( { x: 16, y: 11 }, "virtual" ).y + that.container.regY * 0.3 ;
		that.container.grid_x = grid.x, that.container.grid_y = grid.y ;
	} // CreateContainer()
	function AddingBasicInfo() {
		that.container.name = Name ;
		that.container.hp_max = LifeBar.HP, that.container.hp = LifeBar.HP ;
		that.container.sp_max = LifeBar.SP, that.container.sp = LifeBar.SP ;
		that.container.speed = Speed ;
		that.container.direction = direction ;
		that.container.sheet = sheet ;
	} // AddingBasicInfo()
	function AddingSprite() {
		that.sprite = new createjs.Container() ;
		that.sprite.scaleX = that.sprite.scaleY = 1 ;
		that.sprite.body = new createjs.Sprite( SettingSprite( { target: "character", part: "body" }, sheet.body ) ) ;
		that.sprite.body.regX = Math.ceil( that.spriteSize / 2 ), that.sprite.body.regY = 81 * that.sprite.scaleY ;
		that.sprite.body.x = 0, that.sprite.body.y = 47 * that.sprite.scaleY ;
		that.sprite.hair = new createjs.Sprite( SettingSprite( { target: "character", part: "hair" }, sheet.hair ) ) ;
		that.sprite.hair.regX = Math.ceil( 75 / 2 ), that.sprite.hair.regY = Math.ceil( 75 / 2 ) * that.sprite.scaleY ;
		that.sprite.hair.x = 0, that.sprite.hair.y = -11 / that.sprite.scaleY ;
		that.sprite.addChild( that.sprite.body, that.sprite.hair ) ;
		that.container.addChild( that.sprite ) ;
		// Default the direction of this character.
		that.OnDirection( that.container.direction, { part: "body", mode: "stand_A" } ) ;
		that.OnDirection( that.container.direction, { part: "hair", mode: "stable_A" } ) ;
		// Breath animation.
		createjs.Tween.get( that.sprite.body, { loop: true } ).to( { scaleY: 0.97 }, 1500 ).to( { scaleY: 1 }, 1500 ) ;
		createjs.Tween.get( that.sprite.hair, { loop: true } ).to( { y: that.sprite.hair.y + 3 }, 1500 ).to( { y: that.sprite.hair.y }, 1500 ) ;
	} // AddingSprite()
	function AddingShadow() {
		// that.sprite.shadow = new createjs.Shadow( "#454", 5, 5, 5 ) ;
		that.shadowArea = new createjs.Shape() ;
		that.shadowArea.scaleY = 0.4 ;
		that.shadowArea.alpha = 0.3 ;
		that.shadowArea.graphics.f( "#000000" ).dc( 0, that.spriteSize / 2 / that.shadowArea.scaleY - 13, 25 ) ;
		that.shadowArea.x = 0, that.shadowArea.y = -10 ;
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
	function AddingLifeBar() {
		that.lifebar = new createjs.Container() ;
		that.lifebar.regX = that.spriteSize / 2, that.lifebar.regY = that.spriteSize / 2 ;
		that.container.addChild( that.lifebar ) ;
		that.lifebar.bg = new createjs.Shape() ;
		that.lifebar.hp = new createjs.Shape() ;
		that.lifebar.sp = new createjs.Shape() ;
		that.lifebar.addChild( that.lifebar.bg, that.lifebar.hp, that.lifebar.sp ) ;
		that.LifeBar() ;
	} // AddingLifeBar()
	function AddingEffectContainer() {
		that.effect = new createjs.Container() ;
		that.effect.regX = that.effectSpriteSize / 2, that.effect.regY = that.effectSpriteSize / 2 ;
		that.container.addChild( this.effect ) ;
	} // AddingEffectContainer()
	function ListenerStart() {
		// Mouse, keyboard are listening.
		that.OnActive() ;
		// Auto recovering.
		that.sp_recover = createjs.Tween.get( that, { loop: true } ).wait( 1000 ).call( function() { that.OnLifeModify( 2, 2 ) ; } ) ;
	} // ListenerStart()

	// Resorting the back, front map container.
	this.resortingOrder = function ResortingObjectsAndChars() {
		for ( i = that.MapControlPointer.container_front.getNumChildren() ; i > 0 ; i -- )
			for ( j = 0 ; j < i - 1 ; j ++ )
				if ( that.MapControlPointer.container_front.getChildAt( j ).y > that.MapControlPointer.container_front.getChildAt( j + 1 ).y ) 
					that.MapControlPointer.container_front.swapChildren( that.MapControlPointer.container_front.getChildAt( j ), that.MapControlPointer.container_front.getChildAt( j + 1 ) ) ;
	} // ResortingObjectsAndChars()
} // OnCreate()

// 按鍵監聽
Character.prototype.OnTick = function( that ) {
	if ( pressed[KEYCODE_Z] )
		; //that.sprite.gotoAndPlay( "attack" ), this.OnPlaySound( "attack" ) ;
		// var tween = createjs.Tween.get( that, { loop: false } ).call( function() { that.sprite.gotoAndPlay( "attack" ) ; } )
		// 														.wait( 600 ).call( function() { that.sprite.gotoAndPlay( "front" ) ; } ) ;	
	if ( pressed[KEYCODE_X] )
		that.sprite.gotoAndPlay( "walk" ) ;
	if ( pressed[KEYCODE_D] )
		that.sprite.gotoAndPlay( "die" ), this.OnPlaySound( "die" ) ;
	if ( pressed[KEYCODE_Q] )
		this.OnSkill( "天使之賜福" ), that.sprite.gotoAndPlay( "skill_self" ) ;
	if ( pressed[KEYCODE_W] )
		that.OnTalk( this.name + " : " + "You key in 'wwwwwwwwwwwwwwwwwwwwwww'." ) ;
} // OnTick()

// Starting mouse listener on player.
Character.prototype.OnActive = function() {
	if ( this.active == false )
		return ;
	var that = this ; 
	createjs.Ticker.addEventListener( "tick", function() { that.OnTick( that ) ; } ) ;

	stage.on( "stagemousedown", function( evt ) {
		if ( that.MapControlPointer.nowEventTrigger == null ) {
			var trimedGrid = that.MapControlPointer.GetGrid( { x: evt.stageX, y: evt.stageY }, "real" ) ;
			trimedGrid.x += that.MapControlPointer.trim.x, trimedGrid.y += that.MapControlPointer.trim.y ;
			that.OnWalk( trimedGrid ) ;
		} // if
		else if ( that.MapControlPointer.nowEventTrigger != "TriggerNow" )
			that.MapControlPointer.nowEventTrigger.OnTrigger() ;
	}) ;
} // OnActive()

// 角色移動
Character.prototype.OnMove = function( grid ) {
	var that = this ;
	// Virtual grid system.
	var gridSize = this.MapControlPointer.grid.size ;
	var endGrid = { x: grid.x, y: grid.y } ;
	// Checking the grid is walkable or not.
	if ( this.MapControlPointer.MapMove( { x: endGrid.x, y: endGrid.y }, 0, that.active ) ) {
		this.container.grid_x = endGrid.x, this.container.grid_y = endGrid.y ;
		var realGrid = this.MapControlPointer.GetGrid( { x: endGrid.x, y: endGrid.y }, "virtual" ) ;
		this.container.x = realGrid.x + this.container.regX, this.container.y = realGrid.y + this.container.regY * 0.3 ;
		this.resortingOrder() ;
	} // if
} // OnMove()

// Assign the character walking.
Character.prototype.OnWalk = function( endGrid ) {
	if ( this.sprite.body.currentAnimation == "walk_A" ||
		this.sprite.body.currentAnimation == "walk_B" ||
		this.sprite.body.currentAnimation == "walk_C" ||
		this.sprite.body.currentAnimation == "walk_D" ||
		this.sprite.body.currentAnimation == "walk_E" )
		return ;
	var that = this ;
	// Virtual grid system.
	var gridSize = this.MapControlPointer.grid.size ;
	var startGrid = { x: this.container.grid_x, y: this.container.grid_y } ;
	// Checking the grid is walkable or not, then walk to there using 'A* algorithm'.
	var pathfinding = that.MapControlPointer.AStarAlgorithm( startGrid, endGrid ) ;

	//console.log( pathfinding.length,  pathfinding ) ;

	Recursive( 0, pathfinding.length ) ;

	function Recursive( nowPath, totalPath ) {
		// Confirm the distance between two grids.
		if ( pathfinding[nowPath] == 0 )
			var distanceX = 0, distanceY = -1 ;
		else if ( pathfinding[nowPath] == 1 )
			var distanceX = 1, distanceY = -1 ;
		else if ( pathfinding[nowPath] == 2 )
			var distanceX = 1, distanceY = 0 ;
		else if ( pathfinding[nowPath] == 3 )
			var distanceX = 1, distanceY = 1 ;
		else if ( pathfinding[nowPath] == 4 )
			var distanceX = 0, distanceY = 1 ;
		else if ( pathfinding[nowPath] == 5 )
			var distanceX = -1, distanceY = 1 ;
		else if ( pathfinding[nowPath] == 6 )
			var distanceX = -1, distanceY = 0 ;
		else if ( pathfinding[nowPath] == 7 )
			var distanceX = -1, distanceY = -1 ;
		else
			var distanceX = 0, distanceY = 0 ;
		// Speed assigned and fixed.
		var speed = that.container.speed ;
		var speedFixed = ( speed * ( ( ( Math.abs( distanceX ) + Math.abs( distanceY ) ) == 2 ) ? 1.414 : 1.000 ) ).toFixed( 4 ) ;
		// Stop or keep walking.
		if ( nowPath >= totalPath )
			setTimeout( function() { StopDirection() ; }, speedFixed ) ;
		else
			setTimeout( function() { 
				if ( that.MapControlPointer.MapMove( { x: startGrid.x + distanceX, y: startGrid.y + distanceY }, speedFixed, that.active ) ) {
					that.container.grid_x = startGrid.x += distanceX, that.container.grid_y = startGrid.y += distanceY ;
					WalkDirection( pathfinding[nowPath], speedFixed ) ;
					Recursive( nowPath + 1, totalPath ) ;
				} // if
				else
					setTimeout( function() { StopDirection() ; }, speedFixed ) ;
			}, speedFixed ) ;

		function WalkDirection( num, speed ) {
			var realGrid = that.MapControlPointer.GetGrid( { x: startGrid.x, y: startGrid.y }, "virtual" ) ;
			if ( num == 0 )
				Animation( 0, "walk_E", "stable_E" ) ;
			else if ( num == 1 )
				Animation( 1, "walk_D", "stable_D" ) ;
			else if ( num == 2 )
				Animation( 2, "walk_C", "stable_C" ) ;
			else if ( num == 3 )
				Animation( 3, "walk_B", "stable_B" ) ;
			else if ( num == 4 )
				Animation( 4, "walk_A", "stable_A" ) ;
			else if ( num == 5 )
				Animation( 5, "walk_B", "stable_B" ) ;
			else if ( num == 6 )
				Animation( 6, "walk_C", "stable_C" ) ;
			else if ( num == 7 )
				Animation( 7, "walk_D", "stable_D" ) ;

			function Animation( direction, bodyAnimation, hairAnimation ) {
				createjs.Tween.get( that.container )
				.call( function() { that.OnDirection( direction, { part: "body", mode: bodyAnimation } ) ; } )
				.call( function() { that.OnDirection( direction, { part: "hair", mode: hairAnimation } ) ; } )
				.to( { x: realGrid.x + that.container.regX, y: realGrid.y + that.container.regY * 0.3 }, speed )
				.call( function() { that.resortingOrder() ; } ) ;
			} // Animation()
		} // WalkDirection()
		function StopDirection() {
			if ( that.container.direction == 0 )
				Animation( 0, "stand_E", "stable_E" ) ;
			else if ( that.container.direction == 1 )
				Animation( 1, "stand_D", "stable_D" ) ;
			else if ( that.container.direction == 2 )
				Animation( 2, "stand_C", "stable_C" ) ;
			else if ( that.container.direction == 3 )
				Animation( 3, "stand_B", "stable_B" ) ;
			else if ( that.container.direction == 4 )
				Animation( 4, "stand_A", "stable_A" ) ;
			else if ( that.container.direction == 5 )
				Animation( 5, "stand_B", "stable_B" ) ;
			else if ( that.container.direction == 6 )
				Animation( 6, "stand_C", "stable_C" ) ;
			else if ( that.container.direction == 7 )
				Animation( 7, "stand_D", "stable_D" ) ;

			function Animation( direction, bodyAnimation, hairAnimation ) {
				createjs.Tween.get( that.container )
				.call( function() { that.OnDirection( direction, { part: "body", mode: bodyAnimation } ) ; } )
				.call( function() { that.OnDirection( direction, { part: "hair", mode: hairAnimation } ) ; } ) ;
			} // Animation()
		} // Stop()
	} // Recursive()
} // OnWalk()

// 旋轉角色方向/改變播放圖層
Character.prototype.OnDirection = function( direction, type ) {
	if ( type.part == "body" ) {
		this.sprite.body.scaleX = ( direction != -1 ) ? ( ( direction > 0 && direction <= 4 ) ? -1 : 1 ) : direction ;
		// If not the same animation must change.
		if ( this.sprite.body.currentAnimation != type.mode )
			this.sprite.body.gotoAndPlay( type.mode ) ;
	} // if
	else if ( type.part == "hair" ) {
		this.sprite.hair.scaleX = ( direction != -1 ) ? ( ( direction > 0 && direction <= 4 ) ? -1 : 1 ) : direction ;
		// If not the same animation must change.
		if ( this.sprite.hair.currentAnimation != type.mode )
			this.sprite.hair.gotoAndPlay( type.mode ) ;
	} // else if

	this.container.direction = ( direction != -1 ) ? direction : this.container.direction ;
} // OnDirection()

// 角色進行對話
Character.prototype.OnTalk = function( text ) {
	// 初始化
	this.OffTalk( 'now' ) ;
	// 取得對話內容與角色名稱字串總長度, 判斷全形半形
	var chat_len = 20 + ( halfFullCheck( "half", text ) * 1.07 + halfFullCheck( "full", text ) * 1.71 ) * 10 ;
	// 設定對話背景與文字
	this.talk.bg.alpha = 0.65 ;
	this.talk.bg.graphics.f( "#000" ).r( 0, 0, chat_len, 25 ) ;
	this.talk.wd.text = text ;
	this.talk.wd.x = 10, this.talk.wd.y = 6 ;
	this.talk.wd.alpha = 0.9 ;
	// 對話視窗高度微調
	this.talk.x = 67 - chat_len / 2, this.talk.y = -15 ;

	var that = this ;
	createjs.Tween.get( that.container, { loop: false } ).call( function() { that.OffTalk( 'fade' ) ; } ) ;
} // OnTalk()

// 角色清空對話
Character.prototype.OffTalk = function( type ) {
	if ( type == 'now' ) {
		this.talk.wd.text = "" ;
		this.talk.bg.graphics.c() ;
	} // if
	else if ( type == 'fade' ) {
		var that = this ;
		this.talk.fadetime += 3000 ;
		this.TimeSleep( function() {
 			that.talk.wd.text = "" ;
			that.talk.bg.graphics.c() ;
		} ) ;
	} // else if
} // OffTalk()

// 角色播放動作音效
Character.prototype.OnPlaySound = function( motivation ) {
	var file = this.name + "_" + motivation + ".wav" ;
	createjs.Sound.play( "sound/monster/" + file ) ; 
} // OnPlaySound()

// 角色生命條
Character.prototype.LifeBar = function() {
	if ( ! this.active )
		return ;
	this.lifebar.bg.regX = 0, this.talk.bg.y = 0 ;
	this.lifebar.bg.graphics.f( "#181789" ).r( ( this.container.length / 2 - 75 / 2 ) , this.container.height, 75, 11 ) ;
	var per_hp = 1 - ( this.container.hp_max - this.container.hp ) / this.container.hp_max ;
	this.lifebar.bg.graphics.f( "#19FF1C" ).r( ( this.container.length / 2 - 75 / 2 + 1 ) , this.container.height + 1, 73 * per_hp, 4 ) ;
	var per_sp = 1 - ( this.container.sp_max - this.container.sp ) / this.container.sp_max ;
	this.lifebar.bg.graphics.f( "#006BDC" ).r( ( this.container.length / 2 - 75 / 2 + 1 ) , this.container.height + 6, 73 * per_sp, 4 ) ;
} // LifeBar()

// 角色生命條調整
Character.prototype.OnLifeModify = function( HP, SP ) {
	this.hp += ( this.hp + HP <= 0 ) ? - this.hp : ( ( this.hp + HP >= this.hp_max ) ? ( this.hp_max - this.hp ) : HP ) ;
	this.sp += ( this.sp + SP <= 0 ) ? - this.sp : ( ( this.sp + SP >= this.sp_max ) ? ( this.sp_max - this.sp ) : SP ) ;
	this.LifeBar() ;
} // OnLifeModify()

Character.prototype.OnEffect = function( effect_num, times ) {
	// 預先重置特效容器
	this.effect.removeChild( this.effect.sprite ) ;
	this.effect.sprite = new createjs.Sprite( SettingSprite( { target: "effect", part: "" }, "sk_blessing" ) ) ;
	this.effect.addChild( this.effect.sprite ) ;
	this.effect.sprite.gotoAndPlay( "active" ) ;
	this.effect.sprite.off( "active" ) ;
} // OnSkill()

Character.prototype.OnSkill = function( skill ) {
	if ( skill == "天使之賜福" ) {
		if ( this.sp >= 10 ) {
			this.sp -= 10 ;
			createjs.Sound.play( "sound/skill/blessing.wav" ) ; 
			this.OnTalk( skill + '!!' ) ;
			this.OnEffect( 1, 2 ) ;
		} // if
	} // if
} // OnSkill()

Character.prototype.TimeSleep = function( func ) {
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