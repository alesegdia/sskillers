var Rastro = function(entity,nSteps,alphaStep,timeStep) {
	this.entity = entity;
	this.nSteps = nSteps;
	this.cache = new Array(nSteps);
	this.faces = new Array(nSteps);
	this.alphaStep = alphaStep;
	this.timeStep = timeStep;
	this.currentTime = 0;
	this.head = parseInt(0);
	for (var i = 0; i < this.nSteps; i++) {
		this.cache[i] = new Vec2(0,0);
		this.faces[i] = false;
	}
};

Rastro.prototype.start = function() {
	var that = this;
	setInterval(function(){that.update();},this.timeStep);
};

Rastro.prototype.tick = function(e, cam) {
	this.currentTime += SSK.core.deltaTime;
	if( this.currentTime > this.timeStep )
	{
		this.head = (this.head+1)%this.nSteps;
		this.cache[this.head].x = e.CTransform.x - cam.CTransform.x;
		this.cache[this.head].y = e.CTransform.y - cam.CTransform.y;
		this.faces[this.head] = e.CRender.faceLeft;
		this.currentTime = 0;
	}
};

Rastro.prototype.render = function( renderer, cam, e ) {
	var i = (this.head+1)%this.nSteps;
	var steps = 0;
	for(;steps < this.nSteps;steps++, i=(i+1)%this.nSteps) {
		renderer.context2d.globalAlpha = (steps+1)*this.alphaStep;
		//renderer.context2d.colorMask(1,1,1,(steps+1)*this.alphaStep);
		if( this.faces[i] == true )
		{
			renderer.drawFlipH(e.CRender.sprite, this.cache[i].x,this.cache[i].y);
		}
		else
		{
			renderer.context2d.save();
			renderer.context2d.drawImage(e.CRender.sprite, this.cache[i].x,this.cache[i].y);
			renderer.context2d.restore();
		}
	}
	renderer.context2d.globalAlpha = 1.0;
	//renderer.context2d.colorMask(1, 1, 1, 1);
};

