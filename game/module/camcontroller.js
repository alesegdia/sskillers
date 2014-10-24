
SSK.namespace("SSK.module");

SSK.module.CamController = function( speedLimit ){
	this.speedLimit = speedLimit;
	this.virtualDeltaMouse = new Vec2( 0, 0 );
};

SSK.module.CamController.prototype = {

	tick : function(e){

		var deltaMouse = SSK.input.deltaMouse;
		var v = { x : deltaMouse.x , y : deltaMouse.y  };


		//console.log("x: " + sign(v.x) + ", y: " + sign(v.y));
		// 0 - 0.1: nada
		// 0.1 - 0.5: actua
		// 0.5 - 1: nada
		var absx, absy, sx, sy;
		absx = Math.abs(v.x);
		absy = Math.abs(v.y);
		sx = sign(v.x);
		sy = sign(v.y);

		if( absx < 0.1 ) v.x = 0;
		else if( absx >= 0.1 && absx <= 0.5 ) v.x = v.x - sx * 0.1;
		else if( absx > 0.5 ) v.x = sx * 0.4;

		if( absy < 0.1 ) v.y = 0;
		else if( absy >= 0.1 && absy <= 0.5 ) v.y = v.y - sy * 0.1;
		else if( absy > 0.5 ) v.y = sy * 0.4;


		//console.log("vx: " + v.x + ", vy: " + v.y);
		/*
		if( SSK.input.distToCenter < this.speedLimit ){

			// cam.velocity.... en vez de this.velocity...
			e.CVelocity.set( v );

		} else {

			v = norm( deltaMouse );
			e.CVelocity.set( v.x , v.y );

		}
*/
		e.CVelocity.set( v.x, v.y );
		e.CVelocity.scaleXY( e.CSpeedFactor.x, e.CSpeedFactor.y );

		//console.log("pos camara: " + e.CTransform.x + "," + e.CTransform.y );

	},

	performsOver : function(e){
		return e.CCamera;
	}



};
