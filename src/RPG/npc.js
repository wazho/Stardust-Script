function NPC( MapControl, Name, x, y, direction, sheet ) {
	this.OnCreate( MapControl, Name, x, y, direction, sheet ) ;
	return this ;
} // NPC() 

// NPC角色建立
NPC.prototype.OnCreate = function( MapControl, Name, x, y, direction, sheet ) {
	// Magic Number !!
	this.spriteSize = 125 ;
	this.effectSpriteSize = 200 ;
	// 地圖控制器
	this.MapControlPointer = MapControl ;
	// 基本資訊設值
	this.name = Name ;
	this.direction = "front" ;
	// 容器建立
	this.container = new createjs.Container() ;
	this.container.name = Name ;
	this.container.regX = this.spriteSize / 2, this.container.regY = this.spriteSize / 2 ;
	this.container.length = this.spriteSize, this.container.height = this.spriteSize ;
	this.container.x = this.MapControlPointer.GetGrid( x, 'x', 'virtual' ) + this.container.regX ;
	this.container.y = this.MapControlPointer.GetGrid( y, 'y', 'virtual' ) + this.container.regY * 0.3 ;
	// 圖層建立
	this.sprite = new createjs.Sprite( SettingSprite( "character", "baphomet" ) ) ;
	this.sprite.regX = this.spriteSize / 2, this.sprite.regY = this.spriteSize / 2 ;
	this.container.addChild( this.sprite ) ;
	// 預設動畫的方向
	this.OnDirection( this.direction ) ;
	// 陰影建立
	this.sprite.shadow = new createjs.Shadow( "#454", 5, 5, 5 ) ;




	// var dog_Image = new Image() ;
	// dog_Image.src = "http://img4.wikia.nocookie.net/__cb20110113130607/farmville/images/c/ca/Husky_Gray-icon.png";
	// var dog = new createjs.Bitmap(dog_Image) ;
	// dog.x = 225, dog.y = 220 ;


} // OnCreate()

// 旋轉NPC角色方向/改變播放圖層
NPC.prototype.OnDirection = function( direction ) {
	this.sprite.gotoAndPlay( direction ) ;
} // OnDirection()
