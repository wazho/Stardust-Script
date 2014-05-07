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
	// Material selector container.
	this.box.selector = new createjs.Container() ;
	this.box.selector.x = 25, this.box.selector.y = 25 ;
	this.box.addChild( this.box.selector ) ;
	this.box.selector.statusPage = 0 ;
	// Material selector button - texture.
	this.box.selector.buttonA = new createjs.Container() ;
	this.box.selector.buttonA.x = 0, this.box.selector.buttonA.y = 0 ;
	this.box.selector.addChild( this.box.selector.buttonA ) ;
	this.box.selector.buttonA.bg = new createjs.Bitmap( "pic/map_build/buttonA.png" ) ;
	this.box.selector.buttonA.bg.scaleX = this.box.selector.buttonA.bg.scaleY = 0.45 ;
	this.box.selector.buttonA.text = new createjs.Text( "Texture", "14px comic sans ms", "#FFFFFF" ) ;
	this.box.selector.buttonA.text.x = 50, this.box.selector.buttonA.text.y = 35 ;
	this.box.selector.buttonA.addChild( this.box.selector.buttonA.bg, this.box.selector.buttonA.text ) ;
	this.box.selector.buttonA.on( "click", function( evt ) { that.OnSelectEffect( that.box.selector.buttonA ) ; that.OnTexture() ; } ) ;
	// Material selector button - walkable.
	this.box.selector.buttonB = new createjs.Container() ;
	this.box.selector.buttonB.x = 100, this.box.selector.buttonB.y = 0 ;
	this.box.selector.addChild( this.box.selector.buttonB ) ;
	this.box.selector.buttonB.bg = new createjs.Bitmap( "pic/map_build/buttonB.png" ) ;
	this.box.selector.buttonB.bg.scaleX = this.box.selector.buttonB.bg.scaleY = 0.45 ;
	this.box.selector.buttonB.text = new createjs.Text( "Walk", "14px comic sans ms", "#FFFFFF" ) ;
	this.box.selector.buttonB.text.x = 58, this.box.selector.buttonB.text.y = 35 ;
	this.box.selector.buttonB.addChild( this.box.selector.buttonB.bg, this.box.selector.buttonB.text ) ;
	this.box.selector.buttonB.on( "click", function( evt ) { that.OnSelectEffect( that.box.selector.buttonB ) ; that.OnWalkable() ; } ) ;
	// Material selector button - object.
	this.box.selector.buttonC = new createjs.Container() ;
	this.box.selector.buttonC.x = 200, this.box.selector.buttonC.y = 0 ;
	this.box.selector.addChild( this.box.selector.buttonC ) ;
	this.box.selector.buttonC.bg = new createjs.Bitmap( "pic/map_build/buttonC.png" ) ;
	this.box.selector.buttonC.bg.scaleX = this.box.selector.buttonC.bg.scaleY = 0.45 ;
	this.box.selector.buttonC.text = new createjs.Text( "Object", "14px comic sans ms", "#FFFFFF" ) ;
	this.box.selector.buttonC.text.x = 50, this.box.selector.buttonC.text.y = 35 ;
	this.box.selector.buttonC.addChild( this.box.selector.buttonC.bg, this.box.selector.buttonC.text ) ;
	this.box.selector.buttonC.on( "click", function( evt ) { that.OnSelectEffect( that.box.selector.buttonC ) ; that.OnObject() ; } ) ;
	// Material selector button - light.
	this.box.selector.buttonD = new createjs.Container() ;
	this.box.selector.buttonD.x = 45, this.box.selector.buttonD.y = 45 ;
	this.box.selector.addChild( this.box.selector.buttonD ) ;
	this.box.selector.buttonD.bg = new createjs.Bitmap( "pic/map_build/buttonD.png" ) ;
	this.box.selector.buttonD.bg.scaleX = this.box.selector.buttonD.bg.scaleY = 0.45 ;
	this.box.selector.buttonD.text = new createjs.Text( "Light", "14px comic sans ms", "#FFFFFF" ) ;
	this.box.selector.buttonD.text.x = -32, this.box.selector.buttonD.text.y = 35 ;
	this.box.selector.buttonD.addChild( this.box.selector.buttonD.bg, this.box.selector.buttonD.text ) ;
	this.box.selector.buttonD.on( "click", function( evt ) { that.OnSelectEffect( that.box.selector.buttonD ) ; that.OnLight() ; } ) ;
	// Material selector button - sound.
	this.box.selector.buttonE = new createjs.Container() ;
	this.box.selector.buttonE.x = 145, this.box.selector.buttonE.y = 45 ;
	this.box.selector.addChild( this.box.selector.buttonE ) ;
	this.box.selector.buttonE.bg = new createjs.Bitmap( "pic/map_build/buttonE.png" ) ;
	this.box.selector.buttonE.bg.scaleX = this.box.selector.buttonE.bg.scaleY = 0.45 ;
	this.box.selector.buttonE.text = new createjs.Text( "Sound", "14px comic sans ms", "#FFFFFF" ) ;
	this.box.selector.buttonE.text.x = -35, this.box.selector.buttonE.text.y = 35 ;
	this.box.selector.buttonE.addChild( this.box.selector.buttonE.bg, this.box.selector.buttonE.text ) ;
	this.box.selector.buttonE.on( "click", function( evt ) { that.OnSelectEffect( that.box.selector.buttonE ) ; that.OnSound() ; } ) ;
	// Material selector button - option.
	this.box.selector.buttonF = new createjs.Container() ;
	this.box.selector.buttonF.x = 245, this.box.selector.buttonF.y = 45 ;
	this.box.selector.addChild( this.box.selector.buttonF ) ;
	this.box.selector.buttonF.bg = new createjs.Bitmap( "pic/map_build/buttonF.png" ) ;
	this.box.selector.buttonF.bg.scaleX = this.box.selector.buttonF.bg.scaleY = 0.45 ;
	this.box.selector.buttonF.text = new createjs.Text( "Option", "14px comic sans ms", "#FFFFFF" ) ;
	this.box.selector.buttonF.text.x = -40, this.box.selector.buttonF.text.y = 35 ;
	this.box.selector.buttonF.addChild( this.box.selector.buttonF.bg, this.box.selector.buttonF.text ) ;
	this.box.selector.buttonF.on( "click", function( evt ) { that.OnSelectEffect( that.box.selector.buttonF ) ; that.OnOption() ; } ) ;
	// Material list container.
	this.box.list = new createjs.Container() ;
	this.box.list.x = 30, this.box.list.y = 130 ;
	this.box.addChild( this.box.list ) ;
	this.OnSelectEffect( this.box.selector.buttonF ) ;
	// Initial.
	this.OnTexture() ;
	this.OnOption() ;
} // OnCreate()

MaterialBox.prototype.OnSelectEffect = function( select ) {
	this.box.selector.buttonA.text.color = "#FFFFFF" ;
	this.box.selector.buttonB.text.color = "#FFFFFF" ;
	this.box.selector.buttonC.text.color = "#FFFFFF" ;
	this.box.selector.buttonD.text.color = "#FFFFFF" ;
	this.box.selector.buttonE.text.color = "#FFFFFF" ;
	this.box.selector.buttonF.text.color = "#FFFFFF" ;
	select.text.color = "#FF0000" ;
} // OnSelectEffect()

// 
MaterialBox.prototype.OnTexture = function() {
	var that = this ;
	// Remove original list first.
	this.box.list.removeAllChildren() ;
	this.box.selector.statusPage = 1 ;
	// Texture select container.
	this.box.list.texture = new createjs.Container() ;
	this.box.list.texture.number = 1 ;
	// Page change.
	this.box.list.page = new createjs.Container() ;
	this.box.list.page.x = 15, this.box.list.page.y = 355 ;
	this.box.list.page.prevPage = new createjs.Container() ;
	this.box.list.page.prevPage.x = 0, this.box.list.page.prevPage.y = 0 ;
	this.box.list.page.prevPage.bg = new createjs.Bitmap( "pic/map_build/previous.png" ) ;
	this.box.list.page.prevPage.addChild( this.box.list.page.prevPage.bg ) ;
	this.box.list.page.prevPage.on( "click", function( evt ) { Refresh( that, -1 ) ; } ) ;
	this.box.list.page.nextPage = new createjs.Container() ;
	this.box.list.page.nextPage.x = 140, this.box.list.page.nextPage.y = 0 ;
	this.box.list.page.nextPage.bg = new createjs.Bitmap( "pic/map_build/next.png" ) ;
	this.box.list.page.nextPage.addChild( this.box.list.page.nextPage.bg ) ;
	this.box.list.page.nextPage.on( "click", function( evt ) { Refresh( that, 1 ) ; } ) ;
	this.box.list.page.addChild( this.box.list.page.prevPage, this.box.list.page.nextPage ) ;
	// Selected for marking.
	this.box.list.marked = new createjs.Container() ;
	this.box.list.marked.pane = new createjs.Shape() ;
	this.box.list.marked.pane.graphics.s( "#FF0000" ).r( 0, 0, G.size + 1, G.size + 1 ) ;
	this.box.list.marked.visible = false ;
	this.box.list.marked.addChild( this.box.list.marked.pane ) ;
	// Add to top container.
	this.box.list.addChild( this.box.list.texture, this.box.list.page, this.box.list.marked ) ;
	// Refresh map texture pics. 
	Refresh( this, 0 ) ;

	function Refresh( pt, num ) {
		if ( pt.box.list.texture.number + num > texture_adding.length )
			return ;
		pt.box.list.texture.removeAllChildren() ;
		pt.box.list.marked.visible = false ;
		// Change pic and drawing.
		pt.box.list.texture.number += ( pt.box.list.texture.number + num > 0 ) ? num : 0 ;
		pt.box.list.texture.pic = new createjs.Bitmap( G.textureSrc + texture_adding[pt.box.list.texture.number-1].file ) ;
		for ( i = 0 ; i < G.range ; i ++ )
			for ( j = 0 ; j < G.range ; j ++ ) {
				pt.box.list.texture.pic.sourceRect = new createjs.Rectangle( j * G.size, i * G.size, G.size, G.size ) ;
				pt.box.list.texture.pic.name = pt.box.list.texture.number * 100 + ( j + G.range * i ) ;
				pt.box.list.texture.pic.x = 15 + j * ( G.size + 1 ), pt.box.list.texture.pic.y = 15 + i * ( G.size + 1 ) ;
				pt.box.list.texture.addChild( pt.box.list.texture.pic.clone( false ) ) ;
			} // for
		// Add listening event.
		for ( i = 0 ; i < G.range * G.range ; i ++ )
			pt.box.list.texture.getChildAt( i ).on( "click", function( evt ) { MarkedSelected( that, this, G ) ; } ) ;
		// Text info.
		pt.box.list.picNum = new createjs.Text( "[" + pt.box.list.texture.number + "/" + texture_adding.length + "]", "18px comic sans ms", "#FFFFFF" ) ;
		pt.box.list.picNum.x = 15, pt.box.list.picNum.y = 297 ;
		pt.box.list.picName = new createjs.Text( texture_adding[pt.box.list.texture.number-1].decs, "18px comic sans ms", "#FFFFFF" ) ;
		pt.box.list.picName.x = 15, pt.box.list.picName.y = 322 ;
		pt.box.list.texture.addChild( pt.box.list.picNum, pt.box.list.picName ) ;
		// Container background.
		pt.box.list.texture.bg = new createjs.Shape() ;
		pt.box.list.texture.bg.x = pt.box.list.texture.bg.y = 15 ;
		pt.box.list.texture.bg.graphics.f( "#FFFFFF" ).r( 0, 0, 255 + G.range, 255 + G.range ) ;
		pt.box.list.texture.addChildAt( pt.box.list.texture.bg, 0 ) ;

		// Number of map : Math.floor( tiled.name / 100 )
		// Index of tiled : tiled.name - Math.floor( tiled.name / 100 ) * 100
		function MarkedSelected( pt, tiled, G ) {
			pt.box.list.marked.name = tiled.name ;
			pt.box.list.marked.visible = true ;
			var index = tiled.name - Math.floor( ( tiled.name / 100 ) ) * 100 ;
			pt.box.list.marked.x = 14 + ( index % G.range ) * ( G.size + 1 ) ;
			pt.box.list.marked.y = 14 + ( Math.floor( index / G.range ) ) * ( G.size + 1 ) ;
		} // MarkedSelected()
	} // Refresh()
} // OnTexture()

// 
MaterialBox.prototype.OnWalkable = function() {
	var that = this ;
	// Remove original list first.
	this.box.list.removeAllChildren() ;
	this.box.selector.statusPage = 2 ;
	// Walkable, unwalkable select container.
	this.box.list.walkable = new createjs.Container() ;
	this.box.list.walkable.yes = new createjs.Shape() ;
	this.box.list.walkable.yes.name = "walkable" ;
	this.box.list.walkable.yes.regX = this.box.list.walkable.yes.regY = G.size / 2 ;
	this.box.list.walkable.yes.graphics.f( "#00FF00" ).r( 45, 45, G.size, G.size ) ;
	this.box.list.walkable.yes.alpha = 0.5 ;
	this.box.list.walkable.yes.on( "click", function( evt ) { MarkedSelected( that, this ) ; } ) ;
	this.box.list.walkable.no = new createjs.Shape() ;
	this.box.list.walkable.no.name = "unwalkable" ;
	this.box.list.walkable.no.regX = this.box.list.walkable.no.regY = G.size / 2 ;
	this.box.list.walkable.no.graphics.f( "#FF0000" ).r( 45, 125, G.size, G.size ) ;
	this.box.list.walkable.no.alpha = 0.5 ;
	this.box.list.walkable.no.on( "click", function( evt ) { MarkedSelected( that, this ) ; } ) ;
	this.box.list.walkable.addChild( this.box.list.walkable.yes, this.box.list.walkable.no ) ;
	// Text info.
	this.box.list.text1 = new createjs.Text( "Walkable", "26px comic sans ms", "#FFFFFF" ) ;
	this.box.list.text1.x = 100, this.box.list.text1.y = 37 ;
	this.box.list.text2 = new createjs.Text( "Unwalkable", "26px comic sans ms", "#FFFFFF" ) ;
	this.box.list.text2.x = 100, this.box.list.text2.y = 116 ;
	// Selected for marking.
	this.box.list.marked = new createjs.Container() ;
	this.box.list.marked.pane = new createjs.Shape() ;
	this.box.list.marked.pane.regX = this.box.list.marked.pane.regY = G.size / 2 ;
	this.box.list.marked.pane.graphics.s( "#FFFFFF" ).r( 45, 0, G.size + 1, G.size + 1 ) ;
	this.box.list.marked.visible = false ;
	this.box.list.marked.addChild( this.box.list.marked.pane ) ;
	// Add to top container.
	this.box.list.addChild( this.box.list.walkable, this.box.list.text1, this.box.list.text2, this.box.list.marked ) ;

	function MarkedSelected( pt, con ) {
		pt.box.list.marked.name = con.name ;
		pt.box.list.marked.visible = true ;
		pt.box.list.marked.y = ( con.name == "walkable" ) ? 45 : 125 ;
		pt.box.list.text1.color = ( con.name == "walkable" ) ? "#00FF00" : "#FFFFFF" ;
		pt.box.list.text2.color = ( con.name == "walkable" ) ? "#FFFFFF" : "#FF0000" ;
	} // MarkedSelected()
} // OnWalkable()

// 
MaterialBox.prototype.OnObject = function() {
	var that = this ;
	// Remove original list first.
	this.box.list.removeAllChildren() ;
	this.box.selector.statusPage = 3 ;
	// Texture select container.
	this.box.list.objects = new createjs.Container() ;
	this.box.list.objects.number = 1 ;
	// Page change.
	this.box.list.page = new createjs.Container() ;
	this.box.list.page.x = 15, this.box.list.page.y = 355 ;
	this.box.list.page.prevPage = new createjs.Container() ;
	this.box.list.page.prevPage.x = 0, this.box.list.page.prevPage.y = 0 ;
	this.box.list.page.prevPage.bg = new createjs.Bitmap( "pic/map_build/previous.png" ) ;
	this.box.list.page.prevPage.addChild( this.box.list.page.prevPage.bg ) ;
	this.box.list.page.prevPage.on( "click", function( evt ) { Refresh( that, -1 ) ; } ) ;
	this.box.list.page.nextPage = new createjs.Container() ;
	this.box.list.page.nextPage.x = 140, this.box.list.page.nextPage.y = 0 ;
	this.box.list.page.nextPage.bg = new createjs.Bitmap( "pic/map_build/next.png" ) ;
	this.box.list.page.nextPage.addChild( this.box.list.page.nextPage.bg ) ;
	this.box.list.page.nextPage.on( "click", function( evt ) { Refresh( that, 1 ) ; } ) ;
	this.box.list.page.addChild( this.box.list.page.prevPage, this.box.list.page.nextPage ) ;
	// Add to top container.
	this.box.list.addChild( this.box.list.objects, this.box.list.page ) ;
	// Refresh map texture pics. 
	Refresh( this, 0 ) ;

	function Refresh( pt, num ) {
		if ( pt.box.list.objects.number + num > object_adding.length )
			return ;
		pt.box.list.objects.removeAllChildren() ;
		pt.box.list.marked.visible = false ;
		// Get the new object pic rule.
		pt.box.list.objects.number += ( pt.box.list.objects.number + num > 0 ) ? num : 0 ;
		var object_rule = object_adding[pt.box.list.objects.number-1] ;
		// Container background.
		pt.box.list.objects.bg = new createjs.Shape() ;
		pt.box.list.objects.bg.graphics.f( "#FFFFFF" ).r( 15, 15, 255 + G.range, 255 + G.range ) ;
		// Change pic and drawing.
		pt.box.list.objects.pic = new createjs.Bitmap( G.objectSrc + object_rule.file ) ;
		pt.box.list.objects.pic.regX = pt.box.list.objects.pic.getBounds().width / 2 ;
		pt.box.list.objects.pic.regY = pt.box.list.objects.pic.getBounds().height / 2 ;
		pt.box.list.objects.pic.x = pt.box.list.objects.pic.y = 15 + ( 255 + G.range ) / 2 ; ;
		// Mask to covered and coverer.
		pt.box.list.objects.cover = new createjs.Container() ;
		pt.box.list.objects.cover.coverer = new createjs.Shape() ;
		pt.box.list.objects.cover.coverer.graphics.f( "#00FF00" ).r( 15, 15, 255 + G.range, object_rule.divi ) ;
		pt.box.list.objects.cover.coverer.alpha = 0.2 ;
		pt.box.list.objects.cover.covered = new createjs.Shape() ;
		pt.box.list.objects.cover.covered.graphics.f( "#FF0000" ).r( 15, 15 + object_rule.divi, 255 + G.range, ( 255 + G.range ) - object_rule.divi ) ;
		pt.box.list.objects.cover.covered.alpha = 0.2 ;
		// Set front end / back end containers.
		sampleContainerA = new createjs.Container() ;
		sampleContainerA.x = 65, sampleContainerA.y = object_rule.divi / 2 ;
		sampleContainerA.visible = ( object_rule.divi >= 80 ) ? true : false ;
		sampleContainerA.addChild( getFloatingSample() ) ;
		sampleContainerB = new createjs.Container() ;
		sampleContainerB.x = 65, sampleContainerB.y = object_rule.divi + ( ( 255 + G.range ) - object_rule.divi ) / 5 * 2 ;
		sampleContainerB.visible = ( 255 + G.range - object_rule.divi >= 80 ) ? true : false ;
		sampleContainerB.addChild( getFloatingSample() ) ;
		// Add front end / back end objects to 'object cover' container.
		pt.box.list.objects.cover.addChild( sampleContainerA, pt.box.list.objects.pic, pt.box.list.objects.cover.coverer, sampleContainerB, pt.box.list.objects.cover.covered ) ; 
		// Text info.
		pt.box.list.picNum = new createjs.Text( "[" + pt.box.list.objects.number + "/" + object_adding.length + "]", "18px comic sans ms", "#FFFFFF" ) ;
		pt.box.list.picNum.x = 15, pt.box.list.picNum.y = 297 ;
		pt.box.list.picName = new createjs.Text( object_rule.decs, "18px comic sans ms", "#FFFFFF" ) ;
		pt.box.list.picName.x = 15, pt.box.list.picName.y = 322 ;
		pt.box.list.objects.addChild( pt.box.list.picNum, pt.box.list.picName ) ;
		// Add all to top container.
		pt.box.list.objects.addChild( pt.box.list.objects.bg, pt.box.list.objects.cover, pt.box.list.picName ) ;
	} // Refresh()

	function getFloatingSample() {
		var sample_sheet = new createjs.SpriteSheet( {
			"images": ["pic/map_build/cover_sample.png"], 
			"frames": { "width": 125, "height": 125, "regX": 63, "regY": 63, "count": 8 },
			"animations": { "walk": { "frames": [0,1,2,3,4,5,6,7], "speed": 0.3 } }
		} ) ;
		var sample = new createjs.BitmapAnimation( sample_sheet ) ;
		sample.gotoAndPlay( "walk" ) ;
		createjs.Tween.get( sample, { loop: true } )
			.call( function(){ sample.scaleX = -1 } )
			.to( { x: 170 }, 1500, createjs.Ease.quadInOut )
			.call( function(){ sample.scaleX = 1 } )
			.to( { x: 0 }, 1500, createjs.Ease.quadInOut ) ;
		createjs.Tween.get( sample, { loop: true } )
			.to( { y: 15 }, 500, createjs.Ease.quadInOut )
			.to( { y: 0 }, 500, createjs.Ease.quadInOut ) ;
		return sample ;
	} // getFloatingSample()
} // OnObject()

// 
MaterialBox.prototype.OnLight = function() {
	// Remove original list first.
	this.box.list.removeAllChildren() ;
	this.box.selector.statusPage = 4 ;
	// List background.
	this.box.list.bg = new createjs.Shape() ;
	this.box.list.bg.graphics.f( "#FFF3AD" ).r( 0, 0, 290, 400 ) ;
	this.box.list.addChild( this.box.list.bg ) ;
} // OnLight()

// 
MaterialBox.prototype.OnSound = function() {
	// Remove original list first.
	this.box.list.removeAllChildren() ;
	this.box.selector.statusPage = 5 ;
	// List background.
	this.box.list.bg = new createjs.Shape() ;
	this.box.list.bg.graphics.f( "#FFF3DA" ).r( 0, 0, 290, 400 ) ;
	this.box.list.addChild( this.box.list.bg ) ;
} // OnSound()

// 
MaterialBox.prototype.OnOption = function() {
	// Remove original list first.
	this.box.list.removeAllChildren() ;
	this.box.selector.statusPage = 6 ;
	// Something info.
	this.box.list.pic = new createjs.Container() ;
	this.box.list.pic.x = 58, this.box.list.pic.y = 5 ;
	this.box.list.pic.bg = new createjs.Shape() ;
	this.box.list.pic.bg.graphics.s( "#000000" ).f( "#EEEEEE" ).dc( 88, 88, 90 ) ;
	this.box.list.pic.img = new createjs.Bitmap( "pic/husky.png" ) ;
	this.box.list.pic.img.scaleX = this.box.list.pic.img.scaleY = 0.22 ;
	this.box.list.pic.addChild( this.box.list.pic.bg, this.box.list.pic.img ) ;
	this.box.list.author = new createjs.Text( "Made by Salmon (http://salmon.tw)", "12px comic sans ms", "#FFFFFF" ) ;
	this.box.list.author.x = 48, this.box.list.author.y = 350 ;
	this.box.list.comment = new createjs.Text( "Firefox browser has the best user experience.", "12px comic sans ms", "#FFFFFF" ) ;
	this.box.list.comment.x = 12, this.box.list.comment.y = 368 ;
	this.box.list.addChild( this.box.list.pic, this.box.list.author, this.box.list.comment ) ;
	// Create new page button.
	this.box.list.newPage = new createjs.Container() ;
	this.box.list.newPage.x = 30, this.box.list.newPage.y = 180 ;
	this.box.list.newPage.bg = new createjs.Bitmap( "pic/map_build/buttonG.png" ) ;
	this.box.list.newPage.bg.scaleX = this.box.list.newPage.bg.scaleY = 0.5 ;
	this.box.list.newPage.bg.x = 0, this.box.list.newPage.bg.y = 0 ;
	this.box.list.newPage.text1 = new createjs.Text( "Create New Map", "20px comic sans ms", "#FFFFFF" ) ;
	this.box.list.newPage.text1.x = 65, this.box.list.newPage.text1.y = 23 ;
	this.box.list.newPage.addChild( this.box.list.newPage.bg, this.box.list.newPage.text1 ) ;
	this.box.list.newPage.on( "click", function( evt ) { $( "#dialog_newMap" ).dialog( "open" ) ; } ) ;
	// Save button.
	this.box.list.save = new createjs.Container() ;
	this.box.list.save.x = 30, this.box.list.save.y = 230 ;
	this.box.list.save.bg = new createjs.Bitmap( "pic/map_build/buttonH.png" ) ;
	this.box.list.save.bg.scaleX = this.box.list.save.bg.scaleY = 0.5 ;
	this.box.list.save.bg.x = 170, this.box.list.save.bg.y = 0 ;
	this.box.list.save.text1 = new createjs.Text( "Save/Load the Map", "18px comic sans ms", "#FFFFFF" ) ;
	this.box.list.save.text1.x = 5, this.box.list.save.text1.y = 23 ;
	this.box.list.save.addChild( this.box.list.save.bg, this.box.list.save.text1 ) ;
	this.box.list.save.on( "click", function( evt ) { $( "#dialog_saveMap" ).dialog( "open" ) ; } ) ;
	// Tutorial button.
	this.box.list.tutorial = new createjs.Container() ;
	this.box.list.tutorial.x = 30, this.box.list.tutorial.y = 280 ;
	this.box.list.tutorial.bg = new createjs.Bitmap( "pic/map_build/buttonI.png" ) ;
	this.box.list.tutorial.bg.scaleX = this.box.list.tutorial.bg.scaleY = 0.5 ;
	this.box.list.tutorial.bg.x = 0, this.box.list.tutorial.bg.y = 0 ;
	this.box.list.tutorial.text1 = new createjs.Text( "Tutorial of Making", "18px comic sans ms", "#FFFFFF" ) ;
	this.box.list.tutorial.text1.x = 65, this.box.list.tutorial.text1.y = 23 ;
	this.box.list.tutorial.addChild( this.box.list.tutorial.bg, this.box.list.tutorial.text1 ) ;

	this.box.list.addChild( this.box.list.newPage, this.box.list.save, this.box.list.tutorial ) ;
} // OnOption()