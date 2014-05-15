function jQueryFunctions( preview ) {
	// jQuery Setting.
	$( '#dialog_newMap' ).dialog({
		autoOpen: false,
		height: 200,
		modal: true,
		show: { effect: "blind", duration: 1000 },
		hide: { effect: "blind", duration: 500 },
		buttons: {
			"Create": function() {
				$( this ).dialog( "close" ) ;
				$( "#dialog_keySize" ).dialog( "open" ) ;
			},
			"Cancel": function() {
				$( this ).dialog( "close" ) ;
			}
		}
	}) ;
	// jQuery Setting.
	$( '#dialog_keySize' ).dialog({
		autoOpen: false,
		height: 310,
		modal: true,
		show: { effect: "blind", duration: 1000 },
		hide: { effect: "blind", duration: 500 },
		buttons: {
			"Done": function() {
				G.customer_height = $( '#height' ).val() ;
				G.customer_length = $( '#length' ).val() ;
				preview.OnTiledControl() ;
				$( this ).dialog( "close" ) ;
			},
			"Cancel": function() {
				$( this ).dialog( "close" ) ;
			}
		}
	}) ;
	// jQuery Setting.
	$( '#dialog_saveMap' ).dialog({
		autoOpen: false,
		height: 200,
		modal: true,
		show: { effect: "blind", duration: 1000 },
		hide: { effect: "blind", duration: 500 },
		buttons: {
			"Save": function() {
				$( this ).dialog( "close" ) ;
				$( '#jsonExport' ).val( "" ) ;
				$( "#dialog_jsonExport" ).dialog( "open" ) ;
			},
			"Load": function() {
				$( this ).dialog( "close" ) ;
				$( '#jsonImport' ).val( "" ) ;
				$( "#dialog_jsonImport" ).dialog( "open" ) ;
			},
			"Cancel": function() {
				$( this ).dialog( "close" ) ;
			}
		}
	}) ;
	// jQuery Setting.
	$( '#dialog_jsonExport' ).dialog({
		autoOpen: false,
		height: 310,
		modal: true,
		show: { effect: "blind", duration: 1000 },
		hide: { effect: "blind", duration: 500 },
		buttons: {
			"Get the json": function() {
				var obj = {
					tilePixel : G.size,
					name : 'HelloWorld',
					height : G.customer_height,
					length : G.customer_length,
					tileData : preview.box.mapbox.tiled_data,
					objectData : preview.box.mapbox.object_data,
					lightData : [],
					soundData : []
				} ;
				var json = JSON.stringify( obj ) ;
				$( '#jsonExport' ).val( json ) ;
			},
			"Cancel": function() {
				$( this ).dialog( "close" ) ;
			}
		}
	}) ;
	// jQuery Setting.
	$( '#dialog_jsonImport' ).dialog({
		autoOpen: false,
		height: 310,
		modal: true,
		show: { effect: "blind", duration: 1000 },
		hide: { effect: "blind", duration: 500 },
		buttons: {
			"Set the json": function() {
				var obj = eval ( "(" + $( '#jsonImport' ).val() + ")" ) ;
				G.customer_height = obj.height ;
				G.customer_length = obj.length ;
				// Tiled data.
				preview.box.mapbox.tiled_data = obj.tileData ;
				// Initial objects data at mapbox.
				preview.box.mapbox.object_data = obj.objectData ;
				for ( i = 1 ; i < preview.box.mapbox.objects.getNumChildren() ; i ++ )
					preview.box.mapbox.objects.removeChildAt( i ) ;
				// Objects data.
				for ( i = 0 ; i < obj.objectData.length ; i ++ ) {
					var container = new createjs.Container() ;
					container.x = container.storeX = obj.objectData[i].rx ;
					container.y = container.storeY = obj.objectData[i].ry ;
					container.order = obj.objectData[i].o ;
					container.objects = G.cacheObjects[obj.objectData[i].n-1].clone( false ) ;
					var objectWidth = container.objects.getBounds().width ;
					var objectHeight = container.objects.getBounds().height ;
					container.objects.regX = objectWidth / 2 ;
					container.objects.regY = objectHeight / 2 ;
					container.objects.x = container.objects.regX + 10, container.objects.y = container.objects.regY + 10 ;
					container.addChild( container.objects ) ;
					container.regX = container.objects.regX + 10, container.regY = container.objects.regY + 10 ;
					container.scaleX = obj.objectData[i].sx, container.scaleY = obj.objectData[i].sy ;
					container.bg = new createjs.Shape() ;
					container.bg.graphics.f( "#AAAAAA" ).s( "#000000" ).r( 0, 0, container.getBounds().width + 20, container.getBounds().height + 20 ) ;
					container.bg.alpha = 0 ;
					container.tools = preview.GetToolsBox( container ) ;
					preview.ToolsBoxListener( container ) ;
					preview.box.mapbox.objects.addChild( container ) ;
				} // for
			},
			"Cancel": function() {
				$( this ).dialog( "close" ) ;
			}
		}
	}) ;
} // jQueryFunctions()