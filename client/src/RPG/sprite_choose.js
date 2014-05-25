// 物件圖層
SettingSprite = function( type, name ) {
	var spriteSheet ;
	if ( type == "character" ) {
		if ( name == "baphomet" )
			spriteSheet = new createjs.SpriteSheet( {
				"images": ["monster/baphomet.png"],
				"frames": { "width": 125, "height": 125, "regX": 0, "regY": 0, "count": 36 },
				"animations": {
					"front": { "frames": [0,1,2,1], "speed": 0.1 },
					"walk": { "frames": [6,7,8,7], "speed": 0.1 },
					"attack": { "frames": [12,13,14], "speed": 0.3 },
					"skill_self": { "frames": [18,19,20], "speed": 0.1 },
					"die": { "frames": [24,25,26], "speed": 0.1 }
				}
			} )
	} // if
	else if ( type == "npc" ) {
		if ( name == "sage" )
			spriteSheet = new createjs.SpriteSheet( {
				"images": ["npc_texture/sage.png"], 
				"frames": { "width": 125, "height": 125, "regX": 0, "regY": 0, "count": 36 },
				"animations": {
					"front": { "frames": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,17,17,17,17], "speed": 0.1 }
				}
			} ) 
		else if ( name == "teenage_boy" )
			spriteSheet = new createjs.SpriteSheet( {
				"images": ["npc_texture/teenage_boy.png"], 
				"frames": { "width": 125, "height": 125, "regX": 0, "regY": 0, "count": 36 },
				"animations": {
					"front": { "frames": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17], "speed": 0.1 }
				}
			} ) 
		else if ( name == "woman_with_yellow_hair" )
			spriteSheet = new createjs.SpriteSheet( {
				"images": ["npc_texture/woman_with_yellow_hair.png"], 
				"frames": { "width": 125, "height": 125, "regX": 0, "regY": 0, "count": 36 },
				"animations": {
					"front": { "frames": [0], "speed": 0.1 }
				}
			} ) 
	} // else if
	else if ( type == "monster" ) {
		if ( name == "farmiliar" )
			spriteSheet = new createjs.SpriteSheet( {
				"images": ["monster/farmiliar.png"], 
				"frames": { "width": 125, "height": 125, "regX": 0, "regY": 0, "count": 36 },
				"animations": {
					"front": { "frames": [0,1,2,3,4,5,6,7], "speed": 0.3 },
					"walk": { "frames": [0,1,2,3,4,5,6,7], "speed": 0.3 }
				}
			} ) 
	} // else if
	else if ( type == "effect" ) {
		if ( name == "sk_blessing" )
			spriteSheet = new createjs.SpriteSheet( {
				"images": ["effect/sk_blessing.png"],
				"frames": { "width": 200, "height": 200, "regX": 0, "regY": 0, "count": 16 },
				"animations": {
					"active": { "frames": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], "speed": 0.75 }
				}
			} )
	} // else if 

	return spriteSheet ;
} // SettingSprite()