
SSK.namespace("SSK.module");

SSK.module.CamController = function( speedLimit ){
	this.speedLimit = speedLimit;
	this.virtualDeltaMouse = new Vec2( 0, 0 );
};

SSK.module.CamController.prototype = {

	tick : function(e){

		var deltaMouse = SSK.input.deltaMouse;
		var v;

		if( SSK.input.distToCenter < this.speedLimit ){

			// cam.velocity.... en vez de this.velocity...
			e.CVelocity.set( deltaMouse );

		} else {

			v = norm( deltaMouse );
			e.CVelocity.set( v.x * this.speedLimit, v.y * this.speedLimit );

		}

		this.virtualDeltaMouse.set( e.CVelocity );
		//e.CVelocity.scale( 0.02 );
		e.CVelocity.scaleXY( e.CSpeedFactor.x, e.CSpeedFactor.y );

		//console.log("pos camara: " + e.CTransform.x + "," + e.CTransform.y );

	},

	performsOver : function(e){
		return e.CCamera;
	}



};
