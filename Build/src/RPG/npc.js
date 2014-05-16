function NPC( MapControl, Name, x, y, direction, sheet_type, sheet_name ) {
	this.OnCreate( MapControl, Name, x, y, direction, sheet_type, sheet_name ) ;
	return this ;
} // NPC() 

// NPC角色建立
NPC.prototype.OnCreate = function( MapControl, Name, x, y, direction, sheet_type, sheet_name ) {
	// Magic Number !!
	this.spriteSize = 125 ;
	this.effectSpriteSize = 200 ;
	// 地圖控制器
	this.MapControlPointer = MapControl ;
	// 基本資訊設值
	this.name = Name ;
	this.type = "NPC" ;
	this.direction = direction ;
	this.sheet_type = sheet_type ;
	this.sheet_name = sheet_name ;
	// 容器建立
	this.container = new createjs.Container() ;
	this.container.name = Name ;
	this.container.regX = this.spriteSize / 2, this.container.regY = this.spriteSize / 2 ;
	this.container.length = this.spriteSize, this.container.height = this.spriteSize ;
	this.container.x = this.MapControlPointer.GetGrid( x, 'x', 'virtual' ) + this.container.regX ;
	this.container.y = this.MapControlPointer.GetGrid( y, 'y', 'virtual' ) + this.container.regY * 0.3 ;
	this.container.grid_x = x ;
	this.container.grid_y = y ;
	// 圖層建立
	this.sprite = new createjs.Sprite( SettingSprite( sheet_type, sheet_name ) ) ;
	this.sprite.regX = this.spriteSize / 2, this.sprite.regY = this.spriteSize / 2 ;
	this.container.addChild( this.sprite ) ;
	// 預設動畫的方向
	this.OnDirection( this.direction, "front" ) ;
	// 陰影建立
	this.sprite.shadow = new createjs.Shadow( "#454", 5, 5, 5 ) ;
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
	// 更新於地圖資料上
	this.MapControlPointer.UpdateObject( this ) ;
} // OnCreate()

// 角色物件複製, 但其實指標內容是相通的
NPC.prototype.Clone = function() {
	var cloneContainer = new NPC( this.MapControlPointer, this.name, this.container.grid_x, this.container.grid_y, this.direction, this.sheet_type, this.sheet_name ) ;
	return cloneContainer ;
} // Clone()

// 角色移動, 使用虛擬坐標
NPC.prototype.OnWalk = function( x, y ) {
	var trim_x = this.container.regX, trim_y = this.container.regY * 0.3 ;
	var start_x = this.MapControlPointer.GetGrid( ( this.container.x - trim_x ), 'x', 'real' ) ;
	var start_y = this.MapControlPointer.GetGrid( ( this.container.y - trim_y ), 'y', 'real' ) ;
	var location_x = this.MapControlPointer.GetGrid( x, 'x', 'virtual' ) + trim_x ;
	var location_y = this.MapControlPointer.GetGrid( y, 'y', 'virtual' ) + trim_y ;
	this.container.grid_x = x, this.container.grid_y = y ;
	var trim_speed = 5 * GetDistance( this.container.x, this.container.y, location_x, location_y ) ;
	var direction = ( start_x != x ) ? ( ( start_x - x > 0 ) ? 6 : 2 ) : 0 ;
	direction += ( direction != 0 ) ? ( ( start_y != y ) ? ( ( ( start_y - y > 0 ) ? 1 : -1 ) * ( ( direction == 2 ) ? 1 : -1 ) ) : 0 ) : ( ( start_y != y ) ? ( ( start_y - y > 0 ) ? 4 : 0 ) : -1 ) ;
	var that = this ;
	createjs.Tween.get( this.container, { loop: false } ).call( function() { that.OnDirection( direction, "walk" ) } )
														.to( { x: location_x, y: location_y }, trim_speed, createjs.Ease.quadInOut )
														.call( function() { that.OnDirection( direction, "front" ) } ) ;
} // OnWalk()

// 旋轉角色方向/改變播放圖層
NPC.prototype.OnDirection = function( direction, type ) {
	this.sprite.scaleX = ( direction != -1 ) ? ( ( direction > 0 && direction <= 4 ) ? -1 : 1 ) : direction ;
	this.direction = ( direction != -1 ) ? direction : this.direction ;
	this.sprite.gotoAndPlay( type ) ;
} // OnDirection()

// 角色進行對話
NPC.prototype.OnTalk = function( text ) {
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
NPC.prototype.OffTalk = function( type ) {
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

// 角色視窗型對話
NPC.prototype.OnDialog = function() {
	$( "#dialog_01" ).dialog( "open" ) ;
} // OnDialog()

// 函數進入睡眠延遲
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

