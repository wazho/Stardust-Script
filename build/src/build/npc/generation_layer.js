function GenerationLayer() {
	this.OnCreate() ;
	return this ;
} // GenerationLayer() 

// create container
GenerationLayer.prototype.OnCreate = function() {
	this.box = new createjs.Container() ;


} // OnCreate()