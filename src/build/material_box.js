function MaterialBox() {
	this.OnCreate() ;
	return this ;
} // MaterialBox() 

// create container
MaterialBox.prototype.OnCreate = function() {
	var that = this ;
	// Material box.
	this.box = new createjs.Container() ;
	this.box.x = 650, this.box.y = 0 ;
	this.box.bg = new createjs.Shape() ;
	this.box.bg.graphics.f( "#FFCCAA" ).r( 0, 0, 350, 550 ) ;
	this.box.addChild( this.box.bg ) ;
	// Material selector container.
	this.box.selector = new createjs.Container() ;
	this.box.selector.x = 25, this.box.selector.y = 25 ;
	this.box.addChild( this.box.selector ) ;
	this.box.selector.statusPage = 0 ;
	this.box.selector.bg = new createjs.Shape() ;
	this.box.selector.bg.graphics.f( "#FFA54F" ).r( 0, 0, 300, 500 ) ;
	this.box.selector.addChild( this.box.selector.bg ) ;
	// Material selector button - texture.
	this.box.selector.buttonA = new createjs.Container() ;
	this.box.selector.buttonA.x = 0, this.box.selector.buttonA.y = 0 ;
	this.box.selector.addChild( this.box.selector.buttonA ) ;
	this.box.selector.buttonA.bg = new createjs.Shape() ;
	this.box.selector.buttonA.bg.graphics.f( "#00BFFF" ).r( 0, 0, 100, 25 ) ;
	this.box.selector.buttonA.text = new createjs.Text( "Texture", "14px comic sans ms", "#000000" ) ;
	this.box.selector.buttonA.text.x = 24, this.box.selector.buttonA.text.y = 7 ;
	this.box.selector.buttonA.addChild( this.box.selector.buttonA.bg, this.box.selector.buttonA.text ) ;
	this.box.selector.buttonA.on( "click", function( evt ) { that.OnSelectEffect( that.box.selector.buttonA ) ; that.OnTexture() ; } ) ;
	// Material selector button - walkable.
	this.box.selector.buttonB = new createjs.Container() ;
	this.box.selector.buttonB.x = 100, this.box.selector.buttonB.y = 0 ;
	this.box.selector.addChild( this.box.selector.buttonB ) ;
	this.box.selector.buttonB.bg = new createjs.Shape() ;
	this.box.selector.buttonB.bg.graphics.f( "#87CEEB" ).r( 0, 0, 100, 25 ) ;
	this.box.selector.buttonB.text = new createjs.Text( "Walkable", "14px comic sans ms", "#000000" ) ;
	this.box.selector.buttonB.text.x = 21, this.box.selector.buttonB.text.y = 7 ;
	this.box.selector.buttonB.addChild( this.box.selector.buttonB.bg, this.box.selector.buttonB.text ) ;
	this.box.selector.buttonB.on( "click", function( evt ) { that.OnSelectEffect( that.box.selector.buttonB ) ; that.OnWalkable() ; } ) ;
	// Material selector button - object.
	this.box.selector.buttonC = new createjs.Container() ;
	this.box.selector.buttonC.x = 200, this.box.selector.buttonC.y = 0 ;
	this.box.selector.addChild( this.box.selector.buttonC ) ;
	this.box.selector.buttonC.bg = new createjs.Shape() ;
	this.box.selector.buttonC.bg.graphics.f( "#00BFFF" ).r( 0, 0, 100, 25 ) ;
	this.box.selector.buttonC.text = new createjs.Text( "Object", "14px comic sans ms", "#000000" ) ;
	this.box.selector.buttonC.text.x = 27, this.box.selector.buttonC.text.y = 7 ;
	this.box.selector.buttonC.addChild( this.box.selector.buttonC.bg, this.box.selector.buttonC.text ) ;
	this.box.selector.buttonC.on( "click", function( evt ) { that.OnSelectEffect( that.box.selector.buttonC ) ; that.OnObject() ; } ) ;
	// Material selector button - light.
	this.box.selector.buttonD = new createjs.Container() ;
	this.box.selector.buttonD.x = 0, this.box.selector.buttonD.y = 25 ;
	this.box.selector.addChild( this.box.selector.buttonD ) ;
	this.box.selector.buttonD.bg = new createjs.Shape() ;
	this.box.selector.buttonD.bg.graphics.f( "#87CEEB" ).r( 0, 0, 100, 25 ) ;
	this.box.selector.buttonD.text = new createjs.Text( "Light", "14px comic sans ms", "#000000" ) ;
	this.box.selector.buttonD.text.x = 35, this.box.selector.buttonD.text.y = 7 ;
	this.box.selector.buttonD.addChild( this.box.selector.buttonD.bg, this.box.selector.buttonD.text ) ;
	this.box.selector.buttonD.on( "click", function( evt ) { that.OnSelectEffect( that.box.selector.buttonD ) ; that.OnLight() ; } ) ;
	// Material selector button - sound.
	this.box.selector.buttonE = new createjs.Container() ;
	this.box.selector.buttonE.x = 100, this.box.selector.buttonE.y = 25 ;
	this.box.selector.addChild( this.box.selector.buttonE ) ;
	this.box.selector.buttonE.bg = new createjs.Shape() ;
	this.box.selector.buttonE.bg.graphics.f( "#00BFFF" ).r( 0, 0, 100, 25 ) ;
	this.box.selector.buttonE.text = new createjs.Text( "Sound", "14px comic sans ms", "#000000" ) ;
	this.box.selector.buttonE.text.x = 31, this.box.selector.buttonE.text.y = 7 ;
	this.box.selector.buttonE.addChild( this.box.selector.buttonE.bg, this.box.selector.buttonE.text ) ;
	this.box.selector.buttonE.on( "click", function( evt ) { that.OnSelectEffect( that.box.selector.buttonE ) ; that.OnSound() ; } ) ;
	// Material selector button - option.
	this.box.selector.buttonF = new createjs.Container() ;
	this.box.selector.buttonF.x = 200, this.box.selector.buttonF.y = 25 ;
	this.box.selector.addChild( this.box.selector.buttonF ) ;
	this.box.selector.buttonF.bg = new createjs.Shape() ;
	this.box.selector.buttonF.bg.graphics.f( "#87CEEB" ).r( 0, 0, 100, 25 ) ;
	this.box.selector.buttonF.text = new createjs.Text( "Option", "14px comic sans ms", "#000000" ) ;
	this.box.selector.buttonF.text.x = 29, this.box.selector.buttonF.text.y = 7 ;
	this.box.selector.buttonF.addChild( this.box.selector.buttonF.bg, this.box.selector.buttonF.text ) ;
	this.box.selector.buttonF.on( "click", function( evt ) { that.OnSelectEffect( that.box.selector.buttonF ) ; that.OnOption() ; } ) ;
	// Material list container.
	this.box.list = new createjs.Container() ;
	this.box.list.x = 30, this.box.list.y = 80 ;
	this.box.addChild( this.box.list ) ;
	this.OnSelectEffect( this.box.selector.buttonF ) ;
	this.OnOption() ;
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
MaterialBox.prototype.OnTexture = function() {
	var that = this ;
	var size = 64, range = 4 ;
	var src = "pic/map/texture/" ;
	// Remove original list first.
	this.box.list.removeAllChildren() ;
	this.box.selector.statusPage = 1 ;
	// List background.
	this.box.list.bg = new createjs.Shape() ;
	this.box.list.bg.graphics.f( "#FFF3DA" ).r( 0, 0, 290, 440 ) ;
	// Texture select container.
	this.box.list.texture = new createjs.Container() ;
	this.box.list.texture.number = 1 ;
	// Page change.
	this.box.list.page = new createjs.Container() ;
	this.box.list.page.x = 35, this.box.list.page.y = 355 ;
	this.box.list.page.prevPage = new createjs.Container() ;
	this.box.list.page.prevPage.x = 0, this.box.list.page.prevPage.y = 0 ;
	this.box.list.page.prevPage.bg = new createjs.Shape() ;
	this.box.list.page.prevPage.bg.graphics.f( "#CCF356" ).r( 0, 0, 100, 50 ) ;
	this.box.list.page.prevPage.bg.x = 0, this.box.list.page.prevPage.bg.y = 0 ;
	this.box.list.page.prevPage.text = new createjs.Text( "<- Previous", "18px comic sans ms", "#000000" ) ;
	this.box.list.page.prevPage.text.x = 5, this.box.list.page.prevPage.text.y = 17 ;
	this.box.list.page.prevPage.addChild( this.box.list.page.prevPage.bg, this.box.list.page.prevPage.text ) ;
	this.box.list.page.prevPage.on( "click", function( evt ) { Refresh( that, -1 ) ; } ) ;
	this.box.list.page.nextPage = new createjs.Container() ;
	this.box.list.page.nextPage.x = 120, this.box.list.page.nextPage.y = 0 ;
	this.box.list.page.nextPage.bg = new createjs.Shape() ;
	this.box.list.page.nextPage.bg.graphics.f( "#CCF356" ).r( 0, 0, 100, 50 ) ;
	this.box.list.page.nextPage.text = new createjs.Text( "Next ->", "18px comic sans ms", "#000000" ) ;
	this.box.list.page.nextPage.text.x = 18, this.box.list.page.nextPage.text.y = 17 ;
	this.box.list.page.nextPage.addChild( this.box.list.page.nextPage.bg, this.box.list.page.nextPage.text ) ;
	this.box.list.page.nextPage.on( "click", function( evt ) { Refresh( that, 1 ) ; } ) ;
	this.box.list.page.addChild( this.box.list.page.prevPage, this.box.list.page.nextPage ) ;
	// Selected for marking.
	this.box.list.marked = new createjs.Container() ;
	this.box.list.marked.pane = new createjs.Shape() ;
	this.box.list.marked.pane.graphics.s( "#FF0000" ).r( 0, 0, size + 1, size + 1 ) ;
	this.box.list.marked.visible = false ;
	this.box.list.marked.addChild( this.box.list.marked.pane ) ;
	// Add to top container.
	this.box.list.addChild( this.box.list.bg, this.box.list.texture, this.box.list.page, this.box.list.marked ) ;
	// Refresh map texture pics. 
	Refresh( this, 0 ) ;

	function Refresh( pt, num ) {
		pt.box.list.texture.removeAllChildren() ;
		pt.box.list.marked.visible = false ;
		// Change pic and drawing.
		pt.box.list.texture.number += ( pt.box.list.texture.number + num > 0 ) ? num : 0 ;
		pt.box.list.texture.pic = new createjs.Bitmap( src + pt.box.list.texture.number + ".png" ) ;
		for ( i = 0 ; i < range ; i ++ )
			for ( j = 0 ; j < range ; j ++ ) {
				pt.box.list.texture.pic.sourceRect = new createjs.Rectangle( j * size, i * size, size, size ) ;
				pt.box.list.texture.pic.name = pt.box.list.texture.number * 100 + ( j + 4 * i ) ;
				pt.box.list.texture.pic.x = 15 + j * ( size + 1 ), pt.box.list.texture.pic.y = 15 + i * ( size + 1 ) ;
				pt.box.list.texture.addChild( pt.box.list.texture.pic.clone( false ) ) ;
			} // for
		// Text info.
		pt.box.list.picName = new createjs.Text( "Name: " + pt.box.list.texture.number + ".png", "18px comic sans ms", "#000000" ) ;
		pt.box.list.picName.x = 35, pt.box.list.picName.y = 307 ;
		pt.box.list.texture.addChild( pt.box.list.picName ) ;
		// Add listening event.
		for ( i = 0 ; i < range * range ; i ++ )
			pt.box.list.texture.getChildAt( i ).on( "click", function( evt ) { MarkedSelected( that, this ) ; } ) ;

		// Number of map : Math.floor( tiled.name / 100 )
		// Index of tiled : tiled.name - Math.floor( tiled.name / 100 ) * 100
		function MarkedSelected( pt, tiled ) {
			pt.box.list.marked.name = tiled.name ;
			pt.box.list.marked.visible = true ;
			var index = tiled.name - Math.floor( ( tiled.name / 100 ) ) * 100 ;
			pt.box.list.marked.x = 14 + ( index % range ) * ( size + 1 ) ;
			pt.box.list.marked.y = 14 + ( Math.floor( index / range ) ) * ( size + 1 ) ;
		} // MarkedSelected()
	} // Refresh()
} // OnTexture()

// 
MaterialBox.prototype.OnWalkable = function() {
	var that = this ;
	var size = 64 ;
	// Remove original list first.
	this.box.list.removeAllChildren() ;
	this.box.selector.statusPage = 2 ;
	// List background.
	this.box.list.bg = new createjs.Shape() ;
	this.box.list.bg.graphics.f( "#FFF3AD" ).r( 0, 0, 290, 440 ) ;
	this.box.list.addChild( this.box.list.bg ) ;
	// Walkable, unwalkable select container.
	this.box.list.walkable = new createjs.Container() ;
	this.box.list.walkable.yes = new createjs.Shape() ;
	this.box.list.walkable.yes.name = "walkable" ;
	this.box.list.walkable.yes.x = 15, this.box.list.walkable.yes.y = 15 ;
	this.box.list.walkable.yes.graphics.f( "#00FF00" ).r( 0, 0, size, size ) ;
	this.box.list.walkable.yes.alpha = 0.5 ;
	this.box.list.walkable.yes.on( "click", function( evt ) { MarkedSelected( that, this ) ; } ) ;
	this.box.list.walkable.no = new createjs.Shape() ;
	this.box.list.walkable.no.name = "unwalkable" ;
	this.box.list.walkable.no.x = 15, this.box.list.walkable.no.y = 95 ;
	this.box.list.walkable.no.graphics.f( "#FF0000" ).r( 0, 0, size, size ) ;
	this.box.list.walkable.no.alpha = 0.5 ;
	this.box.list.walkable.no.on( "click", function( evt ) { MarkedSelected( that, this ) ; } ) ;
	this.box.list.walkable.addChild( this.box.list.walkable.yes, this.box.list.walkable.no ) ;
	// Text info.
	this.box.list.text1 = new createjs.Text( "Walkable", "26px comic sans ms", "#000000" ) ;
	this.box.list.text1.x = 100, this.box.list.text1.y = 37 ;
	this.box.list.text2 = new createjs.Text( "Unwalkable", "26px comic sans ms", "#000000" ) ;
	this.box.list.text2.x = 100, this.box.list.text2.y = 116 ;
	// Selected for marking.
	this.box.list.marked = new createjs.Container() ;
	this.box.list.marked.pane = new createjs.Shape() ;
	this.box.list.marked.pane.graphics.s( "#0200BE" ).r( 0, 0, size + 1, size + 1 ) ;
	this.box.list.marked.visible = false ;
	this.box.list.marked.addChild( this.box.list.marked.pane ) ;
	// Add to top container.
	this.box.list.addChild( this.box.list.bg, this.box.list.walkable, this.box.list.text1, this.box.list.text2, this.box.list.marked ) ;

	function MarkedSelected( pt, con ) {
		console.log( con.name ) ;

		pt.box.list.marked.name = con.name ;
		pt.box.list.marked.visible = true ;
		pt.box.list.marked.x = ( con.name == "walkable" ) ? 14 : 14 ;
		pt.box.list.marked.y = ( con.name == "walkable" ) ? 14 : 94 ;
	} // MarkedSelected()
} // OnWalkable()

// 
MaterialBox.prototype.OnObject = function() {
	// Remove original list first.
	this.box.list.removeAllChildren() ;
	// List background.
	this.box.list.bg = new createjs.Shape() ;
	this.box.list.bg.graphics.f( "#FFF3DA" ).r( 0, 0, 290, 440 ) ;
	this.box.list.addChild( this.box.list.bg ) ;
} // OnObject()

// 
MaterialBox.prototype.OnLight = function() {
	// Remove original list first.
	this.box.list.removeAllChildren() ;
	// List background.
	this.box.list.bg = new createjs.Shape() ;
	this.box.list.bg.graphics.f( "#FFF3AD" ).r( 0, 0, 290, 440 ) ;
	this.box.list.addChild( this.box.list.bg ) ;
} // OnLight()

// 
MaterialBox.prototype.OnSound = function() {
	// Remove original list first.
	this.box.list.removeAllChildren() ;
	// List background.
	this.box.list.bg = new createjs.Shape() ;
	this.box.list.bg.graphics.f( "#FFF3DA" ).r( 0, 0, 290, 440 ) ;
	this.box.list.addChild( this.box.list.bg ) ;
} // OnSound()

// 
MaterialBox.prototype.OnOption = function() {
	// Remove original list first.
	this.box.list.removeAllChildren() ;
	// List background.
	this.box.list.bg = new createjs.Shape() ;
	this.box.list.bg.graphics.f( "#FFF3AD" ).r( 0, 0, 290, 440 ) ;
	this.box.list.addChild( this.box.list.bg ) ;

	this.box.list.pic = new createjs.Bitmap( "pic/husky.png" ) ;
	this.box.list.pic.x = this.box.list.pic.y = 5 ;
	this.box.list.pic.scaleX = this.box.list.pic.scaleY = 0.35 ;
	this.box.list.author = new createjs.Text( "Made by Salmon (http://salmon.tw)", "12px comic sans ms", "#000000" ) ;
	this.box.list.author.x = 48, this.box.list.author.y = 405 ;
	this.box.list.addChild( this.box.list.bg, this.box.list.pic, this.box.list.author ) ;

	this.box.list.newPage = new createjs.Container() ;
	this.box.list.newPage.x = 45, this.box.list.newPage.y = 290 ;
	this.box.list.addChild( this.box.list.newPage ) ;
	this.box.list.newPage.bg = new createjs.Shape() ;
	this.box.list.newPage.bg.graphics.f( "#AA0000" ).r( 0, 0, 200, 30 ) ;
	this.box.list.newPage.text1 = new createjs.Text( "Create New Map", "20px comic sans ms", "#FFFFFF" ) ;
	this.box.list.newPage.text1.x = 22, this.box.list.newPage.text1.y = 7 ;
	this.box.list.newPage.addChild( this.box.list.newPage.bg, this.box.list.newPage.text1 ) ;
	this.box.list.newPage.on( "click", function( evt ) { $( "#dialog_01" ).dialog( "open" ) ; } ) ;

	this.box.list.save = new createjs.Container() ;
	this.box.list.save.x = 45, this.box.list.save.y = 340 ;
	this.box.list.addChild( this.box.list.save ) ;
	this.box.list.save.bg = new createjs.Shape() ;
	this.box.list.save.bg.graphics.f( "#AA0000" ).r( 0, 0, 200, 30 ) ;
	this.box.list.save.text1 = new createjs.Text( "Save the Map to json", "18px comic sans ms", "#FFFFFF" ) ;
	this.box.list.save.text1.x = 12, this.box.list.save.text1.y = 8 ;
	this.box.list.save.addChild( this.box.list.save.bg, this.box.list.save.text1 ) ;	
} // OnOption()