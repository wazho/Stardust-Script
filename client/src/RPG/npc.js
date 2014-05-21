function NPC( MapControl, Name, x, y, direction, sheet_type, sheet_name ) {
	this.OnCreate( MapControl, Name, x, y, direction, sheet_type, sheet_name ) ;
	return this ;
} // NPC() 

// NPC character object is created.
NPC.prototype.OnCreate = function( MapControl, Name, x, y, sheet_type, sheet_name, direction ) {
	// Magic Number !!
	this.spriteSize = 125 ;
	this.effectSpriteSize = 200 ;
	// Map back and map front are both in map controller.
	this.MapControlPointer = MapControl ;
	// NPC container created.
	this.container = new createjs.Container() ;
	this.container.regX = this.spriteSize / 2, this.container.regY = this.spriteSize / 2 ;
	this.container.length = this.spriteSize, this.container.height = this.spriteSize ;
	this.container.x = this.MapControlPointer.GetGrid( x, 'x', 'virtual' ) + this.container.regX ;
	this.container.y = this.MapControlPointer.GetGrid( y, 'y', 'virtual' ) + this.container.regY * 0.3 ;
	// Basic NPC info.
	this.container.name = Name ;
	this.container.type = "NPC" ;
	this.container.direction = direction ;
	this.container.sheet_type = sheet_type, this.container.sheet_name = sheet_name ;
	this.container.grid_x = x, this.container.grid_y = y ;
	// Adding to the map (in front od all map elements).
	this.MapControlPointer.container_front.addChild( this.container ) ;
	// NPC's sprite.
	this.sprite = new createjs.Sprite( SettingSprite( sheet_type, sheet_name ) ) ;
	this.sprite.regX = this.spriteSize / 2, this.sprite.regY = this.spriteSize / 2 ;
	this.container.addChild( this.sprite ) ;
	// Default the direction of this NPC.
	this.OnDirection( this.direction, "front" ) ;
	// Shadow created.
	this.sprite.shadow = new createjs.Shadow( "#454", 5, 5, 5 ) ;
} // OnCreate()

// Clone the NPC. Except NPC's info isn's inherited, all for the script is inherited.
NPC.prototype.Clone = function( name, x, y, direction ) {
	new NPC( this.MapControlPointer, name, x, y, this.container.sheet_type, this.container.sheet_name, direction ) ;
} // Clone()

// 旋轉角色方向/改變播放圖層
NPC.prototype.OnDirection = function( direction, type ) {
	this.sprite.scaleX = ( direction != -1 ) ? ( ( direction > 0 && direction <= 4 ) ? -1 : 1 ) : direction ;
	this.direction = ( direction != -1 ) ? direction : this.direction ;
	this.sprite.gotoAndPlay( type ) ;
} // OnDirection()

// 角色視窗型對話
NPC.prototype.OnDialog = function() {
	$( "#dialog_01" ).dialog( "open" ) ;
} // OnDialog()