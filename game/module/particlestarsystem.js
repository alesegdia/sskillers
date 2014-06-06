
SSK.namespace("SSK.module");

SSK.module.ParticleStarSystem = function( nStars, maxw, maxh ){
	this.stars = new Array( nStars );
	for( var i = 0; i < this.stars.length; i++ ){
		this.stars[i] = new Star( maxw, maxh );
	}
};

SSK.module.ParticleStarSystem.prototype = {

	render : function( ctx ) {
		var px = ctx.createImageData(1,1);
		var d  = px.data;
		d[0] = 255;
		d[1] = 255;
		d[2] = 255;
		d[3] = 255;

		for( var i = 0; i < this.stars.length - 1 ; i++ ){

			ctx.putImageData( px, this.stars[i].x, this.stars[i].y );
			//ctx.putImageData( px, this.stars[i].x+1, this.stars[i].y );
			//ctx.putImageData( px, this.stars[i].x, this.stars[i].y+1 );
			//ctx.putImageData( px, this.stars[i].x+1, this.stars[i].y+1 );
		}
	},

	tick : function( cam ){

		for( var i = 0; i < this.stars.length - 1; i++ ){
			this.stars[i].update( -cam.CVelocity.x, -cam.CVelocity.y );
		}

	},

	performsOver : function( e ){
		return e.CCamera;
	}


};
