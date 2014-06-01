// 物件圖層
SettingSprite = function( type, name ) {
	var spriteSheet ;
	if ( type.target == "character" ) {
		if ( type.part == "body" ) {
			if ( name == "novice" )
				spriteSheet = new createjs.SpriteSheet( {
					"images": ["body/novice.png"],
					"frames": { "width": 125, "height": 125, "regX": 0, "regY": 0, "count": 62 },
					"animations": {
						"stand_A": { "frames": [0], "speed": 1 },
						"stand_B": { "frames": [1], "speed": 1 },
						"stand_C": { "frames": [2], "speed": 1 },
						"stand_D": { "frames": [3], "speed": 1 },
						"stand_E": { "frames": [4], "speed": 1 },
						"sit_A": { "frames": [9], "speed": 1 },
						"sit_B": { "frames": [10], "speed": 1 },
						"sit_C": { "frames": [11], "speed": 1 },
						"sit_D": { "frames": [12], "speed": 1 },
						"sit_E": { "frames": [13], "speed": 1 },
						"walk_A": { "frames": [18,19,20,21,22,23,24,25], "speed": 0.13 },
						"walk_B": { "frames": [27,28,29,30,31,32,33,34], "speed": 0.13 },
						"walk_C": { "frames": [36,37,38,39,40,41,42,43], "speed": 0.13 },
						"walk_D": { "frames": [45,46,47,48,49,50,51,52], "speed": 0.13 },
						"walk_E": { "frames": [54,55,56,57,58,59,60,61], "speed": 0.13 }
					}
				} ) ;
		} // if
		
		if ( type.part == "hair" ) {
			if ( name == "style1_white" )
				spriteSheet = new createjs.SpriteSheet( {
					"images": ["hair/white.png"],
					"frames": { "width": 75, "height": 75, "regX": 0, "regY": 0, "count": 15 },
					"animations": {
						"stable_A": { "frames": [0], "speed": 1 },
						"stable_B": { "frames": [1], "speed": 1 },
						"stable_C": { "frames": [2], "speed": 1 },
						"stable_D": { "frames": [3], "speed": 1 },
						"stable_E": { "frames": [4], "speed": 1 }
					}
				} ) ;
		} // if
	} // if
	else if ( type.target == "npc" ) {
		if ( name == "sage" )
			spriteSheet = new createjs.SpriteSheet( {
				"images": ["npc_texture/sage.png"], 
				"frames": { "width": 125, "height": 125, "regX": 0, "regY": 0, "count": 36 },
				"animations": {
					"front": { "frames": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,17,17,17,17], "speed": 0.1 }
				}
			} ) ;
		else if ( name == "teenage_boy" )
			spriteSheet = new createjs.SpriteSheet( {
				"images": ["npc_texture/teenage_boy.png"], 
				"frames": { "width": 125, "height": 125, "regX": 0, "regY": 0, "count": 36 },
				"animations": {
					"front": { "frames": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17], "speed": 0.1 }
				}
			} ) ;
		else if ( name == "woman_with_yellow_hair" )
			spriteSheet = new createjs.SpriteSheet( {
				"images": ["npc_texture/woman_with_yellow_hair.png"], 
				"frames": { "width": 125, "height": 125, "regX": 0, "regY": 0, "count": 36 },
				"animations": {
					"front": { "frames": [0], "speed": 0.1 }
				}
			} ) ;
	} // else if
	else if ( type.target == "monster" ) {
		if ( name == "farmiliar" )
			spriteSheet = new createjs.SpriteSheet( {
				"images": ["monster/farmiliar.png"], 
				"frames": { "width": 125, "height": 125, "regX": 0, "regY": 0, "count": 36 },
				"animations": {
					"front": { "frames": [0,1,2,3,4,5,6,7], "speed": 0.3 },
					"walk": { "frames": [0,1,2,3,4,5,6,7], "speed": 0.3 }
				}
			} ) ;
		else if ( name == "baphomet" )
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
			} ) ;
	} // else if
	else if ( type.target == "effect" ) {
		if ( name == "sk_blessing" )
			spriteSheet = new createjs.SpriteSheet( {
				"images": ["effect/sk_blessing.png"],
				"frames": { "width": 200, "height": 200, "regX": 0, "regY": 0, "count": 16 },
				"animations": {
					"active": { "frames": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], "speed": 0.75 }
				}
			} ) ;
	} // else if 
	
	return spriteSheet ;
} // SettingSprite()