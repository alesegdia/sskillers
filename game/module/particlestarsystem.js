
SSK.namespace("SSK.module");

SSK.module.ParticleStarSystem = function( nStars, maxw, maxh ){
	this.stars = new Array( nStars );
	this.factor = 0.1;
	for( var i = 0; i < this.stars.length; i++ ){
		this.stars[i] = new Star( maxw, maxh );
	}
};

SSK.module.ParticleStarSystem.prototype = {

	render : function( ctx ) {
		for( var i = 0; i < this.stars.length - 1 ; i++ ){

			var s = this.stars[i].speedX;
			ctx.fillStyle="#FFFFFF";
			ctx.fillRect(this.stars[i].x,this.stars[i].y,s*2,s*2);
		}
	},

	tick : function( cam ){

		for( var i = 0; i < this.stars.length - 1; i++ ){
			this.stars[i].update( -cam.CVelocity.x * this.factor, -cam.CVelocity.y * this.factor );
		}

	},

	performsOver : function( e ){
		return e.CCamera;
	}


};
