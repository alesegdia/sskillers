

SSK.namespace("SSK.module");

SSK.module.KeyboardController = function(){};
SSK.module.KeyboardController.prototype = {

	tick : function(e) {
		var vel = 1;
		e.CVelocity.x = 0;
		e.CVelocity.y = 0;
		if( e.CInputState.up ){
			e.CVelocity.y = e.CMaxVelocity.y;
		} else if (e.CInputState.down ){
			e.CVelocity.y = -e.CMaxVelocity.y;
		}

		if(e.CInputState.left ){
			e.CVelocity.x = -e.CMaxVelocity.x;
			if( e.CInputState.shift == false )
				e.CRender.faceLeft = true;
		} else if (e.CInputState.right ){
			e.CVelocity.x = e.CMaxVelocity.x;
			if( e.CInputState.shift == false )
				e.CRender.faceLeft = false;
		}

		e.CVelocity.x *= SSK.core.deltaTime;
		e.CVelocity.y *= SSK.core.deltaTime;
	},

	performsOver : function(e) {
		//return e.CPlayer;
		return e.CPlayer || e.CEnemy;
	}

};
