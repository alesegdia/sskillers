

SSK.namespace("SSK.module");

SSK.module.KeyboardController = function(){};
SSK.module.KeyboardController.prototype = {

	tick : function(e) {
		var vel = 1;
		e.CVelocity.x = 0;
		e.CVelocity.y = 0;
		e.CVelocity.y = e.CMaxVelocity.y * e.CInputState.yaxis;
		e.CVelocity.x = e.CMaxVelocity.x * e.CInputState.xaxis;


		if( e.CPlayer )
		{
			if( e.CInputState.left )
			{
				e.CInputState.xaxis = -1;
			}
			else if( e.CInputState.right )
			{
				e.CInputState.xaxis = 1;
			}
			else
			{
				e.CInputState.xaxis = 0;
			}

			if( e.CInputState.down )
			{
				e.CInputState.yaxis = -1;
			}
			else if( e.CInputState.up )
			{
				e.CInputState.yaxis = 1;
			}
			else
			{
				e.CInputState.yaxis = 0;
			}
		}

		if( e.CPlayer )
		{
		if(e.CInputState.xaxis < 0 ){
			//e.CVelocity.x = -e.CMaxVelocity.x;
			if( e.CInputState.shift == true )
				e.CRender.faceLeft = true;
		} else if (e.CInputState.xaxis > 0 ){
			//e.CVelocity.x = e.CMaxVelocity.x;
			if( e.CInputState.shift == true )
				e.CRender.faceLeft = false;
		}
		}

		if( e.CInputState.q == true )
		{
			e.CRender.faceLeft = true;
		}
		else if( e.CInputState.w == true )
		{
			e.CRender.faceLeft = false;
		}

		e.CVelocity.x *= SSK.core.deltaTime;
		e.CVelocity.y *= SSK.core.deltaTime;
	},

	performsOver : function(e) {
		//return e.CPlayer;
		return e.CPlayer || e.CKeyControl;
	}

};
