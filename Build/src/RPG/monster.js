

var ss = new createjs.SpriteSheet( {
	"images": ["pic/monster/farmiliar.png"], 
	"frames": { "width": 125, "height": 125, "regX": 0, "regY": 0, "count": 36 },
	"animations": {
		"walk": { "frames": [0,1,2,3,4,5,6,7], "speed": 0.3 }
	}
} ) ;

yar = new createjs.BitmapAnimation(ss);
// 單一物件200x200之中心
yar.regX = 0, yar.regY = 0 ;
yar.gotoAndPlay( "walk" ) ;

// Hover the character up and down
createjs.Tween.get( yar, { loop: true } )
		.to( { x: 0, y: 15 }, 500, createjs.Ease.quadInOut )
		.to( { x: 0, y: 0 }, 500, createjs.Ease.quadInOut ) ;
