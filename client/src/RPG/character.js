function Character( MapControl, Name, HP, SP, Speed, x, y, direction ) {
	this.OnCreate( MapControl, Name, HP, SP, Speed, x, y, direction ) ;
	return this ;
} // Character() 

// 角色建立
Character.prototype.OnCreate = function( MapControl, Name, HP, SP, Speed, x, y, direction ) {
	// Magic Number !!
	this.spriteSize = 125 ;
	this.effectSpriteSize = 200 ;
	// 地圖控制器
	this.MapControlPointer = MapControl ;
	// 基本資訊設值
	this.name = Name ;
	this.hp_max = HP, this.hp = HP ;
	this.sp_max = SP, this.sp = SP ;
	this.speed = Speed, this.direction = 4 ;
	// 容器建立
	this.container = new createjs.Container() ;
	this.container.name = Name ;
	this.container.regX = this.spriteSize / 2, this.container.regY = this.spriteSize / 2 ;
	this.container.length = this.spriteSize, this.container.height = this.spriteSize ;
	this.container.x = this.MapControlPointer.GetGrid( x, 'x', 'virtual' ) + this.container.regX ;
	this.container.y = this.MapControlPointer.GetGrid( y, 'y', 'virtual' ) + this.container.regY * 0.3 ;
	// 圖層建立
	this.sprite = new createjs.Sprite( SettingSprite( "character", Name ) ) ;
	this.sprite.regX = this.spriteSize / 2, this.sprite.regY = this.spriteSize / 2 ;
	this.container.addChild( this.sprite ) ;
	// 預設動畫的方向
	this.OnDirection( this.direction, "front" ) ;
	// 陰影建立
	this.sprite.shadow = new createjs.Shadow( "#454", 5, 5, 5 ) ;
	// 隨從建立
	this.follower = new createjs.Container() ;
	this.container.addChild( this.follower ) ;
	// 特效容器建立
	this.effect = new createjs.Container() ;
	this.effect.regX = this.effectSpriteSize / 2, this.effect.regY = this.effectSpriteSize / 2 ;
	this.container.addChild( this.effect ) ;
	// 對話視窗建立
	this.talk = new createjs.Container() ;
	this.talk.regX = this.spriteSize / 2, this.talk.regY = this.spriteSize / 2 ;
	this.container.addChild( this.talk ) ;
	this.talk.bg = new createjs.Shape() ;
	this.talk.wd = new createjs.Text( "", "17px Courier New", "#FFF" ) ;
	this.talk.fadetime = 0 ;
	this.talk.addChild( this.talk.bg, this.talk.wd ) ;
	// 生命條建立
	this.lifebar = new createjs.Container() ;
	this.lifebar.regX = this.spriteSize / 2, this.lifebar.regY = this.spriteSize / 2 ;
	this.container.addChild( this.lifebar ) ;
	this.lifebar.bg = new createjs.Shape() ;
	this.lifebar.hp = new createjs.Shape() ;
	this.lifebar.sp = new createjs.Shape() ;
	this.lifebar.addChild( this.lifebar.bg, this.lifebar.hp, this.lifebar.sp ) ;
	this.LifeBar() ;
	// 開始進行鍵盤、滑鼠監聽動作
	this.OnActive() ;
	// 自動恢復生命條
	this.sp_recover = createjs.Tween.get( this, { loop: true } ).wait( 1000 ).call( function() { this.OnLifeModify( 2, 2 ) ; } ) ;
	// 更新於地圖資料上
	this.MapControlPointer.UpdateObject( this ) ;
} // OnCreate()

// 角色移動
Character.prototype.OnMove = function( x, y ) {
	this.container.x += x, this.container.y += y ;
} // OnMove()

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

// 開始動作監聽
Character.prototype.OnActive = function() {
	var that = this ; 
	createjs.Ticker.addEventListener( "tick", function() { that.OnTick( that ) ; } ) ;

	stage.on( "stagemousedown", function( evt ) {
		that.OnWalk( that.MapControlPointer.GetGrid( evt.stageX, 'x', 'real' ), that.MapControlPointer.GetGrid( evt.stageY, 'y', 'real' ) ) ;
	}) ;
} // OnActive()

// 角色移動, 使用虛擬坐標
Character.prototype.OnWalk = function( x, y ) {
	var trim_x = this.container.regX, trim_y = this.container.regY * 0.3 ;
	var start_x = this.MapControlPointer.GetGrid( ( this.container.x - trim_x ), 'x', 'real' ) ;
	var start_y = this.MapControlPointer.GetGrid( ( this.container.y - trim_y ), 'y', 'real' ) ;
	var location_x = this.MapControlPointer.GetGrid( x, 'x', 'virtual' ) + trim_x ;
	var location_y = this.MapControlPointer.GetGrid( y, 'y', 'virtual' ) + trim_y ;
	var trim_speed = 5 * GetDistance( this.container.x, this.container.y, location_x, location_y ) ;
	var direction = ( start_x != x ) ? ( ( start_x - x > 0 ) ? 6 : 2 ) : 0 ;
	direction += ( direction != 0 ) ? ( ( start_y != y ) ? ( ( ( start_y - y > 0 ) ? 1 : -1 ) * ( ( direction == 2 ) ? 1 : -1 ) ) : 0 ) : ( ( start_y != y ) ? ( ( start_y - y > 0 ) ? 4 : 0 ) : -1 ) ;
	var that = this ;
	// 這裡最後一行有 bug, 未來要改
	createjs.Tween.get( this.container, { loop: false } ).call( function() { that.OnDirection( direction, "walk" ) } )
														.to( { x: location_x, y: location_y }, trim_speed, createjs.Ease.quadInOut )
														.call( function() { that.OnDirection( direction, "front" ) } )
														.call( function() { if ( that.MapControlPointer.GetObjectbyGrid( x, y ).getNumChildren() != 0 ) that.MapControlPointer.GetObjectbyGrid( x, y ).getChildAt( 0 ).OnDialog() } ) ;

	this.MapControlPointer.MapMove( location_x, location_y, trim_speed ) ;

	console.log( start_x + "  " + start_y ) ;

	sendPlayerStateToServer() ;
} // OnWalk()

// 旋轉角色方向/改變播放圖層
Character.prototype.OnDirection = function( direction, type ) {
	this.sprite.scaleX = ( direction != -1 ) ? ( ( direction > 0 && direction <= 4 ) ? -1 : 1 ) : direction ;
	this.direction = ( direction != -1 ) ? direction : this.direction ;
	this.sprite.gotoAndPlay( type ) ;
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
	this.lifebar.bg.regX = 0, this.talk.bg.y = 0 ;
	this.lifebar.bg.graphics.f( "#181789" ).r( ( this.container.length / 2 - 75 / 2 ) , this.container.height, 75, 11 ) ;
	var per_hp = 1 - ( this.hp_max - this.hp ) / this.hp_max ;
	this.lifebar.bg.graphics.f( "#19FF1C" ).r( ( this.container.length / 2 - 75 / 2 + 1 ) , this.container.height + 1, 73 * per_hp, 4 ) ;
	var per_sp = 1 - ( this.sp_max - this.sp ) / this.sp_max ;
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
	this.effect.sprite = new createjs.Sprite( SettingSprite( "effect", "sk_blessing" ) ) ;
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

