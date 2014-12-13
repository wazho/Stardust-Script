function Main_Framework( canvasSize ) {
	// 容器建立
	this.container = new createjs.Container() ;
	this.container.name = 'Framework' ;
	this.container.length = canvasSize.length ;
	this.container.height = canvasSize.height ;
	// 跑馬燈匯入
	this.marquee = new createjs.Container() ;
	this.container.addChild( this.marquee ) ;
	this.marquee.bg = new createjs.Shape() ;
	this.marquee.text = new createjs.Text( "Welcome to RO RPG browser, my site : salmon.tw", "25px Arial", "#FFF" ) ;
	this.marquee.addChild( this.marquee.bg, this.marquee.text ) ;
	this.OnTopMarquee( 0, 0, 1000, 33, 1000, 5, -1200, 5, "#000", 0.5, 0.85, 15000 ) ;
	// 技能欄匯入
	this.skilltree = new createjs.Container() ;
	this.container.addChild( this.skilltree ) ;
	this.OnSkillTree() ;
	// 裝備欄匯入
	this.equip = new createjs.Container() ;
	this.container.addChild( this.equip ) ;
	this.OnEquipment() ;
	// 物品欄匯入
	this.inventory = new createjs.Container() ;
	this.container.addChild( this.inventory ) ;
	this.OnInventory() ;
	// 角色狀態列匯入
	this.condition = new createjs.Container() ;
	this.container.addChild( this.condition ) ;
	this.OnCondition() ;
	// 背景音樂播放
	setTimeout( function() {
		var instance = createjs.Sound.play( "BGM/1.mp3", { loop: true } ) ;
		setTimeout( function() {
			instance = createjs.Sound.play( "BGM/1.mp3", { loop: true } ) ;
			instance.volume = 0.001 ;
		}, 1000 ) ;
	}, 1000 ) ;
} // Main_Framework()

// 物品欄建立
Main_Framework.prototype.OnInventory = function() {
	this.img = new Image() ;
    this.img.src = "skin_01/box.png" ;
    this.bg = new createjs.Bitmap( this.img ) ;
	this.inventory.addChild( this.bg ) ;
	this.OnBoxAnimation( this.inventory, 280, 143, 70, 560, 0, 16, 1000 ) ;
} // OnInventory()

// 裝備欄建立
Main_Framework.prototype.OnEquipment = function() {
	this.img = new Image() ;
    this.img.src = "skin_01/box.png" ;
    this.bg = new createjs.Bitmap( this.img ) ;
	this.equip.addChild( this.bg ) ;
	this.OnBoxAnimation( this.equip, 280, 143, 145, 560, 0, 16, 1000 ) ;
} // OnEquipment()

// 技能欄建立
Main_Framework.prototype.OnSkillTree = function() {
	this.img = new Image() ;
    this.img.src = "skin_01/box.png" ;
    this.bg = new createjs.Bitmap( this.img ) ;
	this.skilltree.addChild( this.bg ) ;
	// 技能列表容器
	this.skillinfo = new createjs.Container() ;
	this.skilltree.addChild( this.skillinfo ) ;
	this.skillinfo.x = 10, this.skillinfo.y = 22 ;
	// 預設技能資訊為null
	var skill_img = new Array() ;
	for ( i = 0 ; i < 10 ; i ++ ) {
		skill_img[i] = new Image() ;
		skill_img[i].src = "skill/null.png" ;
	} // for
	// 上限有10個技能(圖片、名稱、等級、升級)
	this.skill_list = new Array() ;
	for ( i = 0 ; i < 10 ; i ++ ) {
		this.skill_list[i] = new Array( new createjs.Bitmap( skill_img[i] ),
										new createjs.Text( "Skill_Name", "14px Arial", "#000" ),
										new createjs.Text( "Skill_Lv", "14px Arial", "#000" ) ) ;
		this.skill_list[i][0].regX = 12, this.skill_list[i][0].regY = 12 ;
		this.skill_list[i][0].x = 24, this.skill_list[i][0].y = 24 + i * 37 ;
		this.skill_list[i][1].regX = 0, this.skill_list[i][1].regY = 3 ;
		this.skill_list[i][1].x = 30 + 25, this.skill_list[i][1].y = 20 + i * 37 ;
		this.skill_list[i][2].regX = 0, this.skill_list[i][2].regY = 3 ;
		this.skill_list[i][2].x = 140 + 25, this.skill_list[i][2].y = 20 + i * 37 ;
		this.skillinfo.addChild( this.skill_list[i][0], this.skill_list[i][1], this.skill_list[i][2] ) ;
	} /// for

	skill_img[0].src = "skill/heal.png" ;
	skill_img[1].src = "skill/increase_agility.png" ;
	skill_img[2].src = "skill/blessing.png" ;
	skill_img[3].src = "skill/blessing.png" ;

	this.OnBoxAnimation( this.skilltree, 280, 143, 220, 560, 0, 16, 1000 ) ;
} // OnSkillTree()

// 主要欄位浮動函數
Main_Framework.prototype.OnBoxAnimation = function( container, length, height, x, y, fade_x, fade_y, speed ) {
	container.x = x, container.y = y ;
    // 物品欄顯示消失動畫控制
	var boxShow = false ;
	stage.on( "stagemousemove", function( evt ) {
		if ( boxShow ) {
			if ( evt.stageX < x || evt.stageX > ( x + length ) || evt.stageY < ( y - height + fade_y ) ) {
				boxShow = false ;
				var tween2 = createjs.Tween.get( container, { loop: false } ).to( { y: y }, speed, createjs.Ease.elasticOut ) ;
				createjs.Sound.play( "slash.wav" ) ; 
			} // if
		} // if
		else if ( ! boxShow && evt.stageX > x && evt.stageX < ( x + length - 207 ) && evt.stageY > y ) {
			boxShow = true ;
			var tween1 = createjs.Tween.get( container, { loop: false } ).to( { y: y - height + fade_y }, speed, createjs.Ease.sineOut ) ;
			createjs.Sound.play( "slash.wav" ) ;
		} // else if
	}) ;
} // OnBoxAnimation()

// 角色狀態列建立
Main_Framework.prototype.OnCondition = function() {
	this.bg = new createjs.Shape() ;
	this.bg.graphics.f( "#000" ).r( 0, 0, 35, 310 ) ;
	this.bg.alpha = 0.3 ;
	this.condition.addChild( this.bg ) ;
	this.condition.x = 940, this.condition.y = 150 ;

	var buff_img = new Array() ;
	for ( i = 0 ; i < 10 ; i ++ ) {
		buff_img[i] = new Image() ;
		buff_img[i].src = "skill/null.png" ;
	} // for
	buff_img[0].src = "skill/increase_agility.png" ;

	this.buff = new Array() ;
	for ( i = 0 ; i < 10 ; i ++ ) {
		this.buff[i] = new createjs.Bitmap( buff_img[i] ) ;
		this.buff[i].regX = 12, this.buff[i].regY = 12 ;
		this.buff[i].x = 17, this.buff[i].y = 20 + 30 * i ;
		this.condition.addChild( this.buff[i] ) ;
	} // for
} // OnCondition()

// 跑馬燈
Main_Framework.prototype.OnTopMarquee = function( x, y, length, height, start_x, start_y, end_x, end_y, color, alpha_bg, alpha_text, speed ) {
	this.marquee.bg.graphics.f( color ).r( x, y, length, height ) ;
	this.marquee.bg.alpha = alpha_bg ;
	this.marquee.bg.cache( 0, 0, length, height ) ;
	this.marquee.text.x = start_x, this.marquee.text.y = start_y ;
	this.marquee.text.alpha = alpha_text ;
	createjs.Tween.get( this.marquee.text, { loop: true } ).to( { x: end_x, y: end_y }, speed ) ;
} // OnTopMarquee()
