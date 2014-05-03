function MaterialBox() {
	this.OnCreate() ;
	return this ;
} // MaterialBox() 

// create container
MaterialBox.prototype.OnCreate = function() {
	var that = this ;
	// material box
	this.box = new createjs.Container() ;
	this.box.x = 650, this.box.y = 0 ;
	this.box.bg = new createjs.Shape() ;
	this.box.bg.graphics.beginFill( "#FFCCAA" ).drawRect( 0, 0, 350, 550 ) ;
	this.box.addChild( this.box.bg ) ;
	// material selector container
	this.box.selector = new createjs.Container() ;
	this.box.selector.x = 25, this.box.selector.y = 25 ;
	this.box.addChild( this.box.selector ) ;
	this.box.selector.bg = new createjs.Shape() ;
	this.box.selector.bg.graphics.beginFill( "#FFA54F" ).drawRect( 0, 0, 300, 500 ) ;
	this.box.selector.addChild( this.box.selector.bg ) ;
	// material selector button - texture
	this.box.selector.buttonA = new createjs.Container() ;
	this.box.selector.buttonA.x = 0, this.box.selector.buttonA.y = 0 ;
	this.box.selector.addChild( this.box.selector.buttonA ) ;
	this.box.selector.buttonA.bg = new createjs.Shape() ;
	this.box.selector.buttonA.bg.graphics.beginFill( "#00BFFF" ).drawRect( 0, 0, 100, 25 ) ;
	this.box.selector.buttonA.text = new createjs.Text( "Texture", "14px comic sans ms", "#000000" ) ;
	this.box.selector.buttonA.text.x = 24, this.box.selector.buttonA.text.y = 7 ;
	this.box.selector.buttonA.addChild( this.box.selector.buttonA.bg, this.box.selector.buttonA.text ) ;
	this.box.selector.buttonA.on( "click", function( evt ) { that.OnSelectEffect( that.box.selector.buttonA ) ; that.OnTexture() ; } ) ;
	// material selector button - walkable
	this.box.selector.buttonB = new createjs.Container() ;
	this.box.selector.buttonB.x = 100, this.box.selector.buttonB.y = 0 ;
	this.box.selector.addChild( this.box.selector.buttonB ) ;
	this.box.selector.buttonB.bg = new createjs.Shape() ;
	this.box.selector.buttonB.bg.graphics.beginFill( "#87CEEB" ).drawRect( 0, 0, 100, 25 ) ;
	this.box.selector.buttonB.text = new createjs.Text( "Walkable", "14px comic sans ms", "#000000" ) ;
	this.box.selector.buttonB.text.x = 21, this.box.selector.buttonB.text.y = 7 ;
	this.box.selector.buttonB.addChild( this.box.selector.buttonB.bg, this.box.selector.buttonB.text ) ;
	this.box.selector.buttonB.on( "click", function( evt ) { that.OnSelectEffect( that.box.selector.buttonB ) ; that.OnWalkable() ; } ) ;
	// material selector button - object
	this.box.selector.buttonC = new createjs.Container() ;
	this.box.selector.buttonC.x = 200, this.box.selector.buttonC.y = 0 ;
	this.box.selector.addChild( this.box.selector.buttonC ) ;
	this.box.selector.buttonC.bg = new createjs.Shape() ;
	this.box.selector.buttonC.bg.graphics.beginFill( "#00BFFF" ).drawRect( 0, 0, 100, 25 ) ;
	this.box.selector.buttonC.text = new createjs.Text( "Object", "14px comic sans ms", "#000000" ) ;
	this.box.selector.buttonC.text.x = 27, this.box.selector.buttonC.text.y = 7 ;
	this.box.selector.buttonC.addChild( this.box.selector.buttonC.bg, this.box.selector.buttonC.text ) ;
	this.box.selector.buttonC.on( "click", function( evt ) { that.OnSelectEffect( that.box.selector.buttonC ) ; that.OnObject() ; } ) ;
	// material selector button - light
	this.box.selector.buttonD = new createjs.Container() ;
	this.box.selector.buttonD.x = 0, this.box.selector.buttonD.y = 25 ;
	this.box.selector.addChild( this.box.selector.buttonD ) ;
	this.box.selector.buttonD.bg = new createjs.Shape() ;
	this.box.selector.buttonD.bg.graphics.beginFill( "#87CEEB" ).drawRect( 0, 0, 100, 25 ) ;
	this.box.selector.buttonD.text = new createjs.Text( "Light", "14px comic sans ms", "#000000" ) ;
	this.box.selector.buttonD.text.x = 35, this.box.selector.buttonD.text.y = 7 ;
	this.box.selector.buttonD.addChild( this.box.selector.buttonD.bg, this.box.selector.buttonD.text ) ;
	this.box.selector.buttonD.on( "click", function( evt ) { that.OnSelectEffect( that.box.selector.buttonD ) ; that.OnLight() ; } ) ;
	// material selector button - sound
	this.box.selector.buttonE = new createjs.Container() ;
	this.box.selector.buttonE.x = 100, this.box.selector.buttonE.y = 25 ;
	this.box.selector.addChild( this.box.selector.buttonE ) ;
	this.box.selector.buttonE.bg = new createjs.Shape() ;
	this.box.selector.buttonE.bg.graphics.beginFill( "#00BFFF" ).drawRect( 0, 0, 100, 25 ) ;
	this.box.selector.buttonE.text = new createjs.Text( "Sound", "14px comic sans ms", "#000000" ) ;
	this.box.selector.buttonE.text.x = 31, this.box.selector.buttonE.text.y = 7 ;
	this.box.selector.buttonE.addChild( this.box.selector.buttonE.bg, this.box.selector.buttonE.text ) ;
	this.box.selector.buttonE.on( "click", function( evt ) { that.OnSelectEffect( that.box.selector.buttonE ) ; that.OnSound() ; } ) ;
	// material selector button - save
	this.box.selector.buttonF = new createjs.Container() ;
	this.box.selector.buttonF.x = 200, this.box.selector.buttonF.y = 25 ;
	this.box.selector.addChild( this.box.selector.buttonF ) ;
	this.box.selector.buttonF.bg = new createjs.Shape() ;
	this.box.selector.buttonF.bg.graphics.beginFill( "#87CEEB" ).drawRect( 0, 0, 100, 25 ) ;
	this.box.selector.buttonF.text = new createjs.Text( "Save", "14px comic sans ms", "#000000" ) ;
	this.box.selector.buttonF.text.x = 35, this.box.selector.buttonF.text.y = 7 ;
	this.box.selector.buttonF.addChild( this.box.selector.buttonF.bg, this.box.selector.buttonF.text ) ;
	this.box.selector.buttonF.on( "click", function( evt ) { that.OnSelectEffect( that.box.selector.buttonF ) ; that.OnSave() ; } ) ;
	// material list container
	this.box.list = new createjs.Container() ;
	this.box.list.x = 30, this.box.list.y = 80 ;
	this.box.addChild( this.box.list ) ;
	this.OnInit() ;
} // OnCreate()

MaterialBox.prototype.OnSelectEffect = function( select ) {
	this.box.selector.buttonA.text.color = "#000000" ;
	this.box.selector.buttonB.text.color = "#000000" ;
	this.box.selector.buttonC.text.color = "#000000" ;
	this.box.selector.buttonD.text.color = "#000000" ;
	this.box.selector.buttonE.text.color = "#000000" ;
	this.box.selector.buttonF.text.color = "#000000" ;
	select.text.color = "#FF0000" ;
} // OnSelectEffect()

// 
MaterialBox.prototype.OnInit = function() {
	this.box.list.removeAllChildren() ;

	this.box.list.bg = new createjs.Shape() ;
	this.box.list.bg.graphics.beginFill( "#FFF3DA" ).drawRect( 0, 0, 290, 440 ) ;

	this.box.list.texture = new createjs.Bitmap( "pic/husky.png" ) ;
	this.box.list.texture.x = this.box.list.texture.y = 5 ;
	this.box.list.texture.scaleX = this.box.list.texture.scaleY = 0.35 ;
	this.box.list.author = new createjs.Text( "Tiled map editor\n\n   Made by Salmon", "24px comic sans ms", "#000000" ) ;
	this.box.list.author.x = 45, this.box.list.author.y = 307 ;
	this.box.list.addChild( this.box.list.bg, this.box.list.texture, this.box.list.author ) ;
	stage.update() ;
} // OnInit()

// 
MaterialBox.prototype.OnTexture = function() {
	var that = this ;
	var size = 64, range = 4 ;
	var src = "pic/map/texture/" ;
	// Remove original list first.
	this.box.list.removeAllChildren() ;
	// List background.
	this.box.list.bg = new createjs.Shape() ;
	this.box.list.bg.graphics.beginFill( "#FFF3DA" ).drawRect( 0, 0, 290, 440 ) ;
	// Texture select container.
	this.box.list.texture = new createjs.Container() ;
	this.box.list.texture.number = 1 ;
	// Refresh map texture pics. 
	function refresh( pt, num ) {
		pt.box.list.texture.removeAllChildren() ;
		pt.box.list.texture.number += ( pt.box.list.texture.number + num > 0 ) ? num : 0 ;
		pt.box.list.texture.pic = new createjs.Bitmap( src + pt.box.list.texture.number + ".png" ) ;
		for ( i = 0 ; i < range ; i ++ )
			for ( j = 0 ; j < range ; j ++ ) {
				pt.box.list.texture.pic.sourceRect = new createjs.Rectangle( j * size, i * size, size, size ) ;
				pt.box.list.texture.pic.name = j + 4 * i ;
				pt.box.list.texture.pic.x = 15 + j * ( size + 1 ), pt.box.list.texture.pic.y = 15 + i * ( size + 1 ) ;
				pt.box.list.texture.addChild( pt.box.list.texture.pic.clone( false ) ) ;
			} // for
		for ( i = 0 ; i < range * range ; i ++ )
			pt.box.list.texture.getChildAt( i ).on( "click", function( evt ) { console.log( this.name ) ; } ) ;
		// Text info.
		pt.box.list.picName = new createjs.Text( "Name: " + pt.box.list.texture.number + ".png", "18px comic sans ms", "#000000" ) ;
		pt.box.list.picName.x = 35, pt.box.list.picName.y = 307 ;
		pt.box.list.texture.addChild( pt.box.list.picName ) ;
		stage.update() ;
	} // refresh
	refresh( this, 0 ) ;
	// Page change.
	this.box.list.page = new createjs.Container() ;
	this.box.list.page.x = 35, this.box.list.page.y = 355 ;
	this.box.list.page.prevPage = new createjs.Container() ;
	this.box.list.page.prevPage.x = 0, this.box.list.page.prevPage.y = 0 ;
	this.box.list.page.prevPage.bg = new createjs.Shape() ;
	this.box.list.page.prevPage.bg.graphics.beginFill( "#CCF356" ).drawRect( 0, 0, 100, 50 ) ;
	this.box.list.page.prevPage.bg.x = 0, this.box.list.page.prevPage.bg.y = 0 ;
	this.box.list.page.prevPage.text = new createjs.Text( "<- Previous", "18px comic sans ms", "#000000" ) ;
	this.box.list.page.prevPage.text.x = 5, this.box.list.page.prevPage.text.y = 17 ;
	this.box.list.page.prevPage.addChild( this.box.list.page.prevPage.bg, this.box.list.page.prevPage.text ) ;
	this.box.list.page.prevPage.on( "click", function( evt ) { refresh( that, -1 ) ; } ) ;
	this.box.list.page.nextPage = new createjs.Container() ;
	this.box.list.page.nextPage.x = 120, this.box.list.page.nextPage.y = 0 ;
	this.box.list.page.nextPage.bg = new createjs.Shape() ;
	this.box.list.page.nextPage.bg.graphics.beginFill( "#CCF356" ).drawRect( 0, 0, 100, 50 ) ;
	this.box.list.page.nextPage.text = new createjs.Text( "Next ->", "18px comic sans ms", "#000000" ) ;
	this.box.list.page.nextPage.text.x = 18, this.box.list.page.nextPage.text.y = 17 ;
	this.box.list.page.nextPage.addChild( this.box.list.page.nextPage.bg, this.box.list.page.nextPage.text ) ;
	this.box.list.page.nextPage.on( "click", function( evt ) { refresh( that, 1 ) ; } ) ;
	this.box.list.page.addChild( this.box.list.page.prevPage, this.box.list.page.nextPage ) ;
	// Add to top container.
	this.box.list.addChild( this.box.list.bg, this.box.list.texture, this.box.list.page ) ;
	stage.update() ;
} // OnTexture()

// 
MaterialBox.prototype.OnWalkable = function() {
	var size = 64 ;
	// Remove original list first.
	this.box.list.removeAllChildren() ;
	// List background.
	this.box.list.bg = new createjs.Shape() ;
	this.box.list.bg.graphics.beginFill( "#FFF3AD" ).drawRect( 0, 0, 290, 440 ) ;
	this.box.list.addChild( this.box.list.bg ) ;
	// Walkable, unwalkable select container.
	this.box.list.walkable = new createjs.Container() ;
	this.box.list.walkable.yes = new createjs.Shape() ;
	this.box.list.walkable.yes.x = 15, this.box.list.walkable.yes.y = 15 ;
	this.box.list.walkable.yes.graphics.f( "#00FF00" ).r( 0, 0, size, size ) ;
	this.box.list.walkable.yes.alpha = 0.5 ;
	this.box.list.walkable.no = new createjs.Shape() ;
	this.box.list.walkable.no.x = 15, this.box.list.walkable.no.y = 30 + size ;
	this.box.list.walkable.no.graphics.f( "#FF0000" ).r( 0, 0, size, size ) ;
	this.box.list.walkable.no.alpha = 0.5 ;
	this.box.list.walkable.addChild( this.box.list.walkable.yes, this.box.list.walkable.no ) ;
	// Text info.
	this.box.list.text1 = new createjs.Text( "Walkable", "26px comic sans ms", "#000000" ) ;
	this.box.list.text1.x = 100, this.box.list.text1.y = 37 ;
	this.box.list.text2 = new createjs.Text( "Unwalkable", "26px comic sans ms", "#000000" ) ;
	this.box.list.text2.x = 100, this.box.list.text2.y = 116 ;
	// Add to top container.
	this.box.list.addChild( this.box.list.bg, this.box.list.walkable, this.box.list.text1, this.box.list.text2 ) ;
	stage.update() ;
} // OnWalkable()

// 
MaterialBox.prototype.OnObject = function() {
	// Remove original list first.
	this.box.list.removeAllChildren() ;
	// List background.
	this.box.list.bg = new createjs.Shape() ;
	this.box.list.bg.graphics.beginFill( "#FFF3DA" ).drawRect( 0, 0, 290, 440 ) ;
	this.box.list.addChild( this.box.list.bg ) ;

	stage.update() ;
} // OnObject()

// 
MaterialBox.prototype.OnLight = function() {
	// Remove original list first.
	this.box.list.removeAllChildren() ;
	// List background.
	this.box.list.bg = new createjs.Shape() ;
	this.box.list.bg.graphics.beginFill( "#FFF3AD" ).drawRect( 0, 0, 290, 440 ) ;
	this.box.list.addChild( this.box.list.bg ) ;

	stage.update() ;
} // OnLight()

// 
MaterialBox.prototype.OnSound = function() {
	// Remove original list first.
	this.box.list.removeAllChildren() ;
	// List background.
	this.box.list.bg = new createjs.Shape() ;
	this.box.list.bg.graphics.beginFill( "#FFF3DA" ).drawRect( 0, 0, 290, 440 ) ;
	this.box.list.addChild( this.box.list.bg ) ;

	stage.update() ;
} // OnSound()

// 
MaterialBox.prototype.OnSave = function() {
	// Remove original list first.
	this.box.list.removeAllChildren() ;
	// List background.
	this.box.list.bg = new createjs.Shape() ;
	this.box.list.bg.graphics.beginFill( "#FFF3AD" ).drawRect( 0, 0, 290, 440 ) ;
	this.box.list.addChild( this.box.list.bg ) ;

	stage.update() ;
} // OnSave()